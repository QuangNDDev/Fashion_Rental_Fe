import {
  SearchOutlined,
  EyeTwoTone,
  MinusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Form,
  Input,
  Space,
  Switch,
  Table,
  notification,
  Drawer,
  Tag,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const VoucherTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [voucherData, setVoucherData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [api, contextHolder] = notification.useNotification();
  const [selectedRecord, setSelectedRecord] = useState([]);
  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    setOpen(true);
    setSelectedRecord(record);
  };
  const onClose = () => {
    setOpen(false);
  };
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

  const deleteVoucher = async (voucherID) => {
    try {
      const response = await axios.delete(
        `http://fashionrental.online:8080/voucher?voucherID=${voucherID}`
      );

      // Thông báo xóa thành công
      api["success"]({
        message: "Xóa thành công!",
        description: `Xóa mã giảm giá ${voucherID} thành công!!!`,
      });

      // Gọi lại API để cập nhật danh sách voucher
      fetchVouchers();
    } catch (error) {
      // Xử lý lỗi khi xóa voucher
      console.error("Error deleting voucher:", error);

      // Hiển thị thông báo lỗi
      api["error"]({
        message: "Xóa thất bại!",
        description: `Không thể xóa mã giảm giá ${voucherID}.`,
      });
    }
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
  const [form] = Form.useForm();
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
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const renderVoucherType = (voucherTypeID) => {
    if (voucherTypeID === 1) {
      return <Tag color={"green"}>{"Bán"}</Tag>;
    } else if (voucherTypeID === 2) {
      return <Tag color={"yellow"}>{"Thuê"}</Tag>;
    }
    return "";
  };
  const onChangeSwitchStatus = async (checked, voucherID) => {
    console.log(`switch to ${checked}`);
    console.log(voucherID);

    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/voucher?voucherID=${voucherID}`
      );

      api["success"]({
        message: "Cập Nhật Trạng Thái Thành Công!",
        description: `Cập nhật mã giảm giá ${voucherID} thành công!!!`,
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",

      ...getColumnSearchProps("createdDate"),
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
            <Button onClick={() => showDrawer(record)}>
              <EyeTwoTone />
              Chi tiết
            </Button>
            <MinusOutlined />
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
            {(record.status === "OUTDATE" || record.status === "INACTIVE") && (
              <Button
                danger
                onClick={() => deleteVoucher(record.voucherID)}
                size="middle"
              >
                <DeleteOutlined />
              </Button>
            )}
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
        title="Chi tiết mã giảm giá"
        placement="right"
        onClose={onClose}
        width={400}
        open={open}
      >
        <Form form={form}>
          <Form.Item
            name="voucherName"
            initialValue={selectedRecord && selectedRecord.voucherName}
          >
            <div style={{ display: "flex" }}>
              <strong>Tên mã giảm giá:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedRecord && selectedRecord.voucherName}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="voucherCode"
            initialValue={selectedRecord && selectedRecord.voucherCode}
          >
            <div style={{ display: "flex" }}>
              <strong>Mã giảm giá:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedRecord && selectedRecord.voucherCode}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="createdDate"
            initialValue={selectedRecord && selectedRecord.createdDate}
          >
            <div style={{ display: "flex" }}>
              <strong>Ngày tạo:</strong>
              <p style={{ marginLeft: "10px" }}>
                {formatDate(selectedRecord && selectedRecord.createdDate)}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="startDate"
            initialValue={selectedRecord && selectedRecord.startDate}
          >
            <div style={{ display: "flex" }}>
              <strong>Ngày bắt đầu:</strong>
              <p style={{ marginLeft: "10px" }}>
                {formatDate(selectedRecord && selectedRecord.startDate)}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="endDate"
            initialValue={selectedRecord && selectedRecord.endDate}
          >
            <div style={{ display: "flex" }}>
              <strong>Ngày kết thúc:</strong>
              <p style={{ marginLeft: "10px" }}>
                {formatDate(selectedRecord && selectedRecord.endDate)}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="description"
            initialValue={selectedRecord && selectedRecord.description}
          >
            <div style={{ display: "flex" }}>
              <strong style={{ minWidth: "55px" }}>Mô tả:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedRecord && selectedRecord.description}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="discountAmount"
            initialValue={selectedRecord && selectedRecord.discountAmount}
          >
            <div style={{ display: "flex" }}>
              <strong>Phần trăm giảm:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedRecord && selectedRecord.discountAmount}%
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="maxDiscount"
            initialValue={selectedRecord && selectedRecord.maxDiscount}
          >
            <div style={{ display: "flex" }}>
              <strong>Số tiền giảm tối đa:</strong>
              <p style={{ marginLeft: "10px" }}>
                {formatPriceWithVND(
                  selectedRecord && selectedRecord.maxDiscount
                )}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="quantity"
            initialValue={selectedRecord && selectedRecord.quantity}
          >
            <div style={{ display: "flex" }}>
              <strong>Số lượng còn lại:</strong>
              <p style={{ marginLeft: "10px", color: "red" }}>
                {selectedRecord && selectedRecord.quantity}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="voucherTypeID"
            initialValue={selectedRecord && selectedRecord.voucherTypeID}
          >
            <div style={{ display: "flex" }}>
              <strong>Giảm giá cho sản phẩm:</strong>
              <p style={{ marginLeft: "10px" }}>
                {renderVoucherType(
                  selectedRecord && selectedRecord.voucherTypeID
                )}
              </p>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export default VoucherTable;
