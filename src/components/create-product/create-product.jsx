import "./create-product.css";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase/firebase";
import {
  Button,
  Upload,
  Modal,
  Input,
  Select,
  Space,
  Form,
  notification,
  Slider,
  Divider,
  ConfigProvider,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
//---------------------------index Watch--------------
let indexBrandNameWatch = 0;
let indexClockFaceWatch = 0;
let indexStrapMaterial = 0;
let indexOrigin = 0;
//----------------------------------------------------
//---------------------------index Bag---------------
let indexBrandNameBag = 0;
let indexSkinTexture = 0;
let indexTypeSkinBag = 0;
let indexOriginBag = 0;
//----------------------------------------------------
//-------------------------index Glasses
let indexBrandNameGlasses = 0;
let indexTypeLensGlasses = 0;
let indexGlassShape = 0;
let indexGlassMaterial = 0;
//-----------------------------------------------------
//--------------------------Earrings(Khuyên Tai)-----------------------
let indexBrandNameEarrings = 0;
let indexEarringStyle = 0;
let indexOccasion = 0;
let indexOriginEarring = 0;
//-----------------------------------------------------
//-------------------------Shoe------------------------
let indexBrandNameShoe = 0;
let indexTypeSkinShoe = 0;
let indexTypeOutsideSkin = 0;
let indexOriginShoe = 0;
//-----------------------------------------------------
//-------------------------Hat-------------------------
let indexBrandNameHat = 0;
let indexMaterialHat = 0;
let indexTypeHat = 0;
let indexOriginHat = 0;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const CreateProduct = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [urlImages, setUrlImages] = useState([]);
  const [urlReceiptImage, setUrlReceiptImage] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const [checkType, setCheckType] = useState("SALE");
  const [checkCategory, setCheckCategory] = useState(""); // Giá trị mặc định của cái select
  const [categorys, setCategorys] = useState();
  const productownerId = localStorage.getItem("productownerId");
  const [form] = Form.useForm();
  const [sliderValue, setSliderValue] = useState(50);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [category, setCategory] = useState();

  //------------------------------------------Watch-----------------------------------------
  //BrandName
  const [itemsBrandNameWatch, setItemsBrandNameWatch] = useState([
    "Rolex",
    "Richard Mille",
    "Hublot",
    "Patek Philippe",
    "Cartier",
  ]);
  const [nameBrandWatch, setNameBrandWatch] = useState("");
  const inputBrandNameRef = useRef(null);
  //ClockFaceWatch-------------------------------------------------
  const [itemsClockFaceWatch, setItemsClockFaceWatch] = useState([
    "Kỹ Thuật Số",
    "Điện Tử",
    "Cơ",
    "Vừa Cơ Vừa Số",
  ]);
  const [nameClockFaceWatch, setNameClockFaceWatch] = useState("");
  const inputClockFaceRef = useRef(null);
  //StrapMaterial-----------------------------------------------------
  const [itemsStrapMaterial, setItemsStrapMaterial] = useState([
    "Hợp Kim",
    "Da Cá Sấu",
    "Thép Không Gỉ",
  ]);
  const [nameStrapMaterial, setNameStrapMaterial] = useState("");
  const inputStrapMaterialRef = useRef(null);
  //OriginWatch (xuất xứ)--------------------------------------------------
  const [itemsOrigin, setItemsOrigin] = useState([
    "Thụy Sĩ",
    "Anh",
    "Đức",
    "Pháp",
  ]);
  const [nameOrigin, setNameOrigin] = useState("");
  const inputOriginRef = useRef(null);
  //------------------------------------Bag-------------------------------
  //brandName Bag
  const [itemsBrandNameBag, setItemsBrandNameBag] = useState([
    "Louis Vuitton",
    "Hermes",
    "Channel",
    "Gucci",
    "Balenciaga",
    "Prada",
    "Fendi",
  ]);
  const [nameBrandNameBag, setNameBrandNameBag] = useState("");
  const inputBrandNameBagRef = useRef(null);
  //Skin Texture
  const [itemsSkinTexture, setItemsSkintexture] = useState([
    "Dập Nối",
    "Chần",
    "Trơn",
    "Dệt",
  ]);
  const [nameSkinTexture, setNameSkinTexture] = useState("");
  const inputSkinTextureRef = useRef(null);
  //TypeSkin
  const [itemsTypeSkinBag, setItemsTypeSkinBag] = useState([
    "Da Bò",
    "Da Trâu",
    "Da Cừu",
    "Da Cá Sấu",
  ]);
  const [nameTypeSkinBag, setNameTypeSkinBag] = useState("");
  const inputTypeSkinBagRef = useRef(null);
  ///////////////////////////
  //OriginBag
  const [itemsOriginBag, setItemsOriginBag] = useState([
    "Thụy Sĩ",
    "Anh",
    "Đức",
    "Pháp",
  ]);
  const [nameOriginBag, setNameOriginBag] = useState("");
  const inputOriginBagRef = useRef(null);
  ///////////////////////
  //--------------------------------------Glasses------------
  const [itemsBrandNameGlasses, setItemsBrandNameGlasses] = useState([
    "Louis Vuitton",
    "Hermes",
    "Channel",
    "Gucci",
    "Balenciaga",
    "Prada",
    "Fendi",
  ]);
  const [nameBrandNameGlasses, setNameBrandNameGlasses] = useState("");
  const inputBrandNameGlassesRef = useRef(null);
  /////////////
  //TypeLens Glasses
  const [itemsTypeLensGlasses, setItemsTypeLensGlasses] = useState([
    "Chống tia UV",
    "Lens phân cực",
    "Chống ánh sáng xanh",
  ]);
  const [nameTypeLensGlasses, setNameTypeLensGlasses] = useState("");
  const inputTypeLensGlassesRef = useRef(null);
  //////////////////
  //Glasses Shape
  const [itemsGlassShape, setItemsGlassShape] = useState([
    "Kính phi công",
    "Kính Mèo",
    "Oval",
    "Tròn",
    "Vuông",
  ]);
  const [nameGlassShape, setNameGlassShape] = useState("");
  const inputGlassShapeRef = useRef(null);
  ///////////////////
  //Glass Material
  const [itemsGlassMaterial, setItemsGlassMaterial] = useState([
    "Kim loại",
    "Nhựa",
    "Titanium",
    "Thép không gỉ",
    "Gỗ",
  ]);
  const [nameGlassMaterial, setNameGlassMaterial] = useState("");
  const inputGlassMaterialRef = useRef(null);
  /////////////////////
  //--------------------------------------------Earrings-------------------
  const [itemsBrandNameEarrings, setItemsBrandNameEarrings] = useState([
    "Louis Vuitton",
    "Hermes",
    "Channel",
    "Gucci",
    "Balenciaga",
    "Prada",
    "Fendi",
  ]);
  const [nameBrandNameEarrings, setNameBrandNameEarrings] = useState("");
  const inputBrandNameEarringsRef = useRef(null);
  ////////////////////////////
  //Earrings Type
  const [itemsEarringsType, setItemsEarringsType] = useState([
    "Nhẫn",
    "Khuyên tai ",
    "Vòng tay",
    "Dây chuyền",
  ]);
  const [nameEarringsType, setNameEarringsType] = useState("");
  const inputEarringsTypeRef = useRef(null);
  //////////////////////////////
  //Occasion (Dịp)
  const [itemsOccasion, setItemsOccasion] = useState([
    "Ngày kỉ niệm",
    "Kiết tường",
    "Sinh nhật",
    "Hôn ước",
    "Lễ cưới",
  ]);
  const [nameOccasion, setNameOccasion] = useState("");
  const inputOccasionRef = useRef(null);
  /////////////////////////////////
  //Origin Earring
  const [itemsOriginEarring, setItemsOriginEarring] = useState([
    "Thụy Sĩ",
    "Anh",
    "Đức",
    "Pháp",
  ]);
  const [nameOriginEarring, setNameOriginEarring] = useState("");
  const inputOriginEarringRef = useRef(null);
  //////////////////////////////////
  //--------------------------------------Select Shoe-------------------
  //BrandName Shoe
  const [itemsBrandNameShoe, setItemsBrandNameShoe] = useState([
    "Louis Vuitton",
    "Hermes",
    "Channel",
    "Gucci",
    "Balenciaga",
    "Prada",
    "Fendi",
  ]);
  const [nameBrandNameShoe, setNameBrandNameShoe] = useState("");
  const inputBrandNameShoeRef = useRef(null);
  ///////////////////
  //Type Skin Shoe
  const [itemsTypeSkinShoe, setItemsTypeSkinShoe] = useState([
    "Da Bò",
    "Da Trâu",
    "Da Cừu",
    "Da Cá Sấu",
  ]);
  const [nameTypeSkinShoe, setNameTypeSkinShoe] = useState("");
  const inputTypeSkinShoeRef = useRef(null);
  ///////////////////
  //Outside Skin
  const [itemsOutsideSkin, setItemsOutsideSkin] = useState([
    "Dập nối",
    "Bóng",
    "Mờ",
  ]);
  const [nameOutsideSkin, setNameOutsideSkin] = useState("");
  const inputOutsideSkinRef = useRef(null);
  ////////////////////
  //Origin Shoe
  const [itemsOriginShoe, setItemsOriginShoe] = useState([
    "Thụy Sĩ",
    "Anh",
    "Đức",
    "Pháp",
  ]);
  const [nameOriginShoe, setNameOriginShoe] = useState("");
  const inputOriginShoeRef = useRef(null);
  //////////////////////
  //--------------------------Select Hat---------------------------
  //BrandName hat
  const [itemsBrandNameHat, setItemsBrandNameHat] = useState([
    "Louis Vuitton",
    "Hermes",
    "Channel",
    "Gucci",
    "Balenciaga",
    "Prada",
    "Fendi",
  ]);
  const [nameBrandNameHat, setNameBrandNameHat] = useState("");
  const inputBrandNameHatRef = useRef(null);
  //////////
  //Material Hat
  const [itemsMaterialHat, setItemsMaterialHat] = useState([
    "Vải cotton Supima.",
    "Vải len Cashmere",
    "Vải len Cervelet",
    "Vải len Vicuna",
  ]);
  const [nameMaterialHat, setNameMaterialHat] = useState("");
  const inputMaterialHatRef = useRef(null);
  //////////
  //Type Hat
  const [itemsTypeHat, setItemsTypeHat] = useState([
    "Mũ đi biển",
    "Mũ lưỡi trai",
    "Mũ len",
    "Mũ Bucket",
    "Mũ Fedora",
    "Mũ Newsboy",
  ]);
  const [nameTypeHat, setNameTypeHat] = useState("");
  const inputTypeHatRef = useRef(null);
  ////////////////////
  //Origin Hat
  const [itemsOriginHat, setItemsOriginHat] = useState([
    "Thụy Sĩ",
    "Anh",
    "Đức",
    "Pháp",
  ]);
  const [nameOriginHat, setNameOriginHat] = useState("");
  const inputOriginHatRef = useRef(null);

  const categoryTranslations = {
    Watch: "Đồng Hồ",
    Hat: "Nón",
    Jewelry: "Trang Sức",
    Bag: "Túi",
    Sunglasses: "Mắt Kính",
    Shoe: "Giày",

    // Thêm các bản dịch loại sản phẩm khi cần
  };
  // Hàm cập nhật giá trị Slider khi người dùng thay đổi nó
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const fetchCategorys = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/category/getall"
      );

      setCategorys(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  //------------------------regex chỉ được nhập số---------------------

  const [api, contextHolder] = notification.useNotification();

  //-------------------------------------------------------------------

  const onFinish = async (values) => {
    if (checkCategory === 1) {
      const productSpecificationData = {
        strapMaterialWatch: values.strapMaterialWatch,
        brandNameWatch: values.brandNameWatch,
        clockFaceWatch: values.clockFaceWatch,
        originWatch: values.originWatch,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      // Check if productownerId is not null before making the API call
      if (productownerId !== null) {
        try {
          // Make the API call to create a new product
          const response = await axios.post(
            "http://fashionrental.online:8080/product/create",
            addProductData
          );

          // Handle success
          api["success"]({
            message: "Thêm Sản Phẩm Thành Công",
            description: `Bạn đã thêm ${values.productName} thành công`,
          });

          // Reset form fields
          form.resetFields();
          console.log("Registration successful", response.data);
          const detailName = [];
          const value = [];

          for (const key in values) {
            if (key.startsWith("detailName")) {
              detailName.push(values[key]);
            } else if (key.startsWith("value")) {
              value.push(values[key]);
            }
          }
          const combinedDetails = [];
          for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
            const detailObject = {
              productID: response.data.productID,
              detailName: detailName[i],
              value: value[i],
            };
            combinedDetails.push(detailObject);
          }
          console.log("Combined Details:", combinedDetails);
          if (detailName.length > 0 && value.length > 0) {
          try {
            const detailResponse = await axios.post(
              "http://fashionrental.online:8080/productdetail",
              combinedDetails
            );

            console.log("Detail product Success!!");
            console.log(detailResponse.data);
          } catch (error) {
            console.error("Error detail product:", error);
          }
          } else {
            console.log("Không có dữ liệu trong cả detailName và value.");
          }
          if (
            response.data.checkType === "RENT" ||
            response.data.checkType === "SALE_RENT"
          ) {
            // Additional logic for "RENT" or "SALE_RENT" checkType
            const mockDay = [];
            const rentPrice = [];

            // Extract values for mockDay and rentPrice
            for (const key in values) {
              if (key.startsWith("mockDay")) {
                mockDay.push(values[key]);
              } else if (key.startsWith("rentPrice")) {
                rentPrice.push(values[key]);
              }
            }

            // Prepare data for rent price API call
            const formRentPrice = {
              productID: response.data.productID,
              mockDay: mockDay,
              rentPrice: rentPrice,
            };

            try {
              // Make the API call to set rent prices
              const rentPriceResponse = await axios.post(
                "http://fashionrental.online:8080/rentprice",
                formRentPrice
              );

              console.log("Rent price Success!!");
              console.log(rentPriceResponse.data);
            } catch (error) {
              console.error("Error rent price:", error);
            }
          }

          // API call to create a request
          const formRequest = {
            productID: response.data.productID,
          };

          try {
            const requestResponse = await axios.post(
              "http://fashionrental.online:8080/request",
              formRequest
            );

            console.log("Request Success!!");
            console.log(requestResponse.data);
          } catch (error) {
            console.error("Error request:", error);
          }

          // API call to upload images
          const formData = {
            imgUrl: urlImages.map((image) => image.imgUrl),
            productID: response.data.productID,
          };

          try {
            const imgResponse = await axios.post(
              "http://fashionrental.online:8080/productimg",
              formData
            );

            console.log("Img Success!!");
            console.log(imgResponse.data);
          } catch (error) {
            console.error("Error uploading images:", error);
          }
        } catch (error) {
          // Handle API call failure
          console.error("Add new product failed", error);
          api["error"]({
            message: "Thêm Sản Phẩm Thất Bại",
            description: `Bạn đã thêm ${values.productName} thất bại`,
            duration: 1000,
          });
        }
      } else {
        // Handle the case where productownerId is null
        console.warn("productownerId is null. API call not made.");
        // Optionally handle this case as needed.
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    } else if (checkCategory == 2) {
      const productSpecificationData = {
        originHat: values.originHat,
        typeHat: values.typeHat,
        materialHat: values.materialHat,
        brandNameHat: values.brandNameHat,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      try {
        const response = await axios.post(
          "http://fashionrental.online:8080/product/create",
          addProductData
        );

        api["success"]({
          message: "Thêm Sản Phẩm Thành Công",
          description: `Bạn đã thêm ${values.productName} thành công`,
        });
        form.resetFields();
        console.log("Registration successful", response.data);
        const detailName = [];
        const value = [];

        for (const key in values) {
          if (key.startsWith("detailName")) {
            detailName.push(values[key]);
          } else if (key.startsWith("value")) {
            value.push(values[key]);
          }
        }
        const combinedDetails = [];
        for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
          const detailObject = {
            productID: response.data.productID,
            detailName: detailName[i],
            value: value[i],
          };
          combinedDetails.push(detailObject);
        }
        console.log("Combined Details:", combinedDetails);
        if (detailName.length > 0 && value.length > 0) {
        try {
          const detailResponse = await axios.post(
            "http://fashionrental.online:8080/productdetail",
            combinedDetails
          );

          console.log("Detail product Success!!");
          console.log(detailResponse.data);
        } catch (error) {
          console.error("Error detail product:", error);
        }
        } else {
          console.log("Không có dữ liệu trong cả detailName và value.");
        }
        if (
          response.data.checkType === "RENT" ||
          response.data.checkType === "SALE_RENT"
        ) {
          // Gọi API khi checkType là "RENT" hoặc "SALE_RENT"
          const mockDay = [];
          const rentPrice = [];

          for (const key in values) {
            if (key.startsWith("mockDay")) {
              mockDay.push(values[key]);
            } else if (key.startsWith("rentPrice")) {
              rentPrice.push(values[key]);
            }
          }
          const formRentPrice = {
            productID: response.data.productID,
            mockDay: mockDay,
            rentPrice: rentPrice,
          };
          try {
            const rentPriceResponse = await axios.post(
              "http://fashionrental.online:8080/rentprice",
              formRentPrice
            );

            console.log("Rent price Success!!");
            console.log(rentPriceResponse.data);
          } catch (error) {
            console.error("Error rent price:", error);
          }
        }
        //api request
        const formRequest = {
          productID: response.data.productID,
        };
        try {
          const requestResponse = await axios.post(
            "http://fashionrental.online:8080/request",
            formRequest
          );

          console.log("Request Success!!");
          console.log(requestResponse.data);
        } catch (error) {
          console.error("Error request:", error);
        }
        const formData = {
          imgUrl: urlImages.map((image) => image.imgUrl),
          productID: response.data.productID,
        };
        try {
          const imgResponse = await axios.post(
            "http://fashionrental.online:8080/productimg",
            formData
          );

          console.log("Img Success!!");
          console.log(imgResponse.data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } catch (error) {
        console.error("Add new product failed", error);
        api["error"]({
          message: "Thêm Sản Phẩm Thất Bại",
          description: `Bạn đã thêm ${values.productName} thất bại`,
          duration: 1000,
        });
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    } else if (checkCategory == 3) {
      const productSpecificationData = {
        brandNameJewelry: values.brandNameJewelry,
        typeJewelrys: values.typeJewelrys,
        occasion: values.occasion,
        originJewelry: values.originJewelry,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      try {
        const response = await axios.post(
          "http://fashionrental.online:8080/product/create",
          addProductData
        );

        api["success"]({
          message: "Thêm Sản Phẩm Thành Công",
          description: `Bạn đã thêm ${values.productName} thành công`,
        });
        form.resetFields();
        console.log("Registration successful", response.data);
        const detailName = [];
        const value = [];

        for (const key in values) {
          if (key.startsWith("detailName")) {
            detailName.push(values[key]);
          } else if (key.startsWith("value")) {
            value.push(values[key]);
          }
        }
        const combinedDetails = [];
        for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
          const detailObject = {
            productID: response.data.productID,
            detailName: detailName[i],
            value: value[i],
          };
          combinedDetails.push(detailObject);
        }
        console.log("Combined Details:", combinedDetails);
        if (detailName.length > 0 && value.length > 0) {
        try {
          const detailResponse = await axios.post(
            "http://fashionrental.online:8080/productdetail",
            combinedDetails
          );

          console.log("Detail product Success!!");
          console.log(detailResponse.data);
        } catch (error) {
          console.error("Error detail product:", error);
        }
        } else {
          console.log("Không có dữ liệu trong cả detailName và value.");
        }
        if (
          response.data.checkType === "RENT" ||
          response.data.checkType === "SALE_RENT"
        ) {
          // Gọi API khi checkType là "RENT" hoặc "SALE_RENT"
          const mockDay = [];
          const rentPrice = [];

          for (const key in values) {
            if (key.startsWith("mockDay")) {
              mockDay.push(values[key]);
            } else if (key.startsWith("rentPrice")) {
              rentPrice.push(values[key]);
            }
          }
          const formRentPrice = {
            productID: response.data.productID,
            mockDay: mockDay,
            rentPrice: rentPrice,
          };
          try {
            const rentPriceResponse = await axios.post(
              "http://fashionrental.online:8080/rentprice",
              formRentPrice
            );

            console.log("Rent price Success!!");
            console.log(rentPriceResponse.data);
          } catch (error) {
            console.error("Error rent price:", error);
          }
        }
        //api request
        const formRequest = {
          productID: response.data.productID,
        };
        try {
          const requestResponse = await axios.post(
            "http://fashionrental.online:8080/request",
            formRequest
          );

          console.log("Request Success!!");
          console.log(requestResponse.data);
        } catch (error) {
          console.error("Error request:", error);
        }
        const formData = {
          imgUrl: urlImages.map((image) => image.imgUrl),
          productID: response.data.productID,
        };
        try {
          const imgResponse = await axios.post(
            "http://fashionrental.online:8080/productimg",
            formData
          );

          console.log("Img Success!!");
          console.log(imgResponse.data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } catch (error) {
        console.error("Add new product failed", error);
        api["error"]({
          message: "Thêm Sản Phẩm Thất Bại",
          description: `Bạn đã thêm ${values.productName} thất bại`,
          duration: 1000,
        });
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    } else if (checkCategory == 4) {
      const productSpecificationData = {
        brandNameBag: values.brandNameBag,
        skinTexture: values.skinTexture,
        typeSkinBag: values.typeSkinBag,
        originBag: values.originBag,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      // Check if productownerId is not null before making the API call
      if (productownerId !== null) {
        try {
          // Make the API call to create a new product
          const response = await axios.post(
            "http://fashionrental.online:8080/product/create",
            addProductData
          );

          // Handle success
          api["success"]({
            message: "Thêm Sản Phẩm Thành Công",
            description: `Bạn đã thêm ${values.productName} thành công`,
          });

          // Reset form fields
          form.resetFields();

          console.log("Registration successful", response.data);
          const detailName = [];
          const value = [];

          for (const key in values) {
            if (key.startsWith("detailName")) {
              detailName.push(values[key]);
            } else if (key.startsWith("value")) {
              value.push(values[key]);
            }
          }
          const combinedDetails = [];
          for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
            const detailObject = {
              productID: response.data.productID,
              detailName: detailName[i],
              value: value[i],
            };
            combinedDetails.push(detailObject);
          }
          console.log("Combined Details:", combinedDetails);
          if (detailName.length > 0 && value.length > 0) {
          try {
            const detailResponse = await axios.post(
              "http://fashionrental.online:8080/productdetail",
              combinedDetails
            );

            console.log("Detail product Success!!");
            console.log(detailResponse.data);
          } catch (error) {
            console.error("Error detail product:", error);
          }
          } else {
            console.log("Không có dữ liệu trong cả detailName và value.");
          }
          if (
            response.data.checkType === "RENT" ||
            response.data.checkType === "SALE_RENT"
          ) {
            // Additional logic for "RENT" or "SALE_RENT" checkType
            const mockDay = [];
            const rentPrice = [];

            // Extract values for mockDay and rentPrice
            for (const key in values) {
              if (key.startsWith("mockDay")) {
                mockDay.push(values[key]);
              } else if (key.startsWith("rentPrice")) {
                rentPrice.push(values[key]);
              }
            }

            // Prepare data for rent price API call
            const formRentPrice = {
              productID: response.data.productID,
              mockDay: mockDay,
              rentPrice: rentPrice,
            };

            try {
              // Make the API call to set rent prices
              const rentPriceResponse = await axios.post(
                "http://fashionrental.online:8080/rentprice",
                formRentPrice
              );

              console.log("Rent price Success!!");
              console.log(rentPriceResponse.data);
            } catch (error) {
              console.error("Error rent price:", error);
            }
          }

          // API call to create a request
          const formRequest = {
            productID: response.data.productID,
          };

          try {
            const requestResponse = await axios.post(
              "http://fashionrental.online:8080/request",
              formRequest
            );

            console.log("Request Success!!");
            console.log(requestResponse.data);
          } catch (error) {
            console.error("Error request:", error);
          }

          // API call to upload images
          const formData = {
            imgUrl: urlImages.map((image) => image.imgUrl),
            productID: response.data.productID,
          };

          try {
            const imgResponse = await axios.post(
              "http://fashionrental.online:8080/productimg",
              formData
            );

            console.log("Img Success!!");
            console.log(imgResponse.data);
          } catch (error) {
            console.error("Error uploading images:", error);
          }
        } catch (error) {
          // Handle API call failure
          console.error("Add new product failed", error);
          api["error"]({
            message: "Thêm Sản Phẩm Thất Bại",
            description: `Bạn đã thêm ${values.productName} thất bại`,
            duration: 1000,
          });
        }
      } else {
        // Handle the case where productownerId is null
        console.warn("productownerId is null. API call not made.");
        // Optionally handle this case as needed.
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    } else if (checkCategory == 5) {
      const productSpecificationData = {
        glassMaterial: values.glassMaterial,
        brandNameGlasses: values.brandNameGlasses,
        typeLensGlasses: values.typeLensGlasses,
        glassShape: values.glassShape,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      try {
        const response = await axios.post(
          "http://fashionrental.online:8080/product/create",
          addProductData
        );

        api["success"]({
          message: "Thêm Sản Phẩm Thành Công",
          description: `Bạn đã thêm ${values.productName} thành công`,
        });
        form.resetFields();
        console.log("Registration successful", response.data);
        const detailName = [];
        const value = [];

        for (const key in values) {
          if (key.startsWith("detailName")) {
            detailName.push(values[key]);
          } else if (key.startsWith("value")) {
            value.push(values[key]);
          }
        }
        const combinedDetails = [];
        for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
          const detailObject = {
            productID: response.data.productID,
            detailName: detailName[i],
            value: value[i],
          };
          combinedDetails.push(detailObject);
        }
        console.log("Combined Details:", combinedDetails);
        if (detailName.length > 0 && value.length > 0) {
        try {
          const detailResponse = await axios.post(
            "http://fashionrental.online:8080/productdetail",
            combinedDetails
          );

          console.log("Detail product Success!!");
          console.log(detailResponse.data);
        } catch (error) {
          console.error("Error detail product:", error);
        }
        } else {
          console.log("Không có dữ liệu trong cả detailName và value.");
        }
        if (
          response.data.checkType === "RENT" ||
          response.data.checkType === "SALE_RENT"
        ) {
          // Gọi API khi checkType là "RENT" hoặc "SALE_RENT"
          const mockDay = [];
          const rentPrice = [];

          for (const key in values) {
            if (key.startsWith("mockDay")) {
              mockDay.push(values[key]);
            } else if (key.startsWith("rentPrice")) {
              rentPrice.push(values[key]);
            }
          }
          const formRentPrice = {
            productID: response.data.productID,
            mockDay: mockDay,
            rentPrice: rentPrice,
          };
          try {
            const rentPriceResponse = await axios.post(
              "http://fashionrental.online:8080/rentprice",
              formRentPrice
            );

            console.log("Rent price Success!!");
            console.log(rentPriceResponse.data);
          } catch (error) {
            console.error("Error rent price:", error);
          }
        }
        //api request
        const formRequest = {
          productID: response.data.productID,
        };
        try {
          const requestResponse = await axios.post(
            "http://fashionrental.online:8080/request",
            formRequest
          );

          console.log("Request Success!!");
          console.log(requestResponse.data);
        } catch (error) {
          console.error("Error request:", error);
        }
        const formData = {
          imgUrl: urlImages.map((image) => image.imgUrl),
          productID: response.data.productID,
        };
        try {
          const imgResponse = await axios.post(
            "http://fashionrental.online:8080/productimg",
            formData
          );

          console.log("Img Success!!");
          console.log(imgResponse.data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } catch (error) {
        console.error("Add new product failed", error);
        api["error"]({
          message: "Thêm Sản Phẩm Thất Bại",
          description: `Bạn đã thêm ${values.productName} thất bại`,
          duration: 1000,
        });
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    } else if (checkCategory == 6) {
      const productSpecificationData = {
        brandNameShoe: values.brandNameShoe,
        typeSkinShoe: values.typeSkinShoe,
        outsideSkin: values.outsideSkin,
        originShoe: values.originShoe,
      };

      const addProductData = {
        checkType: checkType,
        description: values.description,
        price: values.price,
        productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
        productName: values.productName,
        productCondition: sliderValue,
        productSpecificationData: JSON.stringify(productSpecificationData),
        productReceiptUrl: urlReceiptImage,
        categoryID: checkCategory,
        status: "WAITING",
        productownerID: productownerId,
      };

      try {
        const response = await axios.post(
          "http://fashionrental.online:8080/product/create",
          addProductData
        );

        api["success"]({
          message: "Thêm Sản Phẩm Thành Công",
          description: `Bạn đã thêm ${values.productName} thành công`,
        });
        form.resetFields();
        console.log("Registration successful", response.data);
        const detailName = [];
        const value = [];

        for (const key in values) {
          if (key.startsWith("detailName")) {
            detailName.push(values[key]);
          } else if (key.startsWith("value")) {
            value.push(values[key]);
          }
        }
        const combinedDetails = [];
        for (let i = 0; i < Math.min(detailName.length, value.length); i++) {
          const detailObject = {
            productID: response.data.productID,
            detailName: detailName[i],
            value: value[i],
          };
          combinedDetails.push(detailObject);
        }
        console.log("Combined Details:", combinedDetails);
        if (detailName.length > 0 && value.length > 0) {
        try {
          const detailResponse = await axios.post(
            "http://fashionrental.online:8080/productdetail",
            combinedDetails
          );

          console.log("Detail product Success!!");
          console.log(detailResponse.data);
        } catch (error) {
          console.error("Error detail product:", error);
        }
        } else {
          console.log("Không có dữ liệu trong cả detailName và value.");
        }
        if (
          response.data.checkType === "RENT" ||
          response.data.checkType === "SALE_RENT"
        ) {
          // Gọi API khi checkType là "RENT" hoặc "SALE_RENT"
          const mockDay = [];
          const rentPrice = [];

          for (const key in values) {
            if (key.startsWith("mockDay")) {
              mockDay.push(values[key]);
            } else if (key.startsWith("rentPrice")) {
              rentPrice.push(values[key]);
            }
          }
          const formRentPrice = {
            productID: response.data.productID,
            mockDay: mockDay,
            rentPrice: rentPrice,
          };
          try {
            const rentPriceResponse = await axios.post(
              "http://fashionrental.online:8080/rentprice",
              formRentPrice
            );

            console.log("Rent price Success!!");
            console.log(rentPriceResponse.data);
          } catch (error) {
            console.error("Error rent price:", error);
          }
        }
        //api request
        const formRequest = {
          productID: response.data.productID,
        };
        try {
          const requestResponse = await axios.post(
            "http://fashionrental.online:8080/request",
            formRequest
          );

          console.log("Request Success!!");
          console.log(requestResponse.data);
        } catch (error) {
          console.error("Error request:", error);
        }
        const formData = {
          imgUrl: urlImages.map((image) => image.imgUrl),
          productID: response.data.productID,
        };
        try {
          const imgResponse = await axios.post(
            "http://fashionrental.online:8080/productimg",
            formData
          );

          console.log("Img Success!!");
          console.log(imgResponse.data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } catch (error) {
        console.error("Add new product failed", error);
        api["error"]({
          message: "Thêm Sản Phẩm Thất Bại",
          description: `Bạn đã thêm ${values.productName} thất bại`,
          duration: 1000,
        });
      }

      console.log(addProductData);
      console.log(productSpecificationData);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  useEffect(() => {
    console.log(urlImages);
  }, [urlImages]);
  const handleFileChange = async (event) => {
    try {
      if (event.file.status !== "removed") {
        console.log("handleFileChange called");
        console.log("File selected:", event.file);
        const imageRef = ref(storage, `images/${event.file.name + v4()}`);

        uploadBytes(imageRef, event.file)
          .then((snapshot) => {
            // Set the URL after a successful upload
            getDownloadURL(snapshot.ref).then((url) => {
              setUrlImages((prevUrls) => [
                ...prevUrls,
                { imgUrl: url, fileName: event.file.name },
              ]);
            });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        setUrlImages((prevUrls) =>
          prevUrls.filter((item) => item.fileName !== event.file.name)
        );
        console.log("File removed:", event.file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleFileChangeReceipt = async (event) => {
    try {
      if (event.file.status !== "removed") {
        // const file = event.file;
        // const imageRef = ref(storage, `images/${file.name + v4()}`);
        // const snapshot = await uploadBytes(imageRef, file.originFileObj);
        // const url = await getDownloadURL(imageRef);

        // setUrlReceiptImage(url);
        const imageRef = ref(storage, `images/${event.file.name + v4()}`);

        uploadBytes(imageRef, event.file)
          .then((snapshot) => {
            // Set the URL after a successful upload
            getDownloadURL(snapshot.ref).then((url) => {
              setUrlReceiptImage(url);
            });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        setUrlReceiptImage("");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //ham select ------------------------------------------------------------------------
  const selectChange = (value) => {
    console.log(`Đã chọn giá trị ${value}`);
    setCheckType(value);
  };
  const selectChangeCategory = (value) => {
    setCheckCategory(value);
    setCategory(value);
    setShowSecondPart(!!value);
  };

  const [isInputBrandNameValid, setIsInputBrandNameValid] = useState(false);
  const onNameChangeBrandWatch = (event) => {
    const inputBrandNameText = event.target.value;
    setNameBrandWatch(inputBrandNameText);
    setIsInputBrandNameValid(!!inputBrandNameText);
  };
  const addItemBrandNameWatch = (e) => {
    e.preventDefault();
    if (isInputBrandNameValid) {
      setItemsBrandNameWatch([
        ...itemsBrandNameWatch,
        nameBrandWatch || `New item ${indexBrandNameWatch++}`,
      ]);
      setNameBrandWatch("");
      setIsInputBrandNameValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////

  //SelectClockFaceWatch (Mặt Đồng Hồ)
  const [isInputClockFaceValid, setIsInputClockFaceValid] = useState(false);
  const onNameChangeClockFaceWatch = (event) => {
    const inputClockFaceText = event.target.value;
    setNameClockFaceWatch(inputClockFaceText);
    setIsInputClockFaceValid(!!inputClockFaceText);
  };
  const addItemClockFaceWatch = (e) => {
    e.preventDefault();
    if (isInputClockFaceValid) {
      setItemsClockFaceWatch([
        ...itemsClockFaceWatch,
        nameClockFaceWatch || `New item ${indexClockFaceWatch++}`,
      ]);
      setNameClockFaceWatch("");
      setIsInputClockFaceValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputClockFaceRef.current?.focus();
      }, 0);
    }
  };
  ////////////////////////////

  //Select StrapMaterial (Chất Liệu Dây Đeo)
  const [isInputStrapMaterialValid, setIsInputStrapMaterialValid] =
    useState(false);
  const onNameChangeStrapMaterial = (event) => {
    const inputStrapMaterialText = event.target.value;
    setNameStrapMaterial(inputStrapMaterialText);
    setIsInputStrapMaterialValid(!!inputStrapMaterialText);
  };
  const addItemStrapMaterial = (e) => {
    e.preventDefault();
    if (isInputStrapMaterialValid) {
      setItemsStrapMaterial([
        ...itemsStrapMaterial,
        nameStrapMaterial || `New item ${indexStrapMaterial++}`,
      ]);
      setNameStrapMaterial("");
      setIsInputStrapMaterialValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputStrapMaterialRef.current?.focus();
      }, 0);
    }
  };
  //////////////////////
  console.log(category);
  //Origin(Xuất Xứ)
  const [isInputOriginValid, setIsInputOriginValid] = useState(false);
  const onNameChangeOrigin = (event) => {
    const inputOriginText = event.target.value;
    setNameOrigin(inputOriginText);
    setIsInputOriginValid(!!inputOriginText);
  };
  const addItemOrigin = (e) => {
    e.preventDefault();
    if (isInputOriginValid) {
      setItemsOrigin([
        ...itemsOrigin,
        nameOrigin || `New item ${indexOrigin++}`,
      ]);
      setNameOrigin("");
      setIsInputOriginValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOriginRef.current?.focus();
      }, 0);
    }
  };
  //--------------------------------------------------------------------------------------

  //----------------------------------Select Detail Bag-----------------------------------
  //BrandName Bag
  const [isInputBrandNameBagValid, setIsInputBrandNameBagValid] =
    useState(false);
  const onNameChangeBrandNameBag = (event) => {
    const inputBrandNameBagText = event.target.value;
    setNameBrandNameBag(inputBrandNameBagText);
    setIsInputBrandNameBagValid(!!inputBrandNameBagText);
  };
  const addItemBrandNameBag = (e) => {
    e.preventDefault();
    if (isInputBrandNameBagValid) {
      setItemsBrandNameBag([
        ...itemsBrandNameBag,
        nameBrandNameBag || `New item ${indexBrandNameBag++}`,
      ]);
      setNameBrandNameBag("");
      setIsInputBrandNameBagValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameBagRef.current?.focus();
      }, 0);
    }
  };
  ////////////////////////////////////////
  //skin texture(Kết cấu da)
  const [isInputSkinTextureValid, setIsInputSkinTextureValid] = useState(false);
  const onNameChangeSkinTexture = (event) => {
    const inputSkinTextureText = event.target.value;
    setNameSkinTexture(inputSkinTextureText);
    setIsInputSkinTextureValid(!!inputSkinTextureText);
  };
  const addItemSkinTexture = (e) => {
    e.preventDefault();
    if (isInputSkinTextureValid) {
      setItemsSkintexture([
        ...itemsSkinTexture,
        nameSkinTexture || `New item ${indexSkinTexture++}`,
      ]);
      setNameSkinTexture("");
      setIsInputSkinTextureValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputSkinTextureRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////////
  //TypeSkinBag
  const [isInputTypeSkinBagValid, setIsInputTypeSkinBagValid] = useState(false);
  const onNameChangeTypeSkinBag = (event) => {
    const inputTypeSkinbagText = event.target.value;
    setNameTypeSkinBag(inputTypeSkinbagText);
    setIsInputTypeSkinBagValid(!!inputTypeSkinbagText);
  };
  const addItemTypeSkinBag = (e) => {
    e.preventDefault();
    if (isInputTypeSkinBagValid) {
      setItemsTypeSkinBag([
        ...itemsTypeSkinBag,
        nameTypeSkinBag || `New item ${indexTypeSkinBag++}`,
      ]);
      setNameTypeSkinBag("");
      setIsInputTypeSkinBagValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputTypeSkinBagRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////////////
  //OriginBag
  const [isInputOriginBagValid, setIsInputOriginBagValid] = useState(false);
  const onNameChangeOriginBag = (event) => {
    const inputOriginBagText = event.target.value;
    setNameOriginBag(inputOriginBagText);
    setIsInputOriginBagValid(!!inputOriginBagText);
  };
  const addItemOriginBag = (e) => {
    e.preventDefault();
    if (isInputOriginBagValid) {
      setItemsOriginBag([
        ...itemsOriginBag,
        nameOriginBag || `New item ${indexOriginBag++}`,
      ]);
      setNameOriginBag("");
      setIsInputOriginBagValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOriginBagRef.current?.focus();
      }, 0);
    }
  };
  ////////////////////////////////
  //---------------------------Select Glasses----------------------
  //BrandName Glasses
  const [isInputBrandNameGlassesValid, setIsInputBrandNameGlassesValid] =
    useState(false);
  const onNameChangeBrandNameGlasses = (event) => {
    const inputBrandNameGlassesText = event.target.value;
    setNameBrandNameGlasses(inputBrandNameGlassesText);
    setIsInputBrandNameGlassesValid(!!inputBrandNameGlassesText);
  };
  const addItemBrandNameGlasses = (e) => {
    e.preventDefault();
    if (isInputBrandNameGlassesValid) {
      setItemsBrandNameGlasses([
        ...itemsBrandNameGlasses,
        nameBrandNameGlasses || `New item ${indexBrandNameGlasses++}`,
      ]);
      setNameBrandNameGlasses("");
      setIsInputBrandNameGlassesValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameGlassesRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////////////////
  //TypeLensGlasses
  const [isInputTypeLensGlassesValid, setIsInputTypeLensGlassesValid] =
    useState(false);
  const onNameChangeTypeLensGlasses = (event) => {
    const inputTypeLensGlassesText = event.target.value;
    setNameTypeLensGlasses(inputTypeLensGlassesText);
    setIsInputTypeLensGlassesValid(!!inputTypeLensGlassesText);
  };
  const addItemTypeLensGlasses = (e) => {
    e.preventDefault();
    if (isInputTypeLensGlassesValid) {
      setItemsTypeLensGlasses([
        ...itemsTypeLensGlasses,
        nameTypeLensGlasses || `New item ${indexTypeLensGlasses++}`,
      ]);
      setNameTypeLensGlasses("");
      setIsInputTypeLensGlassesValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputTypeLensGlassesRef.current?.focus();
      }, 0);
    }
  };

  //////////////////////////////////////////////
  //GlassShape
  const [isInputGlassShapeValid, setIsInputGlassShapeValid] = useState(false);
  const onNameChangeGlassShape = (event) => {
    const inputGlassShapeText = event.target.value;
    setNameGlassShape(inputGlassShapeText);
    setIsInputGlassShapeValid(!!inputGlassShapeText);
  };
  const addItemGlassShape = (e) => {
    e.preventDefault();
    if (isInputGlassShapeValid) {
      setItemsGlassShape([
        ...itemsGlassShape,
        nameGlassShape || `New item ${indexGlassShape++}`,
      ]);
      setNameGlassShape("");
      setIsInputGlassShapeValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputGlassShapeRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////
  //Glass Material
  const [isInputGlassMaterialValid, setIsInputGlassMaterialValid] =
    useState(false);
  const onNameChangeGlassMaterial = (event) => {
    const inputGlassMaterialText = event.target.value;
    setNameGlassMaterial(inputGlassMaterialText);
    setIsInputGlassMaterialValid(!!inputGlassMaterialText);
  };
  const addItemGlassMaterial = (e) => {
    e.preventDefault();
    if (isInputGlassMaterialValid) {
      setItemsGlassMaterial([
        ...itemsGlassMaterial,
        nameGlassMaterial || `New item ${indexGlassMaterial++}`,
      ]);
      setNameGlassMaterial("");
      setIsInputGlassMaterialValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputGlassMaterialRef.current?.focus();
      }, 0);
    }
  };
  //----------------------------------------Earrings-----------------------------------
  //BrandName Earrings
  const [isInputBrandNameEarringsValid, setIsInputBrandNameEarringsValid] =
    useState(false);
  const onNameChangeBrandNameEarrings = (event) => {
    const inputBrandNameEarringsText = event.target.value;
    setNameBrandNameEarrings(inputBrandNameEarringsText);
    setIsInputBrandNameEarringsValid(!!inputBrandNameEarringsText);
  };
  const addItemBrandNameEarrings = (e) => {
    e.preventDefault();
    if (isInputBrandNameEarringsValid) {
      setItemsBrandNameEarrings([
        ...itemsBrandNameEarrings,
        nameBrandNameEarrings || `New item ${indexBrandNameEarrings++}`,
      ]);
      setNameBrandNameEarrings("");
      setIsInputBrandNameEarringsValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameEarringsRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////////
  //Earring Type
  const [isInputEarringsTypeValid, setIsInputEarringsTypeValid] =
    useState(false);
  const onNameChangeEarringsType = (event) => {
    const inputEarringsTypeText = event.target.value;
    setNameEarringsType(inputEarringsTypeText);
    setIsInputEarringsTypeValid(!!inputEarringsTypeText);
  };
  const addItemEarringsType = (e) => {
    e.preventDefault();
    if (isInputEarringsTypeValid) {
      setItemsEarringsType([
        ...itemsEarringsType,
        nameEarringsType || `New item ${indexEarringStyle++}`,
      ]);
      setNameEarringsType("");
      setIsInputEarringsTypeValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputEarringsTypeRef.current?.focus();
      }, 0);
    }
  };
  //////////////////////
  //Occasion
  const [isInputOccasionValid, setIsInputOccasionValid] = useState(false);
  const onNameChangeOccasion = (event) => {
    const inputOccasionText = event.target.value;
    setNameOccasion(inputOccasionText);
    setIsInputOccasionValid(!!inputOccasionText);
  };
  const addItemOccasion = (e) => {
    e.preventDefault();
    if (isInputOccasionValid) {
      setItemsOccasion([
        ...itemsOccasion,
        nameOccasion || `New item ${indexOccasion++}`,
      ]);
      setNameOccasion("");
      setIsInputOccasionValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOccasionRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////
  //OriginEarring
  const [isInputOriginEarringValid, setIsInputOriginEarringValid] =
    useState(false);
  const onNameChangeOriginEarring = (event) => {
    const inputOriginEarringText = event.target.value;
    setNameOriginEarring(inputOriginEarringText);
    setIsInputOriginEarringValid(!!inputOriginEarringText);
  };
  const addItemOriginEarring = (e) => {
    e.preventDefault();
    if (isInputOriginEarringValid) {
      setItemsOriginEarring([
        ...itemsOriginEarring,
        nameOriginEarring || `New item ${indexOriginEarring++}`,
      ]);
      setNameOriginEarring("");
      setIsInputOriginEarringValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOriginEarringRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////
  //-------------------------------Shoe--------------------------
  //BrandName Shoe
  const [isInputBrandNameShoeValid, setIsInputBrandNameShoeValid] =
    useState(false);
  const onNameChangeBrandNameShoe = (event) => {
    const inputBrandNameShoeText = event.target.value;
    setNameBrandNameShoe(inputBrandNameShoeText);
    setIsInputBrandNameShoeValid(!!inputBrandNameShoeText);
  };
  const addItemBrandNameShoe = (e) => {
    e.preventDefault();
    if (isInputBrandNameShoeValid) {
      setItemsBrandNameShoe([
        ...itemsBrandNameShoe,
        nameBrandNameShoe || `New item ${indexBrandNameShoe++}`,
      ]);
      setNameBrandNameShoe("");
      setIsInputBrandNameShoeValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameShoeRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////
  //Type Skin Shoe
  const [isInputTypeSkinShoeValid, setIsInputTypeSkinShoeValid] =
    useState(false);
  const onNameChangeTypeSkinShoe = (event) => {
    const inputTypeSkinShoeText = event.target.value;
    setNameTypeSkinShoe(inputTypeSkinShoeText);
    setIsInputTypeSkinShoeValid(!!inputTypeSkinShoeText);
  };
  const addItemTypeSkinShoe = (e) => {
    e.preventDefault();
    if (isInputTypeSkinShoeValid) {
      setItemsTypeSkinShoe([
        ...itemsTypeSkinShoe,
        nameTypeSkinShoe || `New item ${indexTypeSkinShoe++}`,
      ]);
      setNameTypeSkinShoe("");
      setIsInputTypeSkinShoeValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputTypeSkinShoeRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////
  //OutsideSkin
  const [isInputOutsideSkinValid, setIsInputOutsideSkinValid] = useState(false);
  const onNameChangOutsideSkin = (event) => {
    const inputOutsideSkinText = event.target.value;
    setNameOutsideSkin(inputOutsideSkinText);
    setIsInputOutsideSkinValid(!!inputOutsideSkinText);
  };
  const addItemOutsideSkin = (e) => {
    e.preventDefault();
    if (isInputOutsideSkinValid) {
      setItemsOutsideSkin([
        ...itemsOutsideSkin,
        nameOutsideSkin || `New item ${indexTypeOutsideSkin++}`,
      ]);
      setNameOutsideSkin("");
      setIsInputOutsideSkinValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOutsideSkinRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////////////////////
  //Origin Shoe
  const [isInputOriginShoeValid, setIsInputOriginShoeValid] = useState(false);
  const onNameChangeOriginShoe = (event) => {
    const inputOriginShoeText = event.target.value;
    setNameOriginShoe(inputOriginShoeText);
    setIsInputOriginShoeValid(!!inputOriginShoeText);
  };
  const addItemOriginShoe = (e) => {
    e.preventDefault();
    if (isInputOriginShoeValid) {
      setItemsOriginShoe([
        ...itemsOriginShoe,
        nameOriginShoe || `New item ${indexOriginShoe++}`,
      ]);
      setNameOriginShoe("");
      setIsInputOriginShoeValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOriginShoeRef.current?.focus();
      }, 0);
    }
  };

  //////////////////////////
  //------------------------Select Hat--------------------------
  const [isInputBrandNameHatValid, setIsInputBrandNameHatValid] =
    useState(false);
  const onNameChangeBrandNameHat = (event) => {
    const inputBrandNameHatText = event.target.value;
    setNameBrandNameHat(inputBrandNameHatText);
    setIsInputBrandNameHatValid(!!inputBrandNameHatText);
  };
  const addItemBrandNameHat = (e) => {
    e.preventDefault();
    if (isInputBrandNameHatValid) {
      setItemsBrandNameHat([
        ...itemsBrandNameHat,
        nameBrandNameHat || `New item ${indexBrandNameHat++}`,
      ]);
      setNameBrandWatch("");
      setIsInputBrandNameValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputBrandNameHatRef.current?.focus();
      }, 0);
    }
  };
  ////////////////////
  //--------------------Material Hat-------------------
  const [isInputMaterialHatValid, setIsInputMaterialHatValid] = useState(false);
  const onNameChangeMaterialHat = (event) => {
    const inputMaterialHatText = event.target.value;
    setNameMaterialHat(inputMaterialHatText);
    setIsInputMaterialHatValid(!!inputMaterialHatText);
  };
  const addItemMaterialHat = (e) => {
    e.preventDefault();
    if (isInputMaterialHatValid) {
      setItemsMaterialHat([
        ...itemsMaterialHat,
        nameMaterialHat || `New item ${indexMaterialHat++}`,
      ]);
      setNameMaterialHat("");
      setIsInputMaterialHatValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputMaterialHatRef.current?.focus();
      }, 0);
    }
  };
  ///////////////////////
  //Type Hat
  const [isInputTypeHatValid, setIsInputTypeHatValid] = useState(false);
  const onNameChangeTypeHat = (event) => {
    const inputTypeHatText = event.target.value;
    setNameTypeHat(inputTypeHatText);
    setIsInputTypeHatValid(!!inputTypeHatText);
  };
  const addItemTypeHat = (e) => {
    e.preventDefault();
    if (isInputTypeHatValid) {
      setItemsTypeHat([
        ...itemsTypeHat,
        nameTypeHat || `New item ${indexTypeHat++}`,
      ]);
      setNameTypeHat("");
      setIsInputTypeHatValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputTypeHatRef.current?.focus();
      }, 0);
    }
  };
  /////////////////
  // Origin Hat
  const [isInputOriginHatValid, setIsInputOriginHatValid] = useState(false);
  const onNameChangeOriginHat = (event) => {
    const inputOriginHatText = event.target.value;
    setNameOriginHat(inputOriginHatText);
    setIsInputOriginHatValid(!!inputOriginHatText);
  };
  const addItemOriginHat = (e) => {
    e.preventDefault();
    if (isInputOriginHatValid) {
      setItemsOriginHat([
        ...itemsOriginHat,
        nameOriginHat || `New item ${indexOriginHat++}`,
      ]);
      setNameOriginHat("");
      setIsInputOriginHatValid(false); // Đặt lại trạng thái khi thêm xong
      setTimeout(() => {
        inputOriginHatRef.current?.focus();
      }, 0);
    }
  };

  //  Thêm giá cho ngày thuê sản phẩm
  const [additionalFields, setAdditionalFields] = useState([]);

  const addField = () => {
    setAdditionalFields([...additionalFields, {}]);
  };

  const removeField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };
  // ====================================================================
  const [additionalDetailFields, setAdditionalDetailFields] = useState([]);

  const addDetailField = () => {
    setAdditionalDetailFields([...additionalDetailFields, {}]);
  };

  const removeDetailField = (index) => {
    const updatedFields = [...additionalDetailFields];
    updatedFields.splice(index, 1);
    setAdditionalDetailFields(updatedFields);
  };
  // ===================================================
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const handleToggleAdditionalDetails = (visible) => {
    setShowAdditionalDetails(visible);
    // if (!visible) {
    //   form.resetFields(["detailName", "value"]);
    // }
  };
  // ===================================================
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            Button: {
              colorPrimary: "rgb(32, 30, 42)",
              colorPrimaryHover: "orange",
              colorPrimaryActive: "orange",
            },
            Input: {
              activeBorderColor: "rgb(32, 30, 42)",
              hoverBorderColor: "rgb(32, 30, 42)",
            },
            Select: {
              colorPrimaryHover: "rgb(32, 30, 42)",
              colorPrimary: "rgb(32, 30, 42)",
              controlItemBgActive: "rgb(32, 30, 42)",
              optionSelectedColor: "orange",
            },
            Slider: {
              colorPrimary: "rgb(32, 30, 42)",
              handleActiveColor: "rgb(32, 30, 42)",
              handleColor: "rgb(32, 30, 42)",
              trackHoverBg: "rgb(32, 30, 42)",
              trackBg: "rgb(32, 30, 42)",
            },
          },
        }}
      >
        <Form form={form} onFinish={onFinish} style={{ position: "relative" }}>
          <div className="basic-information--step1">
            <div className="section-title">Thông tin sản phẩm</div>
            <div className="name">
              <span>Tên sản phẩm:</span>
              <Form.Item
                name={"productName"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input placeholder="Nhập tên sản phẩm..." />
              </Form.Item>
            </div>
            <div className="category">
              <span>Phân loại sản phẩm:</span>
              <Space wrap>
                <Select
                  defaultValue="Chọn loại sản phẩm"
                  style={{
                    width: 150,
                  }}
                  onChange={selectChangeCategory}
                  options={
                    categorys &&
                    categorys.map((category) => ({
                      value: category.categoryID,
                      label:
                        categoryTranslations[category.categoryName] ||
                        category.categoryName,
                    }))
                  }
                />
              </Space>
            </div>
            <div className="description">
              <span>Mô tả sản phẩm:</span>
              <Form.Item
                name={"description"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <TextArea rows={4} placeholder="Nhập mô tả sản phẩm..." />
              </Form.Item>
            </div>
            <div className="rules">
              <span>Quy định sản phẩm:</span>
              <Form.Item
                name={"rules"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <TextArea rows={4} placeholder="Nhập quy định sản phẩm..." />
              </Form.Item>
            </div>
            <div className="product__code">
              <span>Số seri sản phẩm:</span>
              <Form.Item
                name={"serialCode"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input
                  style={{ width: "30%" }}
                  placeholder="Nhập số seri sản phẩm..."
                />
              </Form.Item>
            </div>
            <Form.Item name={"productCondition"} style={{ marginLeft: "16px" }}>
              <p style={{ fontWeight: "bold" }}>Tình trạng sản phẩm:</p>
              <Slider
                style={{
                  width: "30%",
                  track: { background: "rgb(32, 30, 42)" },
                }}
                value={sliderValue} // Sử dụng giá trị sliderValue
                onChange={handleSliderChange}
              />
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {sliderValue}%
              </span>
            </Form.Item>
            <Form.Item name={"productReceiptUrl"}>
              <div className="receipt">
                <span>Hoá đơn sản phẩm:</span>
                <Upload
                  maxCount={1}
                  onChange={handleFileChangeReceipt}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </div>
            </Form.Item>
            <div className="image">
              <span>Hình ảnh sản phẩm:</span>
              <Form.Item name={"productAvt"}>
                <Upload
                  maxCount={9}
                  onChange={handleFileChange}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                  multiple={true}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  <span
                    style={{
                      marginLeft: "20px",
                      fontStyle: "italic",
                      fontWeight: "normal",
                      color: "grey",
                    }}
                  >
                    • Tối đa 9 ảnh
                  </span>
                </Upload>
              </Form.Item>

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>

          {category === 1 && (
            <div className="basic-information--watch">
              <div className="section-title">Thông tin chi tiết</div>
              <div className="container-watch">
                <div className="field__watch--1">
                  <span className="text">Thương hiệu:</span>
                  <Form.Item
                    name={"brandNameWatch"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameRef}
                              value={nameBrandWatch}
                              onChange={onNameChangeBrandWatch}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameWatch}
                              disabled={!isInputBrandNameValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameWatch.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Mặt đồng hồ:</span>
                  <Form.Item
                    name={"clockFaceWatch"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputClockFaceRef}
                              value={nameClockFaceWatch}
                              onChange={onNameChangeClockFaceWatch}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemClockFaceWatch}
                              disabled={!isInputClockFaceValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsClockFaceWatch.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__watch--2">
                  <span className="text">Chất liệu dây đeo:</span>
                  <Form.Item
                    name={"strapMaterialWatch"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputStrapMaterialRef}
                              value={nameStrapMaterial}
                              onChange={onNameChangeStrapMaterial}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemStrapMaterial}
                              disabled={!isInputStrapMaterialValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsStrapMaterial.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Xuất xứ:</span>
                  <Form.Item
                    name={"originWatch"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOriginRef}
                              value={nameOrigin}
                              onChange={onNameChangeOrigin}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOrigin}
                              disabled={!isInputOriginValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOrigin.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* ====================================================== */}
              <span className="text">Thêm chi tiết mới: </span>
              <button
                onClick={() =>
                  handleToggleAdditionalDetails(!showAdditionalDetails)
                }
              >
                {showAdditionalDetails
                  ? "Ẩn chi tiết mới"
                  : "Hiển thị chi tiết mới"}
              </button>
              {showAdditionalDetails && (
                <div className="detail-field">
                  <div style={{ display: "flex" }}>
                    <Form.Item
                      label="Tên chi tiết"
                      name="detailName"
                      style={{ width: "250px" }}
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                      ]}
                    >
                      <Input style={{ width: "162px" }} />
                    </Form.Item>

                    <Form.Item
                      label="Giá trị"
                      name="value"
                      style={{ width: "250px", marginLeft: "8px" }}
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                      ]}
                    >
                      <Input style={{ width: "162px" }} />
                    </Form.Item>
                  </div>
                  {additionalDetailFields.map((field, index) => (
                    <div key={index} className="additional-detail-field">
                      <Space style={{ display: "flex" }}>
                        <Form.Item
                          label={`Tên chi tiết`}
                          style={{ width: "250px" }}
                          name={`detailName${index + 2}`}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          label={`Giá trị `}
                          style={{ width: "250px" }}
                          name={`value${index + 2}`}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </Space>
                    </div>
                  ))}
                  <div style={{ display: "flex", marginLeft: "150px" }}>
                    <Button
                      type="dashed"
                      onClick={addDetailField}
                      style={{
                        width: "195px",
                        marginRight: "10px",
                        transition: "background 0.3s",
                      }}
                      className="custom-button"
                    >
                      <PlusCircleOutlined />
                    </Button>
                    {additionalFields.length > 0 && (
                      <Button
                        type="dashed"
                        onClick={() =>
                          removeDetailField(additionalFields.length - 1)
                        }
                        style={{
                          width: "50px",
                        }}
                        className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                      >
                        <DeleteOutlined />
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {/* ====================================================== */}
            </div>
          )}

          {category === 4 && (
            <div className="basic-information--bag">
              <div className="section-title">Thông tin chi tiết</div>
              <div className="container-bag">
                <div className="field__bag--1">
                  <span className="text">Thương hiệu:</span>
                  <Form.Item
                    name={"brandNameBag"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameBagRef}
                              value={nameBrandNameBag}
                              onChange={onNameChangeBrandNameBag}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameBag}
                              disabled={!isInputBrandNameBagValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameBag.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Kết cấu da:</span>
                  <Form.Item
                    name={"skinTexture"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputSkinTextureRef}
                              value={nameSkinTexture}
                              onChange={onNameChangeSkinTexture}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemSkinTexture}
                              disabled={!isInputSkinTextureValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsSkinTexture.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__bag--2">
                  <span className="text">Loại da:</span>
                  <Form.Item
                    name={"typeSkinBag"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputTypeSkinBagRef}
                              value={nameTypeSkinBag}
                              onChange={onNameChangeTypeSkinBag}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemTypeSkinBag}
                              disabled={!isInputTypeSkinBagValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsTypeSkinBag.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Xuất xứ:</span>
                  <Form.Item
                    name={"originBag"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOriginBagRef}
                              value={nameOriginBag}
                              onChange={onNameChangeOriginBag}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOriginBag}
                              disabled={!isInputOriginBagValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOriginBag.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__bag--3">
                  <p className="text">Thêm chi tiết mới: </p>
                  <Button
                    onClick={() =>
                      handleToggleAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails
                      ? "Ẩn chi tiết mới"
                      : "Hiển thị chi tiết mới"}
                  </Button>
                  {showAdditionalDetails && (
                    <div className="detail-field">
                      <div style={{ display: "flex" }}>
                        <Form.Item
                          name="detailName"
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Tên chi tiết</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          name="value"
                          style={{ width: "250px", marginLeft: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Giá trị</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </div>
                      {additionalDetailFields.map((field, index) => (
                        <div key={index} className="additional-detail-field">
                          <Space style={{ display: "flex" }}>
                            <Form.Item
                              style={{ width: "250px" }}
                              name={`detailName${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Tên chi tiết</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>

                            <Form.Item
                              style={{ width: "250px" }}
                              name={`value${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Giá trị</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>
                          </Space>
                        </div>
                      ))}
                      <div style={{ display: "flex", marginLeft: "150px" }}>
                        <Button
                          type="dashed"
                          onClick={addDetailField}
                          style={{
                            width: "195px",
                            marginRight: "10px",
                            transition: "background 0.3s",
                          }}
                          className="custom-button"
                        >
                          <PlusCircleOutlined />
                        </Button>
                        {additionalFields.length > 0 && (
                          <Button
                            type="dashed"
                            onClick={() =>
                              removeDetailField(additionalFields.length - 1)
                            }
                            style={{
                              width: "50px",
                            }}
                            className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {category === 5 && (
            <div className="basic-information--glasses">
              <div className="section-title">Thông tin chi tiết</div>
              <div className="container-glass">
                <div className="field__glass--1">
                  <span className="text">Thương hiệu:</span>
                  <Form.Item
                    name={"brandNameGlasses"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameGlassesRef}
                              value={nameBrandNameGlasses}
                              onChange={onNameChangeBrandNameGlasses}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameGlasses}
                              disabled={!isInputBrandNameGlassesValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameGlasses.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Loại lens:</span>
                  <Form.Item
                    name={"typeLensGlasses"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputTypeLensGlassesRef}
                              value={nameTypeLensGlasses}
                              onChange={onNameChangeTypeLensGlasses}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemTypeLensGlasses}
                              disabled={!isInputTypeLensGlassesValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsTypeLensGlasses.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>

                <div className="field__glass--2">
                  <span className="text">Hình dạng khung kính:</span>
                  <Form.Item
                    name={"glassShape"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputGlassShapeRef}
                              value={nameGlassShape}
                              onChange={onNameChangeGlassShape}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemGlassShape}
                              disabled={!isInputGlassShapeValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsGlassShape.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Chất liệu khung kính:</span>
                  <Form.Item
                    name={"glassMaterial"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputGlassMaterialRef}
                              value={nameGlassMaterial}
                              onChange={onNameChangeGlassMaterial}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemGlassMaterial}
                              disabled={!isInputGlassMaterialValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsGlassMaterial.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__glass--3">
                  <p className="text">Thêm chi tiết mới: </p>
                  <Button
                    onClick={() =>
                      handleToggleAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails
                      ? "Ẩn chi tiết mới"
                      : "Hiển thị chi tiết mới"}
                  </Button>
                  {showAdditionalDetails && (
                    <div className="detail-field">
                      <div style={{ display: "flex" }}>
                        <Form.Item
                          name="detailName"
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Tên chi tiết</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          name="value"
                          style={{ width: "250px", marginLeft: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Giá trị</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </div>
                      {additionalDetailFields.map((field, index) => (
                        <div key={index} className="additional-detail-field">
                          <Space style={{ display: "flex" }}>
                            <Form.Item
                              style={{ width: "250px" }}
                              name={`detailName${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Tên chi tiết</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>

                            <Form.Item
                              style={{ width: "250px" }}
                              name={`value${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Giá trị</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>
                          </Space>
                        </div>
                      ))}
                      <div style={{ display: "flex", marginLeft: "150px" }}>
                        <Button
                          type="dashed"
                          onClick={addDetailField}
                          style={{
                            width: "195px",
                            marginRight: "10px",
                            transition: "background 0.3s",
                          }}
                          className="custom-button"
                        >
                          <PlusCircleOutlined />
                        </Button>
                        {additionalFields.length > 0 && (
                          <Button
                            type="dashed"
                            onClick={() =>
                              removeDetailField(additionalFields.length - 1)
                            }
                            style={{
                              width: "50px",
                            }}
                            className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {category === 3 && (
            <div className="basic-information--earring">
              <div className="section-title">Thông tin chi tiết</div>

              <div className="container-erring">
                <div className="field__earring--1">
                  <Form.Item
                    name={"brandNameJewelry"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <p className="text">Thương hiệu</p>
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameEarringsRef}
                              value={nameBrandNameEarrings}
                              onChange={onNameChangeBrandNameEarrings}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameEarrings}
                              disabled={!isInputBrandNameEarringsValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameEarrings.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    name={"typeJewelrys"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <p className="text">Kiểu trang sức:</p>
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputEarringsTypeRef}
                              value={nameEarringsType}
                              onChange={onNameChangeEarringsType}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemEarringsType}
                              disabled={!isInputEarringsTypeValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsEarringsType.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__earring--2">
                  <Form.Item
                    name={"occasion"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <p className="text">Dịp:</p>
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOccasionRef}
                              value={nameOccasion}
                              onChange={onNameChangeOccasion}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOccasion}
                              disabled={!isInputOccasionValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOccasion.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    name={"originJewelry"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <p className="text">Xuất xứ:</p>
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOriginEarringRef}
                              value={nameOriginEarring}
                              onChange={onNameChangeOriginEarring}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOriginEarring}
                              disabled={!setIsInputOriginEarringValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOriginEarring.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__earring--3">
                  <p className="text">Thêm chi tiết mới: </p>
                  <Button
                    onClick={() =>
                      handleToggleAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails
                      ? "Ẩn chi tiết mới"
                      : "Hiển thị chi tiết mới"}
                  </Button>
                  {showAdditionalDetails && (
                    <div className="detail-field">
                      <div style={{ display: "flex" }}>
                        <Form.Item
                          name="detailName"
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Tên chi tiết</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          name="value"
                          style={{ width: "250px", marginLeft: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Giá trị</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </div>
                      {additionalDetailFields.map((field, index) => (
                        <div key={index} className="additional-detail-field">
                          <Space style={{ display: "flex" }}>
                            <Form.Item
                              style={{ width: "250px" }}
                              name={`detailName${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Tên chi tiết</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>

                            <Form.Item
                              style={{ width: "250px" }}
                              name={`value${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Giá trị</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>
                          </Space>
                        </div>
                      ))}
                      <div style={{ display: "flex", marginLeft: "150px" }}>
                        <Button
                          type="dashed"
                          onClick={addDetailField}
                          style={{
                            width: "195px",
                            marginRight: "10px",
                            transition: "background 0.3s",
                          }}
                          className="custom-button"
                        >
                          <PlusCircleOutlined />
                        </Button>
                        {additionalFields.length > 0 && (
                          <Button
                            type="dashed"
                            onClick={() =>
                              removeDetailField(additionalFields.length - 1)
                            }
                            style={{
                              width: "50px",
                            }}
                            className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ====================================================== */}

              {/* ====================================================== */}
            </div>
          )}

          {category === 6 && (
            <div className="basic-information--shoe">
              <div className="section-title">Thông tin chi tiết</div>
              <div className="container-shoe">
                <div className="field__shoe--1">
                  <span className="text">Thương hiệu:</span>
                  <Form.Item
                    name={"brandNameShoe"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameShoeRef}
                              value={nameBrandNameShoe}
                              onChange={onNameChangeBrandNameShoe}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameShoe}
                              disabled={!isInputBrandNameShoeValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameShoe.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Loại da:</span>
                  <Form.Item
                    name={"typeSkinShoe"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputTypeSkinShoeRef}
                              value={nameTypeSkinShoe}
                              onChange={onNameChangeTypeSkinShoe}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemTypeSkinShoe}
                              disabled={!isInputTypeSkinShoeValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsTypeSkinShoe.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__shoe--2">
                  <span className="text">Da ngoài:</span>
                  <Form.Item
                    name={"outsideSkin"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOutsideSkinRef}
                              value={nameOutsideSkin}
                              onChange={onNameChangOutsideSkin}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOutsideSkin}
                              disabled={!isInputOutsideSkinValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOutsideSkin.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Xuất xứ:</span>
                  <Form.Item
                    name={"originShoe"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOriginShoeRef}
                              value={nameOriginShoe}
                              onChange={onNameChangeOriginShoe}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOriginShoe}
                              disabled={!setIsInputOriginShoeValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOriginShoe.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__shoe--3">
                  <p className="text">Thêm chi tiết mới: </p>
                  <Button
                    onClick={() =>
                      handleToggleAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails
                      ? "Ẩn chi tiết mới"
                      : "Hiển thị chi tiết mới"}
                  </Button>
                  {showAdditionalDetails && (
                    <div className="detail-field">
                      <div style={{ display: "flex" }}>
                        <Form.Item
                          name="detailName"
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Tên chi tiết</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          name="value"
                          style={{ width: "250px", marginLeft: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Giá trị</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </div>
                      {additionalDetailFields.map((field, index) => (
                        <div key={index} className="additional-detail-field">
                          <Space style={{ display: "flex" }}>
                            <Form.Item
                              style={{ width: "250px" }}
                              name={`detailName${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Tên chi tiết</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>

                            <Form.Item
                              style={{ width: "250px" }}
                              name={`value${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Giá trị</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>
                          </Space>
                        </div>
                      ))}
                      <div style={{ display: "flex", marginLeft: "150px" }}>
                        <Button
                          type="dashed"
                          onClick={addDetailField}
                          style={{
                            width: "195px",
                            marginRight: "10px",
                            transition: "background 0.3s",
                          }}
                          className="custom-button"
                        >
                          <PlusCircleOutlined />
                        </Button>
                        {additionalFields.length > 0 && (
                          <Button
                            type="dashed"
                            onClick={() =>
                              removeDetailField(additionalFields.length - 1)
                            }
                            style={{
                              width: "50px",
                            }}
                            className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ====================================================== */}
            </div>
          )}

          {category === 2 && (
            <div className="basic-information--hat">
              <div className="section-title">Thông tin chi tiết</div>
              <div className="container-hat">
                <div className="field__hat--1">
                  <span className="text">Thương hiệu:</span>
                  <Form.Item
                    name={"brandNameHat"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputBrandNameHatRef}
                              value={nameBrandNameHat}
                              onChange={onNameChangeBrandNameHat}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemBrandNameHat}
                              disabled={!isInputBrandNameHatValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsBrandNameHat.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Chất liệu:</span>
                  <Form.Item
                    name={"materialHat"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputMaterialHatRef}
                              value={nameMaterialHat}
                              onChange={onNameChangeMaterialHat}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemMaterialHat}
                              disabled={!isInputMaterialHatValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsMaterialHat.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__hat--2">
                  <span className="text">Kiểu nón:</span>
                  <Form.Item
                    name={"typeHat"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputTypeHatRef}
                              value={nameTypeHat}
                              onChange={onNameChangeTypeHat}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemTypeHat}
                              disabled={!isInputTypeHatValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsTypeHat.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>

                  <span className="text">Xuất xứ:</span>
                  <Form.Item
                    name={"originHat"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 300,
                      }}
                      placeholder="Vui lòng chọn"
                      showSearch // Bật tính năng tìm kiếm
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <Input
                              placeholder="Thêm thuộc tính mới"
                              ref={inputOriginHatRef}
                              value={nameOriginHat}
                              onChange={onNameChangeOriginHat}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              style={{
                                backgroundColor: "rgb(32, 30, 42)",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={addItemOriginHat}
                              disabled={!isInputOriginHatValid}
                            >
                              Thêm
                            </Button>
                          </Space>
                        </>
                      )}
                      options={itemsOriginHat.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="field__hat--3">
                  <p className="text">Thêm chi tiết mới: </p>
                  <Button
                    onClick={() =>
                      handleToggleAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails
                      ? "Ẩn chi tiết mới"
                      : "Hiển thị chi tiết mới"}
                  </Button>
                  {showAdditionalDetails && (
                    <div className="detail-field">
                      <div style={{ display: "flex" }}>
                        <Form.Item
                          name="detailName"
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Tên chi tiết</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>

                        <Form.Item
                          name="value"
                          style={{ width: "250px", marginLeft: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                          ]}
                        >
                          <p className="text">Giá trị</p>
                          <Input style={{ width: "162px" }} />
                        </Form.Item>
                      </div>
                      {additionalDetailFields.map((field, index) => (
                        <div key={index} className="additional-detail-field">
                          <Space style={{ display: "flex" }}>
                            <Form.Item
                              style={{ width: "250px" }}
                              name={`detailName${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Tên chi tiết</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>

                            <Form.Item
                              style={{ width: "250px" }}
                              name={`value${index + 2}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <p className="text">Giá trị</p>
                              <Input style={{ width: "162px" }} />
                            </Form.Item>
                          </Space>
                        </div>
                      ))}
                      <div style={{ display: "flex", marginLeft: "150px" }}>
                        <Button
                          type="dashed"
                          onClick={addDetailField}
                          style={{
                            width: "195px",
                            marginRight: "10px",
                            transition: "background 0.3s",
                          }}
                          className="custom-button"
                        >
                          <PlusCircleOutlined />
                        </Button>
                        {additionalFields.length > 0 && (
                          <Button
                            type="dashed"
                            onClick={() =>
                              removeDetailField(additionalFields.length - 1)
                            }
                            style={{
                              width: "50px",
                            }}
                            className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showSecondPart && (
            <div className="basic-information--step3">
              <h1 className="section-title">Thông Tin Bán Hàng</h1>
              <div className="rent-sale">
                <span>Cấu hình sản phẩm:</span>

                <Space wrap>
                  <Select
                    defaultValue="Chọn cấu hình sản phẩm"
                    style={{
                      width: 150,
                    }}
                    onChange={selectChange}
                    options={[
                      {
                        value: "SALE",
                        label: "Bán",
                      },
                      {
                        value: "RENT",
                        label: "Cho Thuê",
                      },
                    ]}
                  />
                </Space>
              </div>
              <Form.Item
                name={"price"}
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                  {
                    pattern: /^[0-9]*$/, // Regex chỉ cho phép nhập số
                    message: "Chỉ được nhập số!",
                  },
                ]}
              >
                <div className="price">
                  <span>Giá sản phẩm:</span>
                  <Input
                    type="number"
                    suffix="VND"
                    style={{ width: "11.6%" }}
                  />
                </div>
              </Form.Item>

              {(checkType === "RENT" || checkType === "SALE_RENT") && (
                <div className="rent-price">
                  <div style={{ display: "flex" }}>
                    <Form.Item
                      label="Số ngày "
                      name="mockDay"
                      style={{ width: "250px" }}
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                        {
                          pattern: /^[0-9]*$/, // Regex chỉ cho phép nhập số
                          message: "Chỉ được nhập số!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        suffix="Ngày"
                        style={{ width: "162px" }}
                        defaultValue={"1"}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Giá thuê "
                      name="rentPrice"
                      style={{ width: "250px", marginLeft: "8px" }}
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                        {
                          pattern: /^[0-9]*$/, // Regex chỉ cho phép nhập số
                          message: "Chỉ được nhập số!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        suffix="VND"
                        style={{ width: "162px" }}
                      />
                    </Form.Item>
                  </div>
                  {additionalFields.map((field, index) => (
                    <div key={index} className="additional-field">
                      <Space style={{ display: "flex" }}>
                        <Form.Item
                          label={`Số ngày`}
                          name={`mockDay${index + 2}`}
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                            {
                              pattern: /^[0-9]*$/, // Regex chỉ cho phép nhập số
                              message: "Chỉ được nhập số!",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            style={{ width: "162px" }}
                            suffix="Ngày"
                          />
                        </Form.Item>

                        <Form.Item
                          label={`Giá thuê`}
                          name={`rentPrice${index + 2}`}
                          style={{ width: "250px" }}
                          rules={[
                            {
                              required: true,
                              message: "Không được để trống!",
                            },
                            {
                              pattern: /^[0-9]*$/,
                              message: "Chỉ được nhập số!",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            style={{ width: "162px" }}
                            suffix="VND"
                          />
                        </Form.Item>
                      </Space>
                    </div>
                  ))}
                  <div style={{ display: "flex", marginLeft: "150px" }}>
                    <Button
                      type="dashed"
                      onClick={addField}
                      style={{
                        width: "195px",
                        marginRight: "10px",
                        transition: "background 0.3s",
                      }}
                      className="custom-button"
                    >
                      <PlusCircleOutlined />
                    </Button>
                    {additionalFields.length > 0 && (
                      <Button
                        type="dashed"
                        onClick={() => removeField(additionalFields.length - 1)}
                        style={{
                          width: "50px",
                        }}
                        className="custom-button--delete" // Để tùy chỉnh kiểu hover bằng CSS
                      >
                        <DeleteOutlined />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            style={{
              position: "fixed",
              bottom: 0, // Đặt thẻ div ở dưới cùng của trang
              left: "50%",
              width: "83.8%", // Đặt chiều rộng 100% để nó kéo dài từ cạnh trái đến cạnh phải
              backgroundColor: "white",
              height: "50px",
              zIndex: 999,
              boxShadow:
                " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              transform: "translateX(-50%)",
              marginLeft: "107px",
            }}
          >
            <Form.Item>
              {/* Nội dung của Form.Item */}
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "15%",
                  fontWeight: "bold",
                  position: "fixed",
                  bottom: "45%", // Đặt nút ở dưới cùng của thẻ div
                  left: "50%",
                  transform: "translate(-50%, 50%)", // Đảm bảo nút ở giữa và ở dưới cùng
                  zIndex: 999,
                }}
              >
                Thêm Sản Phẩm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};
export default CreateProduct;
