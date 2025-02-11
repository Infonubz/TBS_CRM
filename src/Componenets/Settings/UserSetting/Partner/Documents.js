import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as Yup from "yup";
import dayjs from "dayjs";
import { GetPartnerDocuments, SubmitPartnerDocumentData } from '../../../../Api/Settings/UserSettings/Partner';
import { Modal } from "antd";
import { toast } from 'react-toastify';
import { MdOutlineModeEditOutline } from "react-icons/md";


const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
];

const validationSchema = Yup.object().shape({
    aadhar_number: Yup.string()
        .required("Aadhaar number is required")
        .length(12, "Aadhaar number must be exactly 12 digits")
        .matches(/^\d{12}$/, "Aadhaar must be a valid 12-digit number"),
    pan_number: Yup.string()
        .required("PAN number is required")
        .length(10, "PAN number must be exactly 10 characters")
        .matches(
            /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
            "PAN must be in the format ABCDE1234F"
        ),

    aadhar_fr_doc: Yup.mixed()
        .required("Aadhaar Front Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    aadhar_bk_doc: Yup.mixed()
        .required("Aadhaar Back Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),

    pan_fr_doc: Yup.mixed()
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
});

const Documents = () => {


    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
    const apiurl = process.env.REACT_APP_API_URL;

    const [partnerDocument, setPartnerDocument] = useState()

    console.log(partnerDocument, 'partner_document')

    const fetchPartnerDocument = async () => {
        try {
            const data = await GetPartnerDocuments();
            setPartnerDocument(data);
        } catch (error) {
            console.error("Error fetching additional user data", error);
        }
    };

    useEffect(() => {
        fetchPartnerDocument();
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
        console.log(values, "docvalues");

        try {

            const data = await SubmitPartnerDocumentData(values); // Replace with actual API call function
            toast.success(data)
            setIsEdit(false)
        } catch (error) {
            console.error("Error uploading data", error);
            toast.error("Failed to submit document. Please try again."); // Notify user of error
        }
    };

    const [inputPreview, setInputPreview] = useState({
        aadharfront: null,
        aadharback: null,
        panfront: null,
        panback: null,
    });
    console.log(inputPreview.gst, 'input_preview')
    useEffect(() => {
        setInputPreview({
            aadharfront: partnerDocument?.aadhar_card_front,
            aadharback: partnerDocument?.aadhar_card_back,
            panfront: partnerDocument?.pan_card_front,
            panback: partnerDocument?.pan_card_back,

        })
    }, [partnerDocument])

    const [isEdit, setIsEdit] = useState(false)

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
                    aadhar_number: partnerDocument ? partnerDocument.aadhar_card_number : "",
                    pan_number: partnerDocument ? partnerDocument.pan_card_number : "",
                    aadhar_fr_doc: partnerDocument ? partnerDocument.aadhar_card_front : null,
                    aadhar_bk_doc: partnerDocument ? partnerDocument.aadhar_card_back : null,
                    pan_fr_doc: partnerDocument ? partnerDocument.pan_card_front : null,
                    pan_bk_doc: partnerDocument ? partnerDocument.pan_card_back : null,

                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                enableReinitialize
            >
                {({ isSubmitting, isValid, setFieldValue, values, handleChange, dirty }) => (
                    <Form>
                        <div className="grid grid-cols-2 gap-[1vw]">
                            <div className="col-span-1 relative">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                Aadhaar Card Number
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="aadhar_number"
                                        placeholder="Enter Aadhaar Number"
                                        value={values.aadhar_number}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="aadhar_number"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
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
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="pan_number"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 relative">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                Aadhaar Card Front Doc
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <input
                                        id="aadhar_fr_doc"
                                        name="aadhar_fr_doc"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                        className="border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                        onChange={(event) => {
                                            const files = Array.from(event.target.files);
                                            console.log(files, event, "filesfiles");
                                            setFieldValue(
                                                "aadhar_fr_doc",
                                                event.currentTarget.files[0]
                                            );
                                            // handlePreview(files[0]);
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("aadhar_fr_doc").click();

                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    >
                                        {values.aadhar_fr_doc ? (
                                            <div
                                                className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                            >
                                                {values.aadhar_fr_doc.name
                                                    ? values.aadhar_fr_doc.name
                                                    : values.aadhar_fr_doc}
                                            </div>
                                        ) : <span className="opacity-50 text-[1vw]">
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
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    ) : (
                                        <img
                                            src={`${apiImgUrl}${inputPreview.aadharfront}`}
                                            className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="aadhar_fr_doc"
                                        component="div"
                                        style={{ color: "red" }}
                                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 relative">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                Aadhaar Card Back Doc
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
                                            // setFieldValue("pan_front", files);
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
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    >
                                        {values.aadhar_bk_doc ? (
                                            <div
                                                className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                            >
                                                {values.aadhar_bk_doc.name
                                                    ? values.aadhar_bk_doc.name
                                                    : values.aadhar_bk_doc}
                                            </div>
                                        ) : <span className="opacity-50">
                                            Upload Aadhaar Back Doc
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
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    ) : (
                                        <img
                                            src={`${apiImgUrl}${inputPreview.aadharback}`}
                                            className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="aadhar_bk_doc"
                                        component="div"
                                        style={{ color: "red" }}
                                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 relative">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Pan Card Front Document
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <input
                                        id="pan_fr_doc"
                                        name="pan_fr_doc"
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            const files = Array.from(event.target.files);
                                            // setFieldValue("aadhar_back", files);
                                            setFieldValue(
                                                "pan_fr_doc",
                                                event.currentTarget.files[0]
                                            );
                                            // handlePreview(files[0]);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("pan_fr_doc").click();
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    >
                                        {values.pan_fr_doc ? (
                                            <div
                                                onClick={() => {
                                                    setPreviewOpen(true)
                                                    setPreviewImage(partnerDocument?.pan_card_front)
                                                }}
                                                className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                            >
                                                {values.pan_fr_doc.name
                                                    ? values.pan_fr_doc.name
                                                    : values.pan_fr_doc}
                                            </div>
                                        ) :
                                            <span className="opacity-50">Upload Pan Front Doc</span>}
                                        {/* <MdOutlineModeEditOutline
                                            color='#1F487C'
                                            className='absolute top-[0.75vw] right-[1vw]'
                                            size='1.5vw' /> */}
                                    </button>
                                    {inputPreview?.panfront?.startsWith("blob") ? (
                                        <img
                                            src={inputPreview.panback}
                                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    ) : (
                                        <img
                                            src={`${apiImgUrl}${inputPreview.panfront}`}
                                            className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="pan_fr_doc"
                                        component="div"
                                        style={{ color: "red" }}
                                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 relative">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Pan Card Back Doc
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <input
                                        id="pan_bk_doc"
                                        name="pan_bk_doc"
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            const files = Array.from(event.target.files);
                                            console.log(files, "filesfiles");
                                            // setFieldValue("pan_back", files);
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
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    >
                                        {values.pan_bk_doc ? (
                                            <div
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
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    ) : (
                                        <img
                                            src={`${apiImgUrl}${inputPreview.panback}`}
                                            className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                            alt="offerletter"
                                            onClick={openModal}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="pan_bk_doc"
                                        component="div"
                                        style={{ color: "red" }}
                                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
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
                                    Update
                                </button>
                            }
                        </div>
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