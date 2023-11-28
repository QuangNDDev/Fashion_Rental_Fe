import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
const RevenueTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [revenueProductData, setRevenueProductData] = useState([]);

  const productownerId = localStorage.getItem("productownerId");
  const fetchRevenueProduct = async () => {
    try {
      const responseProductId = await axios.get(
        "http://fashionrental.online:8080/product/getproducts/" + productownerId
      );
      const productList = responseProductId.data.map(
        (product) => product.productID
      );
      console.log("Product ID List:", productList);
      const responseOrderSaleCompleted = await axios.get(
        "http://fashionrental.online:8080/orderbuy/po/completed/" +
          productownerId
      );
      const orderBuyList = responseOrderSaleCompleted.data.map(
        (orderSaleDetail) => orderSaleDetail.orderBuyID
      );
      console.log("Order Buy List:", orderBuyList);
      const orderSaleDetailList = [];
      for (const orderBuyId of orderBuyList) {
        try {
          const orderSaleDetailResponse = await axios.get(
            `http://fashionrental.online:8080/orderbuydetail/${orderBuyId}`
          );
          orderSaleDetailList.push(orderSaleDetailResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("Order Sale Detail List:", orderSaleDetailList);
      const productOrderSaleDetails = orderSaleDetailList.map((orderDetail) => {
        return {
          price: orderDetail[0].price,
          productName: orderDetail[0].productDTO.productName,
          productID: orderDetail[0].productDTO.productID,
        };
      });

      console.log("Product Order Sale Details: ", productOrderSaleDetails);
      const responseOrderRentCompleted = await axios.get(
        "http://fashionrental.online:8080/orderrent/po/completed/" +
          productownerId
      );
      const orderRentList = responseOrderRentCompleted.data.map(
        (orderRentDetail) => orderRentDetail.orderRentID
      );
      console.log("Order Rent List:", orderRentList);
      const orderRentDetailList = [];
      for (const orderRentId of orderRentList) {
        try {
          const orderRentDetailResponse = await axios.get(
            `http://fashionrental.online:8080/orderrentdetail/${orderRentId}`
          );
          orderRentDetailList.push(orderRentDetailResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("Order Rent Detail List:", orderRentDetailList);
      const productOrderRentDetails = orderRentDetailList.map((orderDetail) => {
        return {
          price: orderDetail[0].rentPrice,
          productName: orderDetail[0].productDTO.productName,
          productID: orderDetail[0].productDTO.productID,
        };
      });

      console.log("Product Order Rent Details: ", productOrderRentDetails);
      const productSaleDetailsMap = new Map();

      for (const orderSaleDetail of orderSaleDetailList) {
        const {
          price,
          productDTO: { productID, productName },
        } = orderSaleDetail[0];

        if (productSaleDetailsMap.has(productID)) {
          const currentData = productSaleDetailsMap.get(productID);
          const updatedPrice = currentData.totalPrice + price;
          productSaleDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: updatedPrice,
          });
        } else {
          productSaleDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: price,
          });
        }
      }
      const productRentDetailsMap = new Map();

      for (const orderRentDetail of orderRentDetailList) {
        const {
          rentPrice,
          productDTO: { productID, productName },
        } = orderRentDetail[0];

        if (productRentDetailsMap.has(productID)) {
          const currentData = productRentDetailsMap.get(productID);
          const updatedPrice = currentData.totalPrice + rentPrice;
          productRentDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: updatedPrice,
          });
        } else {
          productRentDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: rentPrice,
          });
        }
      }

      const aggregatedProductSaleDetails = Array.from(
        productSaleDetailsMap.values()
      );
      const aggregatedProductRentDetails = Array.from(
        productRentDetailsMap.values()
      );

      const combinedProductDetails = [];
      for (const saleDetail of aggregatedProductSaleDetails) {
        const matchingRentDetailIndex = aggregatedProductRentDetails.findIndex(
          (rentDetail) => rentDetail.productID === saleDetail.productID
        );

        if (matchingRentDetailIndex !== -1) {
          const matchingRentDetail =
            aggregatedProductRentDetails[matchingRentDetailIndex];
          const totalPrice =
            saleDetail.totalPrice + matchingRentDetail.totalPrice;

          const combinedDetail = {
            productID: saleDetail.productID,
            productName: saleDetail.productName,
            totalPrice: totalPrice,
          };

          combinedProductDetails.push(combinedDetail);

          aggregatedProductRentDetails.splice(matchingRentDetailIndex, 1);
        } else {
          combinedProductDetails.push(saleDetail);
        }
      }

      combinedProductDetails.push(...aggregatedProductRentDetails);

      console.log("Combined Product Details: ", combinedProductDetails);

      setRevenueProductData(combinedProductDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRevenueProduct();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            borderColor: "rgb(32, 30, 42)",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 110,
              backgroundColor: "rgb(32, 30, 42)",
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters) &
                handleSearch(selectedKeys, confirm, dataIndex) &
                handleReset(clearFilters)
            }
            size="small"
            style={{
              width: 90,
              borderColor: "rgb(32, 30, 42)",
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            style={{ color: "rgb(32, 30, 42)" }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productID",
      key: "orderID",

      ...getColumnSearchProps("productownerID"),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",

      ...getColumnSearchProps("productName"),
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "10%",

    //   render: (status) => (
    //     <p>
    //       <RenderTag tagRender={status} />
    //     </p>
    //   ),
    // },
    {
      title: "Doanh thu sản phẩm",
      dataIndex: "totalPrice",
      key: "totalPrice",

      ...getColumnSearchProps("totalPrice"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
  ];
  return (
    <div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={revenueProductData}
      />
    </div>
  );
};
export default RevenueTable;
