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
      const responseOrderCompleted = await axios.get(
        "http://fashionrental.online:8080/orderbuy/po/completed/" + productownerId
      );
      const productList = responseProductId.data.map(
        (product) => product.productID
      );
      console.log("Product ID List:", productList);
      const orderBuyList = responseOrderCompleted.data.map(
        (orderDetail) => orderDetail.orderBuyID
      );
      console.log("Order Buy List:", orderBuyList);
      const orderDetailList = [];
      for (const orderBuyId of orderBuyList) {
        try {
          const orderDetailResponse = await axios.get(
            `http://fashionrental.online:8080/orderbuydetail/${orderBuyId}`
          );
          orderDetailList.push(orderDetailResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("Order Detail List:", orderDetailList);
      const productOrderDetails = orderDetailList.map((orderDetail) => {
        return {
          price: orderDetail[0].price,
          productName: orderDetail[0].productDTO.productName,
          productID: orderDetail[0].productDTO.productID,
        };
      });

      console.log("Product Order Details: ", productOrderDetails);
      const productDetailsMap = new Map();

      for (const orderDetail of orderDetailList) {
        const {
          price,
          productDTO: { productID, productName },
        } = orderDetail[0];

        if (productDetailsMap.has(productID)) {
          const currentData = productDetailsMap.get(productID);
          const updatedPrice = currentData.totalPrice + price;
          productDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: updatedPrice,
          });
        } else {
          productDetailsMap.set(productID, {
            productID,
            productName,
            totalPrice: price,
          });
        }
      }

      const aggregatedProductDetails = Array.from(productDetailsMap.values());
      setRevenueProductData(aggregatedProductDetails);
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
            borderColor: "green",
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
              backgroundColor: "#008000",
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
            style={{ color: "green" }}
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
      width: "2%",
      ...getColumnSearchProps("productownerID"),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "10%",
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
      width: "10%",
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
