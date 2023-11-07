import { EyeTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Drawer,
  Form,
  Image,
  Input,
  Space,
  Table,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import MuntilImage from "../Mutil-Image";
import RenderTag from "../render/RenderTag";

const TableAccept = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const [requestsData, setRequestsData] = useState([]);
  const idStaff = localStorage.getItem("staffId");
  const [productImage, setProductImage] = useState();

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
        "http://fashionrental.online:8080/staffrequested/approved/" + idStaff
      );

      setRequestsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  {
    previewImage && (
      <div className="image-preview">
        <img
          src={previewImage}
          alt="Xem Trước"
          onClick={() => setPreviewImage(null)} // Khi nhấp vào xem trước, đóng cửa sổ xem trước
        />
      </div>
    );
  }

  const showDrawer = (record) => {
    console.log(record);

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
      })
      .catch((error) => {
        console.error(error);
      });

    setIsDrawerVisible(true);

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
      console.log(selectedProduct?.checkType);
    };

    fetchProductImg();
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
      title: <p style={{ textAlign: "left" }}>ID</p>,
      dataIndex: "staffRequestedID",
      key: "staffRequestedID",
      width: "5%",
      ...getColumnSearchProps("staffRequestedID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      ...getColumnSearchProps("createDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Ngày duyệt",
      dataIndex: "updateDate",
      key: "updateDate",
      ...getColumnSearchProps("updateDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (status) => (
        <p style={{ textAlign: "left", justifyContent: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Lí do",
      dataIndex: "description",
      key: "description",
      render: (description) => <p>{description}</p>,
    },

    {
      title: <p style={{ textAlign: "center" }}>Hành Động</p>,
      key: "action",

      // width: "10%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => showDrawer(record)}>
            <EyeTwoTone />
            Xem Đơn
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table bordered={true} columns={columns} dataSource={requestsData} />
      <Drawer
        title="Thông tin đơn hàng" // Customize the title as needed
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
                {selectedProduct && selectedProduct.categoryName}
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
              <p style={{ marginLeft: "10px" }}>
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
          <Form.Item
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
          </Form.Item>
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
      </Drawer>
    </div>
  );
};
export default TableAccept;
