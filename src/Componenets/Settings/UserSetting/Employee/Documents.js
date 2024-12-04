import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from "react-icons/fa";
import { GetEmployeeDocumentData, SubmitEmpDocumentsData } from '../../../../Api/Settings/UserSettings/Employee';
import { Modal } from "antd";



const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  aadhar_number: Yup.string().required("Aadhar number is required"),
  pan_number: Yup.string().required("Pan Number is required"),
  aadhar_doc: Yup.mixed()
    .required("Aadhar Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  aadhar_bk_doc: Yup.mixed()
    .required("Aadhar Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_doc: Yup.mixed()
    .required("Pan Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_bk_doc: Yup.mixed()
    .required("Pan Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  qualification: Yup.mixed()
    .required("Qualification is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  offerletter: Yup.mixed()
    .required("Offer Letter Doc is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  // edu_cer_doc: Yup.mixed()
  //   .required("MSME Image is required")
  //   .test("fileSize", "File too large", (value) =>
  //     typeof value === "string" ? true : value && value.size <= FILE_SIZE
  //   )
  //   .test("fileFormat", "Unsupported Format", (value) =>
  //     typeof value === "string"
  //       ? true
  //       : value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
});

const Documents = () => {


  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiurl = process.env.REACT_APP_API_URL;


  const [empDocument, setEmpDocument] = useState()

  console.log(empDocument, 'emp_Document')

  const fetchempDocument = async () => {
    try {
      const data = await GetEmployeeDocumentData();
      setEmpDocument(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    fetchempDocument();
  }, []);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);


  console.log(previewImage, 'previewimage')

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setPreviewTitle(file.name);
    };
    reader?.readAsDataURL(file);
  };


  const handleSubmit = async (values) => {
    try {
      const data = await SubmitEmpDocumentsData(values);
      toast.success(data);
      GetEmployeeDocumentData()
    }
    catch (error) {
      console.error("Error uploading data", error);
      toast.error("Failed to submit document. Please try again.");
    }
  }
  const [inputPreview, setInputPreview] = useState({
    aadharfront: null,
    aadharback: null,
    panfront: null,
    panback: null,
    qualification: null,
    offerletter: null,
  });
  console.log(inputPreview.gst, 'input_preview')
  useEffect(() => {
    setInputPreview({
      aadharfront: empDocument?.aadhar_card_front_doc,
      aadharback: empDocument?.aadhar_card_back_doc,
      panfront: empDocument?.pan_card_front_doc,
      panback: empDocument?.pan_card_back_doc,
      qualification: empDocument?.qualification_doc,
      offerletter: empDocument?.offer_letter_doc
    })
  }, [empDocument])

  const [isEdit, setIsEdit] = useState(false)

  const handleFileChange = (event, key) => {
    const file = event?.currentTarget?.files[0];

    // Check if the file is selected and it's a valid file
    if (file) {
      // Validate if the selected file is an actual file object
      if (file instanceof File) {
        setInputPreview((prevState) => ({
          ...prevState,
          [key]: URL.createObjectURL(file), // Create object URL for valid file
        }));
      } else {
        console.error("Selected item is not a valid file.");
      }
    } else {
      console.error("No file selected.");
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (event) => {
    // Get the image source (src) using `getElementById`
    const imageSrc = event.target.getAttribute('src');

    // Set the modal image source
    setModalImage(imageSrc);

    // Open the modal
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <Formik
        initialValues={{
          aadhar_number: empDocument ? empDocument.aadhar_card_number : "",
          pan_number: empDocument ? empDocument.pan_card_number : "",
          aadhar_doc: empDocument ? empDocument.aadhar_card_front_doc : null,
          aadhar_bk_doc: empDocument ? empDocument.aadhar_card_back_doc : null,
          pan_doc: empDocument ? empDocument.pan_card_front_doc : null,
          pan_bk_doc: empDocument ? empDocument.pan_card_back_doc : null,
          qualification: empDocument ? empDocument.qualification_doc : null,
          offerletter: empDocument ? empDocument.offer_letter_doc : null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => (
          handleSubmit(values)
        )}
        enableReinitialize
      >
        {({ isSubmitting, isValid, setFieldValue, values, handleChange, errors, touched, dirty }) => (
          <Form>

            <div>
              <div className="gap-[1vw] grid grid-cols-2">
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                    Aadhar Card Number
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <Field
                      type="text"
                      name="aadhar_number"
                      placeholder="Enter Aadhar Number"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      value={values.aadhar_number}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    />
                    {/* <MdOutlineModeEditOutline
                      color='#1F487C'
                      className='absolute top-[0.75vw] right-[1vw]'
                      size='1.5vw' /> */}
                    <ErrorMessage
                      name="aadhar_number"
                      component="div"
                      style={{ color: "red" }}
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                    Pan Card Number
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <Field
                      type="text"
                      name="pan_number"
                      placeholder="Enter Pan Number"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      value={values.pan_number}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    />
                    {/* <MdOutlineModeEditOutline
                      color='#1F487C'
                      className='absolute top-[0.75vw] right-[1vw]'
                      size='1.5vw' /> */}
                    <ErrorMessage
                      name="pan_number"
                      component="div"
                      style={{ color: "red" }}
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Aadhar Card Front Doc
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="aadhar_doc"
                      name="aadhar_doc"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        console.log(files, "filesfiles");
                        setFieldValue(
                          "aadhar_doc",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("aadhar_doc").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.aadhar_doc ? (
                        <div
                          // onClick={() => {
                          //   setPreviewImage(empDocument?.aadhar_card_front_doc);
                          //   setPreviewOpen(true);
                          // }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.aadhar_doc.name
                            ? values.aadhar_doc.name
                            : values.aadhar_doc}
                        </div>
                      ) : <span className="opacity-50">
                        Upload Aadhar Front Doc
                      </span>}
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.aadharfront?.startsWith("blob") ? (
                      <img
                        src={inputPreview.aadharfront}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="Aadhar Front"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.aadharfront}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="Aadhar Front"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="aadhar_doc"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Aadhar Card Back Doc
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="aadhar_bk_doc"
                      name="aadhar_bk_doc"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        console.log(files, "filesfiles");
                        setFieldValue(
                          "aadhar_bk_doc",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("aadhar_bk_doc").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.aadhar_bk_doc ? (
                        <div
                          // onClick={() => {
                          //   setPreviewImage(empDocument?.aadhar_card_back_doc);
                          //   setPreviewOpen(true);
                          // }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.aadhar_bk_doc.name
                            ? values.aadhar_bk_doc.name
                            : values.aadhar_bk_doc}
                        </div>
                      ) :
                        <span className="opacity-50">
                          Upload Aadhar Back Doc
                        </span>}
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.aadharback?.startsWith("blob") ? (
                      <img
                        src={inputPreview.aadharback}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="Aadhar back"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.aadharback}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="Aadhar back"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="aadhar_bk_doc"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Pan Front Document
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="pan_doc"
                      name="pan_doc"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        // setFieldValue("aadhar_back", files);
                        setFieldValue(
                          "pan_doc",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("pan_doc").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.pan_doc ? (
                        <div
                          // onClick={() => {
                          //   setPreviewImage(empDocument?.pan_card_front_doc);
                          //   setPreviewOpen(true);
                          // }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.pan_doc.name
                            ? values.pan_doc.name
                            : values.pan_doc}
                        </div>
                      ) : <span className="opacity-50">Upload Pan Front Doc</span>}
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.panfront?.startsWith("blob") ? (
                      <img
                        src={inputPreview.panfront}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="Pan card Front"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.panfront}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="Pan card Front"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="pan_doc"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Pan Back Document
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="pan_bk_doc"
                      name="pan_doc"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        // setFieldValue("aadhar_back", files);
                        setFieldValue(
                          "pan_bk_doc",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("pan_bk_doc").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.pan_bk_doc ? (
                        <div
                          // onClick={() => {
                          //   setPreviewImage(empDocument?.pan_card_back_doc);
                          //   setPreviewOpen(true);
                          // }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.pan_bk_doc.name
                            ? values.pan_bk_doc.name
                            : values.pan_bk_doc}
                        </div>
                      ) : <span className="opacity-50">Upload Pan Back Doc</span>}
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.panback?.startsWith("blob") ? (
                      <img
                        src={inputPreview.panback}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="pancard back"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.panback}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="pancard back"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="pan_bk_doc"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Qualification Doc
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="qualification"
                      name="qualification"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        console.log(files, "filesfiles");
                        // setFieldValue("pan_front", files);
                        setFieldValue(
                          "qualification",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("qualification").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.qualification ? (
                        <div
                          // onClick={() => {
                          //   setPreviewImage(
                          //     empDocument?.qualification_doc
                          //   );
                          //   setPreviewOpen(true);
                          // }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.qualification.name
                            ? values.qualification.name
                            : values.qualification}
                        </div>
                      ) :
                        <span className="opacity-50">
                          Upload Qualification Doc
                        </span>
                      }
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.qualification?.startsWith("blob") ? (
                      <img
                        src={inputPreview.qualification}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="qualification"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.qualification}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="qualification"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="qualification"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1 relative">
                  <label className="text-[#1F4B7F] text-[1vw] font-bold">
                    Offer Letter Doc
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id="offerletter"
                      name="offerletter"
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      style={{ display: "none" }}

                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        console.log(files, "filesfiles");
                        // setFieldValue("pan_back", files);
                        setFieldValue(
                          "offerletter",
                          event.currentTarget.files[0]
                        );
                        // handlePreview(files[0]);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("offerletter").click();
                      }}
                      className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                      disabled={isEdit === false}
                    >
                      {values.offerletter ? (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocument?.offer_letter_doc);
                            setPreviewOpen(true);
                          }}
                            className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                        >
                          {values.offerletter.name
                            ? values.offerletter.name
                            : values.offerletter}
                        </div>
                      ) :
                        <span className="opacity-50">
                          Upload Offer Letter Doc
                        </span>}
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                    </button>
                    {inputPreview?.offerletter?.startsWith("blob") ? (
                      <img
                        src={inputPreview.offerletter}
                        className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                        alt="offerletter"
                        onClick={openModal}
                      />
                    ) : (
                      <img
                        src={`${apiImgUrl}${inputPreview.offerletter}`}
                        className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                        alt="offerletter"
                        onClick={openModal}
                      />
                    )}
                    <ErrorMessage
                      name="offerletter"
                      component="div"
                      style={{ color: "red" }}
                      className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center pt-[2vw] pb-[0.5vw]'>
                {isEdit === false ?
                  <div
                    onClick={() => setIsEdit(true)}
                    className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw] text-center"
                  >
                    Edit
                  </div>
                  :
                  <button
                    type="submit"
                    className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
                  >
                    Submit
                  </button>
                }
              </div>
            </div>
            {console.log(dirty, 'dirty_dirty')}
          </Form>
        )}
      </Formik>

      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        bodyStyle={{ padding: 0 }}
        destroyOnClose={true}
      >
        {modalImage && (
          <img
            src={modalImage}
            alt="Documents Preview"
            style={{ width: "100%" }}
            className=""
          />
        )}
      </Modal>
    </div>
  )
}

export default Documents