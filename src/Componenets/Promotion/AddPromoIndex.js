import React, { useEffect, useState } from "react";
//import { LiaSave } from "react-icons/lia";
import AddPromotion from "./AddPromotion";
import Background_View from "./Background_View";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import {
  GetPromotionById,
  GetPromotionDataByStatus,
  SubmitPromotionData,
} from "../../Api/Promotion/Promotion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  promotion_name: Yup.string()
    .required("Promotion Title is required")
    .min(5, "Min 5 characters only")
    .max(15, "Max 15 characters only"),
  operator_details: Yup.string().required("Operator Detail is required"),
  promo_value: Yup.string()
    .required("Promo Value is required")
    .matches(/^\d+$/, "Promo Value must contain only numbers")
    .test("range-check", function (value) {
      const { value_symbol } = this.parent;
      const numValue = Number(value);

      if (value_symbol === "₹") {
        if (numValue < 1 || numValue > 1000) {
          return this.createError({
            message: "The value must be between 1 and 1000 for ₹.",
          });
        }
      } else if (value_symbol === "%") {
        if (numValue < 1 || numValue > 100) {
          return this.createError({
            message: "The value must be between 1 and 100 for %.",
          });
        }
      }
      return true; // Validation passes
    }),
  value_symbol: Yup.string().required(),
  promotion_description: Yup.string()
    .required("Promotion Description is required")
    .min(20, "Min 20 characters")
    .max(45, "Max 45 characters only"),
  promo_code: Yup.string()
    .required("Enter Promo Code")
    .min(5, "Promo Code must be at least 5 digit")
    .max(100, "Promo code cannot exceed 20")
    .matches(/^[a-zA-Z0-9]+$/, "Only alphabets and numbers are allowed"),
  status: Yup.string().required("This field is required"),
  file: Yup.mixed()
    .test("required", "A file is required", function (value) {
      const { isEdit } = this.options.context;
      if (!isEdit && !value) {
        return false;
      }
      return true;
    })
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  start_date: Yup.date().required("Start Date is required"),
  // .min(new Date(), 'Start Date cannot be in the past'),
  expiry_date: Yup.date()
    .required("Expiry Date is required")
    .min(Yup.ref("start_date"), "Expiry Date must be after Start Date"),
});
export default function AddPromoIndex({
  setModalIsOpen,
  updatedata,
  SetUpdateData,
  setPromoData,
  promodata,
  promotionId,
  setPromotionId,
  CurrentTab,
  ownerName,
  // setPromolist,
  // promolist,
}) {
  // const promo_background = useSelector((state) => state.crm.promo_bg);

  console.log(promodata, "promo_file_check");

  const [CurrentPage, setCurrentPage] = useState(1);
  const [currentPromodata, setCurrentPromodata] = useState("");
  console.log(currentPromodata, "currentPromotion_data");
  const [currentPromo, setCurrentPromo] = useState([]);
  const [bgimage, setBgImage] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [promolist, setPromolist] = useState({
    background_image: "",
    usage: null,
  });
  const [sample, setSample] = useState("");
  const [imageData, setImageData] = useState(null);
  const [draggerImage, setDraggerImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const dispatch = useDispatch();
  const [SaveFun, SetSaveFun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Bg_Promo, setBgPromo] = useState("");
  const [newbg, setNewBg] = useState("");
  const [valuesymbol, setValueSymbol] = useState("₹");
  const [usageError, setUsageError] = useState("");
  // const promoBackgroundRef = useRef(promo_background);
  // const [promolist, setPromolist] = useState({ background_image: "", usage: null });
  const [promo_background, setPromoBackground] = useState("");
  const type_Id = sessionStorage.getItem("type_id");
 // const user_name = sessionStorage.getItem("user_name");
  const [isImageConverted, setIsImageConverted] = useState(false);
  const user = sessionStorage.getItem("user_name");

  const operatorName = type_Id === "OP101" ? user : ownerName;
  // const [loading, setLoading] = useState(false);
  // const handleSubmit = async (values) => {
  //   // const promo_background = useSelector((state) => state.crm.promo_bg);
  //   console.log(newbg, "promo_background987456");

  //   console.log(Bg_Promo, "Bg_Promo initial");

  //   if (CurrentPage === 1) {
  //     console.log(values, "Values on Page 1");
  //     setCurrentPromodata(values);
  //     setBgImage(true);
  //     setCurrentPage(2);
  //   } else {
  //     try {
  //       SetSaveFun(true);
  //       // setLoading(true);
  //       console.log(promo_background, "promo_background on Page 2");

  //       // if (newbg) {
  //         // setLoading(false);

  //         console.log(currentPromodata, "---Promo List Data");
  //         console.log(promolist, "Promo List");
  //         console.log(newbg, "PromotionBackgroundID");

  //         const data = await SubmitPromotionData(
  //           promolist,
  //           currentPromodata,
  //           promotionId,
  //           dispatch,
  //           newbg
  //         );

  //         toast.success(data?.message);

  //         if (data?.message) {
  //           // Clear Bg_Promo only if required
  //           console.log("Clearing Bg_Promo after successful submission.");
  //           // Uncomment the line below only if you want to clear Bg_Promo
  //           // setBgPromo("");
  //         }

  //         GetPromotionData(dispatch);
  //         setBgImage(false);
  //         setModalIsOpen(false);
  //         console.log(
  //           promolist,
  //           currentPromodata,
  //           "---Promo Submission Complete"
  //         );
  //         console.log(data);
  //       // }
  //     } catch (error) {
  //       console.error("Error uploading data", error);
  //     }
  //   }
  // };
  // const handleSubmit = async (values) => {
  //   console.log(promo_background, "promo_background987456"); // Debug log for newbg

  //   if (CurrentPage === 1) {
  //     setCurrentPromodata(values);
  //     setBgImage(true);
  //     setCurrentPage(2);
  //   } else {
  //     try {
  //       SetSaveFun(true);
  //       console.log(promo_background, "newbg before SubmitPromotionData"); // Check state
  //       console.log(Bg_Promo,"Bg_PromoBg_PromoBg_Promo");

  //       if (!promo_background) {
  //         console.log("newbg is undefined or empty.");
  //         return;
  //       }

  //       const data = await SubmitPromotionData(
  //         promolist,
  //         currentPromodata,
  //         promotionId,
  //         dispatch,
  //         promo_background
  //       );

  //       if (data?.message) {
  //         toast.success(data?.message);
  //         GetPromotionData(dispatch);
  //         setModalIsOpen(false);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading data", error);
  //     }
  //   }
  // };

  // console.log(sessionStorage.getItem("promo_bg"),"imageData741852");
  // const bg = sessionStorage.getItem("promo_bg");
  // console.log(bg, "bgbgbgbgbgbg");

  // const final = bg && JSON.parse(bg);

  // Handle form submission
  const handleSubmit = async (values) => {
    if (CurrentPage === 1) {
      setCurrentPromodata(values);
      setCurrentPage(2);
    } else {
      //setLoading(true);
      if (!isImageConverted) {
        toast.warning("Please wait, image is still processing.");
        return;
      }
      try {
        if (promolist.usage) {
          const data = await SubmitPromotionData(
            promolist,
            currentPromodata,
            promotionId,
            promo_background,
            valuesymbol,
            promodata
          );
          if (data?.message) {
            toast.success(data?.message);
            GetPromotionDataByStatus(dispatch, CurrentTab); // Reload promotion data
            setModalIsOpen(false); // Close modal
          }
        } else {
          setUsageError("Usage is required");
        }
      } catch (error) {
        console.error("Error uploading data", error);
      }
      //  finally {
      //   setLoading(false);
      // }
    }
  };

  const fetchGetPromo = async () => {
    try {
      const data = await GetPromotionById(
        promotionId,
        setPromotionId,
        setPromoData,
        setLoading
      );
      console.log(data.promo_name, "datadata");
      setPromoData(data);
      setPromolist({
        ...promolist,
        usage: data.usage,
        background_image: data.background_image,
      });
      setValueSymbol(data?.value_symbol);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (promo_background) {
      setNewBg(promo_background);
    }
  }, [promo_background]);
  // useEffect(() => {
  //   promoBackgroundRef.current = promo_background;
  // }, [promo_background]);

  useEffect(() => {
    if (updatedata) {
      fetchGetPromo();
      setLoading(true)
    }
  }, [promotionId, setPromotionId, setPromoData]);

  return (
    <>
      <Formik
        initialValues={{
          promotion_name: promodata ? promodata.promo_name : "",
          operator_details:
            type_Id === "PRO101" || type_Id === "PROEMP101"
              ? promodata
                ? promodata.operator_details
                : ""
              : operatorName,
          start_date: promodata
            ? dayjs(promodata.start_date).format("YYYY-MM-DD")
            : "",
          expiry_date: promodata
            ? dayjs(promodata.expiry_date).format("YYYY-MM-DD")
            : "",
          usage: promodata ? promodata.usage || promolist.usage : "",
          status: promodata ? promodata.promo_status : "",
          promotion_description: promodata ? promodata.promo_description : "",
          file: promodata ? promodata.promo_image : "",
          value_symbol: promodata ? promodata.value_symbol : valuesymbol,
          // background_image: promodata
          //   ? promodata.background_image
          //   : promolist?.name,
          promo_value: promodata ? promodata.promo_value : "",
          promo_code: promodata ? promodata.promo_code : "",
        }}
        validationSchema={validationSchema}
        context={{ isEdit: true }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        {({
          isSubmitting,
          isValid,
          handleSubmit,
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <Form onSubmit={(values) => handleSubmit(values)}>
              <div className="flex justify-between mr-[3vw]">
                <div className="text-[1.4vw] text-[#1F4B7F] font-semibold">
                  {promotionId ? "UPDATE PROMOTION" : "CREATE NEW PROMOTION"}
                </div>
                <div className="flex gap-x-[1vw]">
                  {/* {promolist?.background_image && ( */}
                  {/* <button
            className="flex bg-[#1F4B7F] px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
            type="submit"
          >
            <span>
              <LiaSave color="white" size={"1.5vw"} />
            </span>
            <span className="text-white text-[1.1vw]">
              {updatedata ? "Update Promo" : "Save Promo"}
            </span>
          </button> */}
                  {/* )} */}
                  {CurrentPage === 2 && (
                    <button
                      type="submit"
                      className="flex text-[#1F4B7F] text-[1vw] border-[0.1vw] border-[#1F4B7F] bg-white px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                      //   onClick={() => setBgImage(true)}
                      onClick={() => setCurrentPage(1)}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex text-white text-[1vw] bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                    //   onClick={() => setBgImage(true)}
                    //   onClick={() => setCurrentPage(2)}
                    // onClick={handleSubmit}
                  >
                    {CurrentPage === 1 ? "Next" : "Save"}
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center  z-10">
                  <Spin size="large" />
                </div>
              ) : CurrentPage === 1 ? (
                <AddPromotion
                  setModalIsOpen={setModalIsOpen}
                  SetUpdateData={SetUpdateData}
                  updatedata={updatedata}
                  promodata={promodata}
                  setPromoData={setPromoData}
                  promotionId={promotionId}
                  setPromotionId={setPromotionId}
                  setCurrentPromodata={setCurrentPromodata}
                  setCurrentPromo={setCurrentPromo}
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  valuesymbol={valuesymbol}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  setValueSymbol={setValueSymbol}
                  setPromolist={setPromolist}
                  promolist={promolist}
                  setDraggerImage={setDraggerImage}
                  draggerImage={draggerImage}
                  CurrentTab={CurrentTab}
                  ownerName={ownerName}
                  operatorName={operatorName}
                />
              ) : (
                <Background_View
                  setCurrentPromo={setCurrentPromo}
                  currentPromo={currentPromo}
                  currentPromodata={currentPromodata}
                  previewUrl={previewUrl}
                  setPromolist={setPromolist}
                  promolist={promolist}
                  setBgImage={setBgImage}
                  setModalIsOpen={setModalIsOpen}
                  updatedata={updatedata}
                  promotionId={promotionId}
                  promodata={promodata}
                  draggerImage={draggerImage}
                  SaveFun={SaveFun}
                  setImageData={setImageData}
                  bgimage={bgimage}
                  setSample={setSample}
                  sample={sample}
                  setBgPromo={setBgPromo}
                  onImageConversionComplete={() => setIsImageConverted(true)} // Notify image conversion completion
                  // setPromolist={setPromolist}
                  setPromoBackground={setPromoBackground}
                  usageError={usageError}
                  setUsageError={setUsageError}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
