import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const CancelBuyStaff = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [requestOrderRentData, setRequestOrderRentData] = useState();

  const fetchCancelBuyStaff = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/cancel/staff"
      );
      setRequestOrderRentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCancelBuyStaff();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }

  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
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

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "orderRentID",
    //   key: "orderRentID",

    //   ...getColumnSearchProps("orderRentID"),
    // },
    {
      title: "Ngày mua",
      dataIndex: "dateOrder",
      key: "dateOrder",

      ...getColumnSearchProps("dateOrder"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "totalBuyPriceProduct",
      key: "totalBuyPriceProduct",

      ...getColumnSearchProps("totalBuyPriceProduct"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "shippingFee",
      key: "shippingFee",

      ...getColumnSearchProps("shippingFee"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",

      ...getColumnSearchProps("total"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",

      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Địa chỉ khách hàng",
      dataIndex: "customerAddress",
      key: "customerAddress",

      ...getColumnSearchProps("customerAddress"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },

    {
      title: "Chủ sản phẩm",
      dataIndex: "productOwnerName",
      key: "productOwnerName",

      ...getColumnSearchProps("productOwnerName"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",

      ...getColumnSearchProps("status"),
      render: (status) => (
        <p>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
  ];
  return (
    <div>
      <Table
        responsive
        bordered={true}
        columns={columns}
        dataSource={requestOrderRentData}
      />
    </div>
  );
};
export default CancelBuyStaff;
