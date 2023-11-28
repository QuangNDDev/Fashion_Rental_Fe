import {
  CheckCircleTwoTone,
  EyeTwoTone,
  SearchOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import MuntilImage from "../Mutil-Image";
import RenderTag from "../render/RenderTag";

const TablePending = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const [requestsData, setRequestsData] = useState();
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [productImage, setProductImage] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [descriptionRequest, setDescriptionRequest] = useState("");
  const [descriptionReject, setDescriptionReject] = useState("");
  const staffId = localStorage.getItem("staffId");
  const [isModalVisibleNotApprove, setIsModalVisibleNotApprove] =
    useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [productRentPrice, setProductRentPrice] = useState([]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/request/getapproving"
      );
      setRequestsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const showDrawer = (record) => {
    console.log(record);
    const fetchProductImg = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/productimg?productID=" +
            record.productID
        );
        const imgUrlArray = response.data.map((item) => item.imgUrl);
        setProductImage(imgUrlArray);
        console.log(imgUrlArray);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchProductRentPrice = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/rentprice/" + record.productID
        );
        const filteredData = response.data.map((item) => ({
          mockDay: item.mockDay,
          rentPrice: item.rentPrice,
        }));

        setProductRentPrice(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductRentPrice();

    fetchProductImg();
    axios
      .get("http://fashionrental.online:8080/product/" + record.productID)
      .then((response) => {
        const specificationData = JSON.parse(
          response.data.productSpecificationData
        );
        const strapMaterialWatch = specificationData.strapMaterialWatch;
        const brandNameWatch = specificationData.brandNameWatch;
        const clockFaceWatch = specificationData.clockFaceWatch;
        const originWatch = specificationData.originWatch;
        const brandNameGlasses = specificationData.brandNameGlasses;
        const typeLensGlasses = specificationData.typeLensGlasses;
        const glassShape = specificationData.glassShape;
        const glassMaterial = specificationData.glassMaterial;
        const brandNameBag = specificationData.brandNameBag;
        const skinTexture = specificationData.skinTexture;
        const typeSkinBag = specificationData.typeSkinBag;
        const originBag = specificationData.originBag;
        const brandNameHat = specificationData.brandNameHat;
        const materialHat = specificationData.materialHat;
        const typeHat = specificationData.typeHat;
        const originHat = specificationData.originHat;
        const brandNameJewelry = specificationData.brandNameJewelry;
        const typeJewelrys = specificationData.typeJewelrys;
        const occasion = specificationData.occasion;
        const originJewelry = specificationData.originJewelry;
        const brandNameShoe = specificationData.brandNameShoe;
        const typeSkinShoe = specificationData.typeSkinShoe;
        const outsideSkin = specificationData.outsideSkin;
        const originShoe = specificationData.originShoe;
        console.log(response.data);
        form.setFieldsValue({
          brandNameHat: brandNameHat,
          typeHat: typeHat,
          materialHat: materialHat,
          originHat: originHat,
          brandNameJewelry: brandNameJewelry,
          typeJewelrys: typeJewelrys,
          occasion: occasion,
          originJewelry: originJewelry,
          brandNameShoe: brandNameShoe,
          typeSkinShoe: typeSkinShoe,
          outsideSkin: outsideSkin,
          originShoe: originShoe,
          checkType: response.data.checkType,
          avatar: response.data.avatar,
          productName: response.data.productName,
          productReceiptUrl: response.data.productReceiptUrl,
          description: response.data.description,
          price: response.data.price,
          status: response.data.status,
          forSale: response.data.forSale,
          forRent: response.data.forRent,
          categoryName: response.data.category.categoryName,
          imgProduct: response.data.imgProduct,
          strapMaterialWatch: strapMaterialWatch,
          brandNameWatch: brandNameWatch,
          clockFaceWatch: clockFaceWatch,
          originWatch: originWatch,
          glassMaterial: glassMaterial,
          brandNameGlasses: brandNameGlasses,
          typeLensGlasses: typeLensGlasses,
          glassShape: glassShape,
          brandNameBag: brandNameBag,
          skinTexture: skinTexture,
          typeSkinBag: typeSkinBag,
          originBag: originBag,
          // Các trường dữ liệu khác tương tự
        });
        setSelectedProduct({
          checkType: response.data.checkType,
          avatar: response.data.avatar,
          productName: response.data.productName,
          productCondition: response.data.productCondition,
          productReceiptUrl: response.data.productReceiptUrl,
          description: response.data.description,
          price: response.data.price,
          status: response.data.status,
          forSale: response.data.forSale,
          forRent: response.data.forRent,
          categoryName: response.data.category.categoryName,
          imgProduct: response.data.imgProduct,
          strapMaterialWatch: strapMaterialWatch,
          brandNameWatch: brandNameWatch,
          clockFaceWatch: clockFaceWatch,
          originWatch: originWatch,
          glassMaterial: glassMaterial,
          brandNameGlasses: brandNameGlasses,
          typeLensGlasses: typeLensGlasses,
          glassShape: glassShape,
          brandNameBag: brandNameBag,
          skinTexture: skinTexture,
          typeSkinBag: typeSkinBag,
          originBag: originBag,
          brandNameHat: brandNameHat,
          typeHat: typeHat,
          materialHat: materialHat,
          originHat: originHat,
          brandNameJewelry: brandNameJewelry,
          typeJewelrys: typeJewelrys,
          occasion: occasion,
          originJewelry: originJewelry,
          brandNameShoe: brandNameShoe,
          typeSkinShoe: typeSkinShoe,
          outsideSkin: outsideSkin,
          originShoe: originShoe,
        });
        setIsDrawerVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  //Modal duyet
  const showModalApprove = (record, productID) => {
    setIsModalVisible(true);
    localStorage.setItem(
      "requestAddingProductID",
      record.requestAddingProductID
    );
    localStorage.setItem("approvedProductID", productID);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    localStorage.removeItem("requestAddingProductID");
    localStorage.removeItem("approvedProductID");
  };
  //-----------------------------
  const handleOk = async () => {
    try {
      const response = await axios.put(
        `
        http://fashionrental.online:8080/request?description=` +
          descriptionRequest +
          `&requestID=` +
          localStorage.getItem("requestAddingProductID") +
          `&status=APPROVED`
      );
      if (response) {
        try {
          const staffRequest = await axios.post(
            "http://fashionrental.online:8080/staffrequested?requestAddingProductID=" +
              response.data.requestAddingProductID +
              "&staffID=" +
              staffId
          );
          api["success"]({
            message: "Duyệt Sản Phẩm Thành Công!",
            description: null,
          });
          console.log("update request staff success", staffRequest.data);
        } catch (error) {
          api["error"]({
            message: "Duyệt Sản Phẩm Thất Bại!",
            description: null,
          });
          console.error("Validation failed", error);
        }
        try {
          const productID = localStorage.getItem("approvedProductID");
          const newStatus = "AVAILABLE";
          const productStatus = await axios.put(
            `http://fashionrental.online:8080/product/updatebystaff?productID=${productID}&status=${newStatus}`
          );
          console.log("update product success", productStatus.data);
          localStorage.removeItem("requestAddingProductID");
          localStorage.removeItem("approvedProductID");
        } catch (error) {
          console.error("Validation failed", error);
        }
      }
      setIsModalVisible(false);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  //Modal Huy
  const showModalNotApprove = (record, productID) => {
    setIsModalVisibleNotApprove(true);
    // setIsModalVisible(true);
    localStorage.setItem(
      "requestAddingProductID",
      record.requestAddingProductID
    );
    localStorage.setItem("approvedProductID", productID);
  };
  const handleCancelNotApprove = () => {
    setIsModalVisibleNotApprove(false);
    localStorage.removeItem("requestAddingProductID");
    localStorage.removeItem("approvedProductID");
  };
  const handleSend = async () => {
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/request?description=` +
          descriptionReject +
          `&requestID=` +
          localStorage.getItem("requestAddingProductID") +
          `&status=NOT_APPROVED`
      );
      try {
        const staffRequest = await axios.post(
          "http://fashionrental.online:8080/staffrequested?requestAddingProductID=" +
            response.data.requestAddingProductID +
            "&staffID=" +
            staffId
        );
        api["success"]({
          message: "Từ Chối Sản Phẩm Thành Công!",
          description: null,
        });
        console.log("update request staff success", staffRequest.data);
      } catch (error) {
        api["error"]({
          message: "Từ Chối Sản Phẩm Thất Bại!",
          description: null,
        });
        console.error("Validation failed", error);
      }
      try {
        const productStatus = await axios.put(
          `http://fashionrental.online:8080/product/updatebystaff?productID=` +
            localStorage.getItem("approvedProductID") +
            `&status=BLOCKED`
        );
        console.log("update product success", productStatus.data);
      } catch (error) {
        console.error("Validation failed", error);
      }
      setIsModalVisibleNotApprove(false);
      fetchRequests();
      localStorage.removeItem("requestAddingProductID");
      localStorage.removeItem("approvedProductID");
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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

  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const translateCategoryName = (categoryName) => {
    const categoryMappings = {
      Watch: "Đồng hồ",
      Bag: "Túi",
      Hat: "Nón",
      Jewelry: "Trang Sức",
      Shoe: "Giày",
      Sunglasses: "Mắt kính",
    };
    return categoryMappings[categoryName] || categoryName;
  };

  const columnsRentPrice = [
    {
      title: "Số ngày thuê",
      dataIndex: "mockDay",
      key: "mockDay",
      width: "30%",
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Giá thuê",
      dataIndex: "rentPrice",
      key: "rentPrice",
      width: "50%",
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
  ];
  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p style={{ textAlign: "left", justifyContent: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },

    {
      title: <p style={{ textAlign: "center" }}>Hành Động</p>,
      key: "action",

      // width: "10%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showDrawer(record)}
          >
            <EyeTwoTone />
            Xem Đơn
          </Button>
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showModalApprove(record, record.productID)}
          >
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Button>
          <Button onClick={() => showModalNotApprove(record, record.productID)}>
            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
          </Button>
          <Modal
            title="Duyệt Sản Phẩm"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form}>
              <p>Lý Do Duyệt:</p>
              <Form.Item
                name="descriptionRequest"
                onChange={(e) => setDescriptionRequest(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "red" }}
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#008000", marginLeft: "20px" }}
                  onClick={handleOk}
                >
                  Duyệt
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Từ Chối Sản Phẩm"
            open={isModalVisibleNotApprove}
            onOk={handleSend}
            onCancel={handleCancelNotApprove}
            footer={null}
          >
            <Form form={form}>
              <p>Lý Do Từ Chối:</p>
              <Form.Item
                name="descriptionNotApprove"
                onChange={(e) => setDescriptionReject(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "red" }}
                  onClick={handleCancelNotApprove}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#008000", marginLeft: "20px" }}
                  onClick={handleSend}
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        responsive
        bordered={true}
        columns={columns}
        dataSource={requestsData}
      />
      {contextHolder}
      <Drawer
        title="Thông tin đơn hàng " // Customize the title as needed
        width={450} // Customize the width as needed
        onClose={() => setIsDrawerVisible(false)} // Close the Drawer when the close button is clicked
        open={isDrawerVisible} // Show the Drawer when isDrawerVisible is true
      >
        <Form form={form}>
          <Form.Item
            name="productName" //lấy value của cái name gán lên cái setFormValue
            initialValue={selectedProduct && selectedProduct.productName}
          >
            <div style={{ display: "flex" }}>
              <strong>Tên sản phẩm:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedProduct && selectedProduct.productName}
              </p>
            </div>
          </Form.Item>

          <Form.Item
            name="categoryName" //lấy value của cái name gán lên cái setFormValue
            initialValue={selectedProduct && selectedProduct.categoryName}
          >
            <div style={{ display: "flex" }}>
              <strong>Nghành Hàng:</strong>
              <p style={{ marginLeft: "10px" }}>
                {translateCategoryName(
                  selectedProduct && selectedProduct.categoryName
                )}
              </p>
            </div>
          </Form.Item>

          <Form.Item
            name="productCondition" //lấy value của cái name gán lên cái setFormValue
            initialValue={selectedProduct && selectedProduct.productCondition}
          >
            <div style={{ display: "flex" }}>
              <strong>Tình trạng sản phẩm:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedProduct && selectedProduct.productCondition}%
              </p>
            </div>
          </Form.Item>

          <Form.Item
            name="description"
            initialValue={selectedProduct && selectedProduct.description}
          >
            <div style={{ display: "flex" }}>
              <strong>Mô tả:</strong>
              <p
                style={{
                  marginLeft: "10px",
                  maxWidth: "300px",
                }}
              >
                {selectedProduct && selectedProduct.description}
              </p>
            </div>
          </Form.Item>
          {/* Set điều kiện để hiện thị theo category */}
          {selectedProduct && selectedProduct.categoryName === "Watch" && (
            <>
              <Form.Item
                name="brandNameWatch"
                initialValue={selectedProduct && selectedProduct.brandNameWatch}
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameWatch}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="clockFaceWatch"
                initialValue={selectedProduct && selectedProduct.clockFaceWatch}
              >
                <div style={{ display: "flex" }}>
                  <strong>Mặt đồng hồ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.clockFaceWatch}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="strapMaterialWatch"
                initialValue={
                  selectedProduct && selectedProduct.strapMaterialWatch
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Chất liệu dây đeo:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.strapMaterialWatch}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="originWatch"
                initialValue={selectedProduct && selectedProduct.originWatch}
              >
                <div style={{ display: "flex" }}>
                  <strong>Xuất sứ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.originWatch}
                  </p>
                </div>
              </Form.Item>
            </>
          )}
          {selectedProduct && selectedProduct.categoryName === "Sunglasses" && (
            <>
              <Form.Item
                name="brandNameGlasses"
                initialValue={
                  selectedProduct && selectedProduct.brandNameGlasses
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameGlasses}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="glassMaterial"
                initialValue={selectedProduct && selectedProduct.glassMaterial}
              >
                <div style={{ display: "flex" }}>
                  <strong>Chất liệu khung kính:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.glassMaterial}
                  </p>
                </div>
              </Form.Item>

              <Form.Item
                name="typeLensGlasses"
                initialValue={
                  selectedProduct && selectedProduct.typeLensGlasses
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Loại lens:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.typeLensGlasses}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="glassShape"
                initialValue={selectedProduct && selectedProduct.glassShape}
              >
                <div style={{ display: "flex" }}>
                  <strong>Hình dạng khung kính:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.glassShape}
                  </p>
                </div>
              </Form.Item>
            </>
          )}

          {selectedProduct && selectedProduct.categoryName === "Hat" && (
            <>
              <Form.Item
                name="brandNameHat"
                initialValue={selectedProduct && selectedProduct.brandNameHat}
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameHat}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="materialHat"
                initialValue={selectedProduct && selectedProduct.materialHat}
              >
                <div style={{ display: "flex" }}>
                  <strong>Chất liệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.materialHat}
                  </p>
                </div>
              </Form.Item>

              <Form.Item
                name="typeHat"
                initialValue={selectedProduct && selectedProduct.typeHat}
              >
                <div style={{ display: "flex" }}>
                  <strong>Kiểu nón:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.typeHat}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="originHat"
                initialValue={selectedProduct && selectedProduct.originHat}
              >
                <div style={{ display: "flex" }}>
                  <strong>Xuất xứ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.originHat}
                  </p>
                </div>
              </Form.Item>
            </>
          )}

          {selectedProduct && selectedProduct.categoryName === "Jewelry" && (
            <>
              <Form.Item
                name="brandNameJewelry"
                initialValue={
                  selectedProduct && selectedProduct.brandNameJewelry
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameJewelry}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="typeJewelrys"
                initialValue={selectedProduct && selectedProduct.typeJewelrys}
              >
                <div style={{ display: "flex" }}>
                  <strong>Chất liệu khung kính:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.typeJewelrys}
                  </p>
                </div>
              </Form.Item>

              <Form.Item
                name="occasion"
                initialValue={selectedProduct && selectedProduct.occasion}
              >
                <div style={{ display: "flex" }}>
                  <strong>Dịp:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.occasion}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="originJewelry"
                initialValue={selectedProduct && selectedProduct.originJewelry}
              >
                <div style={{ display: "flex" }}>
                  <strong>Xuất xứ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.originJewelry}
                  </p>
                </div>
              </Form.Item>
            </>
          )}
          {selectedProduct && selectedProduct.categoryName === "Shoe" && (
            <>
              <Form.Item
                name="brandNameShoe"
                initialValue={selectedProduct && selectedProduct.brandNameShoe}
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameShoe}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="typeSkinShoe"
                initialValue={selectedProduct && selectedProduct.typeSkinShoe}
              >
                <div style={{ display: "flex" }}>
                  <strong>Loại da:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.typeSkinShoe}
                  </p>
                </div>
              </Form.Item>

              <Form.Item
                name="outsideSkin"
                initialValue={selectedProduct && selectedProduct.outsideSkin}
              >
                <div style={{ display: "flex" }}>
                  <strong>Da ngoài:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.outsideSkin}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="originShoe"
                initialValue={selectedProduct && selectedProduct.originShoe}
              >
                <div style={{ display: "flex" }}>
                  <strong>Xuất xứ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.originShoe}
                  </p>
                </div>
              </Form.Item>
            </>
          )}
          {selectedProduct && selectedProduct.categoryName === "Bag" && (
            <>
              <Form.Item
                name="brandNameBag"
                initialValue={selectedProduct && selectedProduct.brandNameBag}
              >
                <div style={{ display: "flex" }}>
                  <strong>Thương hiệu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.brandNameBag}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="skinTexture"
                initialValue={selectedProduct && selectedProduct.skinTexture}
              >
                <div style={{ display: "flex" }}>
                  <strong>Kết cấu da:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.skinTexture}
                  </p>
                </div>
              </Form.Item>

              <Form.Item
                name="typeSkinBag"
                initialValue={selectedProduct && selectedProduct.typeSkinBag}
              >
                <div style={{ display: "flex" }}>
                  <strong>Loại da:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.typeSkinBag}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="originBag"
                initialValue={selectedProduct && selectedProduct.originBag}
              >
                <div style={{ display: "flex" }}>
                  <strong>Xuất xứ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProduct && selectedProduct.originBag}
                  </p>
                </div>
              </Form.Item>
            </>
          )}
          {/* ======================================================================== */}

          {/* <Form.Item
            name="status"
            initialValue={selectedProduct && selectedProduct.status}
          >
            <div style={{ display: "flex" }}>
              <strong>Trạng thái:</strong>

              <p style={{ marginLeft: "10px" }}>
                <RenderTag
                  tagRender={selectedProduct && selectedProduct.status}
                />
              </p>
            </div>
          </Form.Item> */}
          <Form.Item
            name="checkType"
            initialValue={selectedProduct && selectedProduct.checkType}
          >
            <div style={{ display: "flex" }}>
              <strong>Hình thức sản phẩm:</strong>

              <p style={{ marginLeft: "10px" }}>
                <RenderTag
                  tagRender={selectedProduct && selectedProduct.checkType}
                />
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="price"
            initialValue={selectedProduct && selectedProduct.price}
          >
            <div style={{ display: "flex" }}>
              <strong>Giá sản phẩm:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedProduct &&
                  `${selectedProduct.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })} `}
              </p>
            </div>
          </Form.Item>
          {selectedProduct && selectedProduct.checkType === "RENT" && (
            <>
              <strong>Giá thuê:</strong>
              <Table
                responsive
                bordered={true}
                columns={columnsRentPrice}
                dataSource={productRentPrice}
                pagination={false}
                style={{ marginBottom: "20px" }}
              />
            </>
          )}

          <Form.Item
            name="productReceiptUrl"
            initialValue={selectedProduct && selectedProduct.productReceiptUrl}
          >
            <strong style={{ marginRight: "10px" }}>Hoá đơn:</strong>
            <Image
              width={150}
              src={selectedProduct && selectedProduct.productReceiptUrl}
            />
          </Form.Item>

          <Form.Item
            name="imgProduct"
            initialValue={selectedProduct && selectedProduct.imgProduct}
          >
            <strong>Hình ảnh sản phẩm:</strong>

            <>
              <MuntilImage images={productImage} />
            </>
          </Form.Item>
        </Form>
        {/* Customize the content of the Drawer using selectedRecord */}

        {/* Add more details as needed */}
      </Drawer>
    </div>
  );
};
export default TablePending;
