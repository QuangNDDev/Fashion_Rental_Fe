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
  Grid,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
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

  const categoryTranslations = {
    Watch: "Đồng Hồ",
    Coat: "Áo Khoác",
    Pant: "Quần",
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
    if (checkCategory === 2) {
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
            rentPrice:rentPrice,
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
    } else if (checkCategory == 4) {
    } else if (checkCategory == 5) {
    } else if (checkCategory == 6) {
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
            rentPrice:rentPrice,
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
    } else if (checkCategory == 7) {
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
            rentPrice:rentPrice,
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
    } else if (checkCategory == 8) {
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
        // const file = event.file;
        // const imageRef = ref(storage, `images/${file.name + v4()}`);
        // const snapshot = await uploadBytes(imageRef, file.originFileObj);
        // const url = await getDownloadURL(snapshot.ref);

        // setUrlImages((prevUrls) => [
        //   ...prevUrls,
        //   { imgUrl: url, fileName: event.file.name },
        // ]);
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
  //  Thêm giá cho ngày thuê sản phẩm
  const [additionalFields, setAdditionalFields] = useState([]);
  const [mockDayValues, setMockDayValues] = useState([]);
  const [rentPriceValues, setRentPriceValues] = useState([]);
  const addField = () => {
    setAdditionalFields([...additionalFields, {}]);
  };

  const removeField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {contextHolder}
      <Form form={form} onFinish={onFinish}>
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
          <Form.Item name={"productCondition"} style={{ marginLeft: "16px" }}>
            <p style={{ fontWeight: "bold" }}>Tình trạng sản phẩm:</p>
            <Slider
              style={{ width: "30%", track: { background: "green" } }}
              value={sliderValue} // Sử dụng giá trị sliderValue
              onChange={handleSliderChange}
            />
            <span style={{ marginLeft: "10px" }}>{sliderValue}%</span>
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

        {category === 2 && (
          <div className="basic-information--watch">
            <div className="section-title">Thông tin Chi Tiết</div>

            <div className="name">
              <span>Thương hiệu:</span>
              <Form.Item
                name={"brandNameWatch"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>
            <div className="name">
              <span>Mặt đồng hồ:</span>
              <Form.Item
                name={"clockFaceWatch"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            <div className="name">
              <span>Chất liệu dây đeo:</span>
              <Form.Item
                name={"strapMaterialWatch"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>
            <div className="name">
              <span>Xuất xứ:</span>
              <Form.Item
                name={"originWatch"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
        )}

        {category === 6 && (
          <div className="basic-information--bag">
            <div className="section-title">Thông tin chi tiết</div>
            <div className="name">
              <span>Thương hiệu:</span>
              <Form.Item
                name={"brandNameBag"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>

            <div className="name">
              <span>Kết cấu da:</span>
              <Form.Item
                name={"skinTexture"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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

            <div className="name">
              <span>Loại da:</span>
              <Form.Item
                name={"typeSkinBag"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>

            <div className="name">
              <span>Xuất xứ:</span>
              <Form.Item
                name={"originBag"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
          </div>
        )}
        {category === 7 && (
          <div className="basic-information--glasses">
            <div className="section-title">Thông tin chi tiết</div>
            <div className="name">
              <span>Thương hiệu:</span>
              <Form.Item
                name={"brandNameGlasses"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>
            <div className="name">
              <span>Loại lens:</span>
              <Form.Item
                name={"typeLensGlasses"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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

            <div className="name">
              <span>Hình dạng khung kính:</span>
              <Form.Item
                name={"glassShape"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
            </div>

            <div className="name">
              <span>Chất liệu khung kính:</span>
              <Form.Item
                name={"glassMaterial"}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            backgroundColor: "green",
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
                    {
                      value: "SALE_RENT",
                      label: "Bán Và Cho Thuê",
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
                <Input suffix="VND" style={{ width: "11.6%" }} />
              </div>
            </Form.Item>

            {(checkType === "RENT" || checkType === "SALE_RENT") && (
              <div className="rent-price">
                <div style={{ display: "flex" }}>
                  <Form.Item
                    label="Số ngày"
                    name="mockDay"
                    style={{ width: "250px", marginRight: "10px" }}
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
                    <Input suffix="Ngày" />
                  </Form.Item>

                  <Form.Item
                    label="Giá thuê"
                    name="rentPrice"
                    style={{ width: "250px", marginRight: "10px" }}
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
                    <Input suffix="VND" />
                  </Form.Item>
                </div>
                {additionalFields.map((field, index) => (
                  <div key={index} className="additional-field">
                    <Space style={{ display: "flex" }}>
                      <Form.Item
                        label={`Số ngày ${index + 2}`}
                        name={`mockDay${index + 2}`}
                      >
                        <Input style={{ width: "172px" }} suffix="Ngày" />
                      </Form.Item>

                      <Form.Item
                        label={`Giá thuê ${index + 2}`}
                        name={`rentPrice${index + 2}`}
                      >
                        <Input style={{ width: "172px" }} suffix="VND" />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <div style={{ display: "flex", marginLeft: "150px" }}>
                  <Button
                    type="dashed"
                    onClick={addField}
                    style={{ width: "195px", marginRight: "10px" }}
                  >
                    <PlusCircleOutlined />
                  </Button>
                  {additionalFields.length > 0 && (
                    <Button
                      type="dashed"
                      onClick={() => removeField(additionalFields.length - 1)}
                    >
                      <DeleteOutlined />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
              backgroundColor: "green",
            }}
          >
            Thêm Sản Phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateProduct;
