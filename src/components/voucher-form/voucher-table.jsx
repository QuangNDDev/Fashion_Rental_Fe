import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Switch,
  Table,
  notification,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const VoucherTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [api, contextHolder] = notification.useNotification();
  const fetchVouchers = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/voucher/getall/" + productownerId
      );
      setVoucherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVouchers();
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
  const [form] = Form.useForm();
  const showEditDrawer = (record) => {
    setEditingUser(record);
    console.log(editingUser);
    setIsEdit(true);
    setIsDrawerVisible(true);
    form.setFieldsValue(record);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
    setIsEdit(false);
    form.resetFields();
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
  //format date ------------------------------------
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const onChangeSwitchStatus = async (checked, voucherID) => {
    console.log(`switch to ${checked}`);
    console.log(voucherID);

    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/voucher?voucherID=${voucherID}`
      );

      api["success"]({
        message: "Cập Nhật Trạng Thái Thành Công!",
        description: `Bật voucher thành công!!!`,
      });

      fetchVouchers();
      console.log("Bật true hoàn tất!!!", response);
    } catch (error) {}
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "voucherID",
      key: "voucherID",

      ...getColumnSearchProps("voucherID"),
      render: (number) => <p>{Number(number)}</p>,
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "voucherName",
      key: "voucherName",

      ...getColumnSearchProps("voucherName"),
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mã khuyến mãi",
      dataIndex: "voucherCode",
      key: "voucherCode",

      ...getColumnSearchProps("voucherCode"),
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",

      ...getColumnSearchProps("createdDate"),
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",

      ...getColumnSearchProps("startDate"),
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",

      ...getColumnSearchProps("endDate"),
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <p style={{ textAlign: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",

      render: (text, record) => (
        <div>
          <Space size={"middle"}>
            <Switch
              checked={record.status === "ACTIVE"}
              size="large"
              defaultChecked
              onChange={(checked) =>
                onChangeSwitchStatus(checked, record.voucherID)
              }
              style={{
                backgroundColor:
                  record.status === "ACTIVE" ? "#4CAF50" : "#F5F5F5",
                borderColor:
                  record.status === "INACTIVE" ? "#4CAF50" : "#D3D3D3",
              }}
              disabled={record.status === "OUTDATE"}
            />
          </Space>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table bordered={true} columns={columns} dataSource={voucherData} />
      {contextHolder}
      <Drawer
        title={"Đơn hàng"}
        open={isDrawerVisible}
        onClose={onClose}
        width={400}
      >
        <Form form={form}>
          <Form.Item
            name="fullName"
            label="Người mua"
            rules={[
              { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
              {
                pattern: /^[^\d]+$/,
                message: "Không được nhập số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="SĐT"
            rules={[
              { required: true, message: "Xin vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Thời gian"
            rules={[{ required: true, message: "Xin vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Xin vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="status"
            label="Trạng thái hoạt động"
            rules={[
              { required: true, message: "Cập nhật trạng thái hoạt động!" },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Đang hoạt động</Radio>
              <Radio value={false}>Không hoạt động</Radio>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              style={{
                backgroundColor: "#008000",
                color: "#fff",
                width: "70%",
              }}
            >
              Xác nhận
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "red",
                color: "#fff",
                width: "25%",
                marginLeft: "10px",
              }}
              danger
            >
              Từ chối
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export default VoucherTable;
