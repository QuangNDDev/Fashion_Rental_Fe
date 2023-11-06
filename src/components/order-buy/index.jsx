import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const OrdersBuyStaff = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [orderBuyData, setOrderBuyData] = useState([
    {
      orderID: 1,
      productName: "Túi Gucci",
      status: "Pending",
      revenue: "1.500.000",
    },
    {
      orderID: 2,
      productName: "Quần Prada",
      status: "Pending",
      revenue: "4.500.000",
    },
    {
      orderID: 3,
      productName: "Áo LV",
      status: "Pending",
      revenue: "5.500.000",
    },
  ]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }
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
            Search
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
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
    {
      title: "ID",
      dataIndex: "orderBuyID",
      key: "orderBuyID",
      width: "1%",
      ...getColumnSearchProps("orderBuyID"),
    },
    {
      title: "Ngày mua",
      dataIndex: "dateOrder",
      key: "dateOrder",
      width: "20%",
      ...getColumnSearchProps("dateOrder"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",
      width: "20%",
      ...getColumnSearchProps("total"),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      ...getColumnSearchProps("status"),
      render: (status) => (
        <p>
          <RenderTag tagRender={status} />
        </p>
      ),
    },

    {
      title: "Khách hàng",
      dataIndex: "customerID",
      key: "customerID",
      width: "20%",
      ...getColumnSearchProps("customerID"),
    },
    {
      title: "Chủ sản phẩm",
      dataIndex: "productownerID",
      key: "productownerID",
      width: "20%",
      ...getColumnSearchProps("productownerID"),
    },
  ];
  return (
    <div>
      <Table bordered={true} columns={columns} dataSource={orderBuyData} />
    </div>
  );
};
export default OrdersBuyStaff;
