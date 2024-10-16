import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as Yup from "yup";
import {
  GetSuperAdminBusinessById,
  SubmitBusinessData,
} from "../../../Api/UserManagement/SuperAdmin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  constitution: Yup.string().required("Constitution required"),
  business: Yup.string().required("Business required"),
  msme: Yup.string().required("MSME required"),
  service: Yup.string().required("Service required"),
  country_code: Yup.string().required("Country Code required"),
  msme_number: Yup.string()
    // .matches(
    //   /^([A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{11})?$/,
    //   "MSME number must be in a valid format (e.g., AA1234ABCDE123)"
    // )
    .matches(
      /^[a-zA-Z0-9]{15}$/,
      "MSME number must be 15 characters long and alphanumeric (e.g., ABC123456789012)"
    )
    .required("MSME Number is required"),
});
export default function AddBusinessDetails({
  setCurrentpage,
  SPA_ID,
  operatorID,
  superadmindata,
  setOperatorID,
  setBusinessBack,
  businessback,
  documentback,
  setDocumentBack,
}) {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    if (operatorID && enable == false) {
      setCurrentpage(4);
    } else {
      try {
        const data = await SubmitBusinessData(
          values,
          operatorID,
          enable,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(4);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  const [superadminbusinessdata, setSuperAdminBusinessData] = useState("");
  const [enable, setEnable] = useState(false);

  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminBusinessById(
        operatorID,
        setOperatorID,
        setSuperAdminBusinessData
      );
      setSuperAdminBusinessData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || documentback) {
      fetchGetUser();
    }
  }, [
    operatorID,
    setOperatorID,
    setSuperAdminBusinessData,
    enable,
    documentback,
  ]);
  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Business Details
          </label>
          {operatorID || documentback ? (
            <button
              className={`${
                enable
                  ? "bg-[#1f4b7f] text-white"
                  : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
              } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => setEnable(!enable)}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              constitution: superadminbusinessdata.type_of_constitution || "",
              business: superadminbusinessdata.business_background || "",
              msme: superadminbusinessdata.msme_type || "",
              msme_number: superadminbusinessdata.msme_number || "",
              service: superadminbusinessdata.type_of_service || "",
              country_code: superadminbusinessdata.currency_code || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              setFieldValue,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type of Constitution
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="constitution"
                        id="constitution"
                        value={values.constitution}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
                        <option
                          label="Proprietorship"
                          value="Proprietorship"
                          className=""
                        />
                        <option
                          label="Partnership"
                          value="Partnership"
                          className=""
                        />
                        <option
                          label="Private Limited"
                          value="Private Limited"
                          className=""
                        />
                        <option
                          label="Public Sector"
                          value="Public Sector"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="constitution"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Business Background
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="business"
                        id="business"
                        value={values.business}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Business" value="" className="" />
                        <option
                          label="Tours & Travels"
                          value="Tours & Travels"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="business"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        MSME Type{" "}
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="msme"
                        id="business"
                        value={values.msme}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select MSME" value="" className="" />
                        <option label="Micro" value="Micro" className="" />
                        <option label="Small" value="Small" className="" />
                        <option label="Medium" value="Medium" className="" />
                        <option
                          label="Enterprises"
                          value="Enterprises"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="msme"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        MSME Number
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="msme_number"
                        placeholder="Enter MSME Number"
                        // value={values.firstname}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="msme_number"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type Of Service
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="service"
                        id="service"
                        value={values.service}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Service" value="" className="" />
                        <option label="Tirupur" value="Tirupur" className="" />
                        <option
                          label="Inter State"
                          value="Inter State"
                          className=""
                        />
                        <option
                          label="Intra State"
                          value="Intra State"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="service"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Country Code
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="country_code"
                        id="country_code"
                        value={values.country_code}
                        disabled={
                          operatorID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option
                          label="Select Country Code"
                          value=""
                          className=""
                        />
                        <option label="India" value="India" className="" />
                        <option label="America" value="America" className="" />
                        <option
                          label="Australia"
                          value="Australia"
                          className=""
                        />
                        <option
                          label="Malasiya"
                          value="Malasiya"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="country_code"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => {
                          setCurrentpage(2);
                          setBusinessBack(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(4)}
                      >
                        {operatorID || documentback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
