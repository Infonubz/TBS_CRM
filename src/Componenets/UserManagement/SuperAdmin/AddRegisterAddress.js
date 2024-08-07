import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetSuperAdminAddressById,
  SubmitAddressData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Status required"),
  state: Yup.string().required("Status required"),
  city: Yup.string().required("Status required"),
  region: Yup.string().required("Status required"),

  address: Yup.string().required("Company Name is required"),
  postal: Yup.string()
    // .matches(/^[0-9]+$/, "Postal Code must be a number")
    .matches(/^\d{6}$/, "Postal code must be a valid 6-digit code")
    .required("Postal Code is required"),
});
export default function AddRegisterAddress({
  setCurrentpage,
  SPA_ID,
  operatorID,
  superadmindata,
  setOperatorID,
  setbusinessback,
  setBusinessBack,
  businessback,
  setAddressBack,
}) {
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log("hiihih");
    if (operatorID && enable == false) {
      setCurrentpage(3);
    } else {
      try {
        const data = await SubmitAddressData(
          values,
          operatorID,
          enable,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(3);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  const [superadminaddressdata, setSuperAdminAddressData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminAddressById(
        operatorID,
        setOperatorID,
        setSuperAdminAddressData
      );
      setSuperAdminAddressData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || businessback) {
      fetchGetUser();
    }
  }, [
    operatorID,
    setOperatorID,
    setSuperAdminAddressData,
    enable,
    businessback,
  ]);
  console.log(operatorID, "operatorID55555");
  console.log(superadminaddressdata, "superadminaddressdata");
  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Registered Address
          </label>
          {operatorID || businessback ? (
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
              country: superadminaddressdata?.country || "",
              city: superadminaddressdata?.city || "",
              state: superadminaddressdata?.state || "",
              postal: superadminaddressdata?.zip_code || "",
              address: superadminaddressdata?.address || "",
              region: superadminaddressdata?.region || "",
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
                        Address
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        // value={values.firstname}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        State
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="state"
                        id="state"
                        value={values.state}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
                        <option
                          label="Tamilnadu"
                          value="Tamilnadu"
                          className=""
                        />
                        <option
                          label="Karnataka"
                          value="Karnataka"
                          className=""
                        />
                        <option label="Andhra" value="Andhra" className="" />
                        <option label="Kerla" value="Kerla" className="" />
                      </Field>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Region
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="region"
                        id="region"
                        value={values.region}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
                        <option
                          label="Souther Region"
                          value="Souther Region"
                          className=""
                        />
                        <option
                          label="Northern Region"
                          value="Northern Region"
                          className=""
                        />
                        <option
                          label="Western Region"
                          value="Western Region"
                          className=""
                        />
                        <option
                          label="Eastern Region"
                          value="Eastern Region"
                          className=""
                        />
                        <option
                          label="North-Eastern Region"
                          value="North-Eastern Region"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="region"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        City
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="city"
                        id="city"
                        value={values.city}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select City" value="" className="" />
                        <option label="Tirupur" value="Tirupur" className="" />
                        <option
                          label="Coimbatore"
                          value="Coimbatore"
                          className=""
                        />
                        <option label="Chennai" value="Chennai" className="" />
                        <option
                          label="Pondicherry"
                          value="Pondicherry"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Country
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="country"
                        id="country"
                        value={values.country}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Country" value="" className="" />
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
                        name="city"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Postal / Zip Code
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="postal"
                        placeholder="Enter Postal Code"
                        // value={values.firstname}
                        disabled={
                          operatorID || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          operatorID || businessback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="postal"
                        component="div"
                        className="text-red-500 text-[0.7vw]"
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
                          setCurrentpage(1);
                          setAddressBack(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(3)}
                      >
                        {operatorID || businessback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}
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
