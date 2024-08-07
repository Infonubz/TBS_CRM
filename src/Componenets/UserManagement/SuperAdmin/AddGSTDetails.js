import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import AddGST from "./AddGST";
import ModalPopup from "../../Common/Modal/Modal";
import { toast } from "react-toastify";
import {
  GetSuperAdminData,
  GetSuperAdminGSTById,
  SubmitGSTData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  gst: Yup.string().required("Please select a Gst"),

  country: Yup.string().required("Status required"),
  state: Yup.string().required("Status required"),
  city: Yup.string().required("Status required"),
  region: Yup.string().required("Status required"),

  address: Yup.string().required("Company Name is required"),
  postal: Yup.string()
    .matches(/^[0-9]+$/, "Postal Code must be a number")
    .min(6, "Postal Code  must be at least 10 digits")
    .max(6, "Postal Code maximum 10 digits only")
    .required("Postal Code is required"),
});
export default function AddGSTDetails({
  setCurrentpage,
  SPA_ID,
  operatorID,
  setOperatorID,
  setmodalIsOpen,
  setGstback,
}) {
  const [modalIsOpen1, setmodalIsOpen1] = useState(false);
  const closeModal = () => {
    setmodalIsOpen1(false);
  };
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    setmodalIsOpen(false);
    // GetSuperAdminData(dispatch);
    setOperatorID(null);
    // console.log("hiihih");
    // try {
    //   const data = await SubmitGSTData(values);
    //   // setmodalIsOpen1(false);
    //   toast.success(data?.message);
    //   // setCurrentpage(4);
    //   // GetOffersData(dispatch);
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error uploading data", error);
    // }
  };
  const [superadmingstdata, setSuperAdminGSTData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminGSTById(
        operatorID,
        setOperatorID,
        setSuperAdminGSTData
      );
      setSuperAdminGSTData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || sessionStorage.getItem("SPA_ID")) {
      console.log("helloteam");
      fetchGetUser();
    }
  }, [
    operatorID,
    setOperatorID,
    setSuperAdminGSTData,
    sessionStorage.getItem("SPA_ID"),
  ]);
  useEffect(() => {
    if (modalIsOpen1 == false) {
      fetchGetUser();
    }
  }, [modalIsOpen1]);
  console.log(modalIsOpen1, "modalIsOpen1modalIsOpen1");
  return (
    <div>
      <div className="border-l-[0.1vw] relative px-[2vw] h-[28vw] ree border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            GST Details
          </label>
          {/* <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A] ">
            Save
          </button> */}
          {/* <div className="w-full"> */}
          <button
            className="text-white float-end flex items-center justify-center bg-[#1F4B7F] w-[7vw] h-[2vw] rounded-[0.5vw]"
            onClick={() => setmodalIsOpen1(true)}
          >
            <span>
              <FaPlus size={"1vw"} color="white" />
            </span>
            <span className="text-[0.8vw] pl-[0.5vw]">Add GSTIN</span>
          </button>
          {/* </div> */}
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              gst: "",
              ctc: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values, "valuessss");
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
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  {/* <div className="grid grid-cols-2 w-full gap-x-[2vw] items-center">
                    <div className="col-span-1">
                      <div>
                        <Field
                          type="radio"
                          name="gst"
                          value="1"
                          className="text-[#1F4B7F] border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]"
                        />
                        <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                          I have GSTIN
                        </label>
                      </div>
                      <div></div>
                      {errors.gender && touched.gst ? (
                        <div>{errors.gst}</div>
                      ) : null}
                    </div>
                    <div className="col-span-1">
                      <Field type="radio" name="gst" value="0" />
                      <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                        I don’t have GSTIN
                      </label>
                      <ErrorMessage
                        name="business"
                        component="gst"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-2">
                      <div>
                        <Field
                          type="radio"
                          name="ctc"
                          value="1"
                          className=" border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]"
                        />
                        <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                          My Aggregate Turnover (PAN India Total Turnover) has
                          Exceeded 20 lakhs
                        </label>
                      </div>
                      <div></div>
                      {errors.gender && touched.ctc ? (
                        <div>{errors.ctc}</div>
                      ) : null}
                    </div>
                  </div> */}
                  {/* <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-2">
                      <Field type="radio" name="ctc" value="0" />
                      <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                        My Aggregate Turnover (PAN India Total Turnover) has not
                        Exceeded 20 lakhs
                      </label>
                      <ErrorMessage
                        name="ctc"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <ErrorMessage
                      name="service"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div> */}

                  <div className="flex flex-col gap-y-[0.5vw]">
                    {/* <div className="w-full">
                      <button
                        className="text-white float-end flex items-center justify-center bg-[#1F4B7F] w-[7vw] h-[2vw] rounded-[0.5vw]"
                        onClick={() => setmodalIsOpen1(true)}
                      >
                        <span>
                          <FaPlus size={"1vw"} color="white" />
                        </span>
                        <span className="text-[0.8vw] pl-[0.5vw]">
                          Add GSTIN
                        </span>
                      </button>
                    </div> */}
                    {superadmingstdata?.state_name ? (
                      <div className="gap-y-[1vw] text-[#1F4B7F] text-[1vw]">
                        <div className="grid grid-cols-2 ">
                          <div className="font-semibold">State:</div>
                          <div>{superadmingstdata.state_name}</div>
                        </div>
                        <div className="grid grid-cols-2 mt-[1vw]">
                          <div className="font-semibold">
                            State Code Number:
                          </div>
                          <div>{superadmingstdata.state_code_number}</div>
                        </div>
                        <div className="grid grid-cols-2 mt-[1vw]">
                          <div className="font-semibold">GSTIN:</div>
                          <div>{superadmingstdata.gstin}</div>
                        </div>
                        <div className="grid grid-cols-2 mt-[1vw]">
                          <div className="font-semibold">Head Office:</div>
                          <div>{superadmingstdata.head_office}</div>
                        </div>
                        <div className="grid grid-cols-2 mt-[1vw]">
                          <div className="font-semibold">Upload Documents:</div>
                          <div>{superadmingstdata.upload_gst}</div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <div className="text-[#1F4B7F]  justify-between w-full text-[0.9vw] flex items-center">
                      <label>State</label>
                      <label>State Code Number</label>
                      <label>GSTIN</label>
                      <label>Head Office</label>
                      <label>Upload Documents</label>
                  
                    </div>

                    <div>
                      <div className="border-b-[#1F4B7F] border-[0.1vw]"></div>
                    </div>
                    <div className="text-[#1F4B7F]  justify-between w-full text-[0.9vw] flex items-center">
                      <label>{superadmingstdata.state_name}</label>
                      <label>{superadmingstdata.state_code_number}</label>
                      <label>{superadmingstdata.gstin}</label>
                      <label>{superadmingstdata.head_office}</label>
                      <label>{superadmingstdata.upload_gst}</label>
                 
                    </div> */}
                  </div>

                  <div className="flex items-center absolute bottom-0 gap-[3vw] justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.8vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => {
                          setCurrentpage(4);
                          setGstback(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[7vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(4)}
                      >
                        {operatorID ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ModalPopup
        show={modalIsOpen1}
        onClose={closeModal}
        // height="40vw"
        width="35vw"
        closeicon={false}
      >
        <AddGST
          //  adminUser={adminUser}
          setmodalIsOpen1={setmodalIsOpen1}
          modalIsOpen1={modalIsOpen1}
        />
      </ModalPopup>
    </div>
  );
}
