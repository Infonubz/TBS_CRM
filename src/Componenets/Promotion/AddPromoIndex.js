import React, { useState } from "react";
import { LiaSave } from "react-icons/lia";
import AddPromotion from "./AddPromotion";
import Background_View from "./Background_View";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import {
  GetPromotionData,
  SubmitPromotionData,
} from "../../Api/Promotion/Promotion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

const validationSchema = Yup.object().shape({
  promotion_name: Yup.string()
    .required("Promotion Title is required")
    .max(17, "Max 17 characters only"),
  promotion_description: Yup.string()
    .required("Promotion Description is required")
    .max(43, "Max 57 characters only"),
  // usage: Yup.string()
  //   .required("Enter Usage Value")
  //   .min(1, "usage must be at least 1")
  //   .max(100, "usage cannot exceed 100")
  //   .matches(/^[0-9]+$/, "Only numbers are allowed"),
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
    .test("file_size", "File size is too large", function (value) {
      if (value && value.size > 2000000) {
        // 2MB
        return false;
      }
      return true;
    })
    .test("file_type", "Unsupported File Format", function (value) {
      if (typeof value === "string") {
        // If value is a string (file path), skip file type validation
        return true;
      }
      if (
        value &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ) {
        return true;
      }
      return false;
    }),
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
  // setPromolist,
  // promolist,
}) {
  const promo_background = useSelector((state) => state.crm.promo_bg);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [currentPromodata, setCurrentPromodata] = useState("");
  const [currentPromo, setCurrentPromo] = useState([]);
  const [bgimage, setBgImage] = useState(false);
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

  const handleSubmit = async (values) => {
    console.log(Bg_Promo, "Bg_Promo initial");
  
    if (CurrentPage === 1) {
      console.log(values, "Values on Page 1");
      setCurrentPromodata(values);
      setBgImage(true);
      setCurrentPage(2);
    } else {
      try {
        SetSaveFun(true);
        setLoading(true);
        console.log(promo_background, "promo_background on Page 2");
  
        if (promo_background) {
          setLoading(false);
  
          console.log(currentPromodata, "---Promo List Data");
          console.log(promolist, "Promo List");
          console.log(promo_background, "Promotion Background ID");
  
          const data = await SubmitPromotionData(
            promolist,
            currentPromodata,
            promotionId,
            dispatch,
            promo_background
          );
  
          toast.success(data?.message);
  
          if (data?.message) {
            // Clear Bg_Promo only if required
            console.log("Clearing Bg_Promo after successful submission.");
            // Uncomment the line below only if you want to clear Bg_Promo
            // setBgPromo("");
          }
  
          GetPromotionData(dispatch);
          setBgImage(false);
          setModalIsOpen(false);
          console.log(promolist, currentPromodata, "---Promo Submission Complete");
          console.log(data);
        }
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  
  // console.log(sessionStorage.getItem("promo_bg"),"imageData741852");
  // const bg = sessionStorage.getItem("promo_bg");
  // console.log(bg, "bgbgbgbgbgbg");

  // const final = bg && JSON.parse(bg);
  console.log(sample, "finaldata");
  console.log(promo_background, "promo_backgroundpromo_background");
  console.log(Bg_Promo, "Bg_PromoBg_Promo888");

  return (
    <>
      <Formik
        initialValues={{
          promotion_name: promodata ? promodata.promo_name : "",
          operator_details: promodata ? promodata.operator_details : "",
          start_date: promodata
            ? dayjs(promodata.start_date).format("YYYY-MM-DD")
            : "",
          expiry_date: promodata
            ? dayjs(promodata.expiry_date).format("YYYY-MM-DD")
            : "",
          // usage: promodata ? promodata.usage : "",
          status: promodata ? promodata.promo_status : "",
          promotion_description: promodata ? promodata.promo_description : "",
          file: promodata ? promodata.promo_image : "",
          // background_image: promodata
          //   ? promodata.background_image
          //   : promolist?.name,
          promo_value: promodata ? promodata.promo_value : "",
          promo_code: promodata ? promodata.promo_code : "",
        }}
        // validationSchema={validationSchema}
        context={{ isEdit: true }}
        onSubmit={(values) => handleSubmit(values)}
        //   enableReinitialize
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
                />
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
