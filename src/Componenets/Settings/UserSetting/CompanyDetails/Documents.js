import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { GetOperatorData, SubmitDocumentsData } from '../../../../Api/Settings/SystemSettings/CompanyDetails';
import { toast } from 'react-toastify';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Modal } from "antd";
import { useEffect } from 'react';

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
];

const validationSchema = Yup.object().shape({
    aadhar_front: Yup.mixed()
        .required("Aadhar Front Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    aadhar_back: Yup.mixed()
        .required("Aadhar Back Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    pan_front: Yup.mixed()
        .required("Pan Front Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    pan_back: Yup.mixed()
        .required("Pan Back Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    msme_docs: Yup.mixed()
        .required("MSME Image is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    gst_file: Yup.mixed()
        .required("GST Document is required")
});


const Documents = ({ operatorData }) => {


    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
    const apiurl = process.env.REACT_APP_API_URL;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewOpen(false);

    const [inputPreview, setInputPreview] = useState({
        aadharfront: null,
        aadharback: null,
        panfront: null,
        panback: null,
        msme: null,
        gst: null,
    });
    console.log(inputPreview.gst, 'input_preview')
    useEffect(() => {
        setInputPreview({
            aadharfront: operatorData?.aadar_front_doc,
            aadharback: operatorData?.aadar_back_doc,
            panfront: operatorData?.pancard_front_doc,
            panback: operatorData?.pancard_back_doc,
            msme: operatorData?.msme_docs,
            gst: operatorData?.upload_gst
        })
    }, [operatorData])

    const [isEdit, setIsEdit] = useState(false)

    console.log(previewImage, 'previewimage')

    const handlePreview = (file) => {
        // Ensure the file is a valid Blob/File object
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
                setPreviewTitle(file.name);
            };

            // Check if it's an image file
            if (file.type.startsWith('image')) {
                reader.readAsDataURL(file);  // Show image preview
            } else {
                setPreviewImage(null); // Handle non-image files
                setPreviewTitle(file.name);
            }
        } else {
            console.error("The selected file is not a valid Blob object.");
        }
    };

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

    const dispatch = useDispatch()

    const handleSubmit = async (values,) => {
        try {
            const data = await SubmitDocumentsData(
                values,
                dispatch
            );
            GetOperatorData(dispatch)
            toast.success(data?.message);
            setIsEdit(false)
            console.log('Checking_checking')
        }
        catch (error) {
            console.error("Error uploading data", error);
            toast.error("Failed to submit document. Please try again.");
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
        <>
            <div>
                <Formik
                    initialValues={{
                        aadhar_front: operatorData ? operatorData?.aadar_front_doc : '',
                        aadhar_back: operatorData ? operatorData?.aadar_back_doc : '',
                        pan_front: operatorData ? operatorData?.pancard_front_doc : '',
                        pan_back: operatorData ? operatorData?.pancard_back_doc : '',
                        msme_docs: operatorData ? operatorData?.msme_docs : '',
                        gst_file: operatorData ? operatorData?.upload_gst : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                    enableReinitialize
                >
                    {({ isSubmitting, isValid, setFieldValue, values, handleChange, dirty }) => (


                        < Form >
                            <div className="grid grid-cols-2 gap-[1vw]">
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        Aadhar Card Front Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="aadhar_front"
                                            name="aadhar_front"
                                            type="file"
                                            style={{ display: "none" }}
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                console.log(files, "filesfiles");
                                                setFieldValue(
                                                    "aadhar_front",
                                                    files[0]
                                                );
                                                handleFileChange(event, "aadharfront");
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("aadhar_front").click();
                                            }}
                                        >
                                            {values.aadhar_front ? (
                                                <div
                                                     className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                >
                                                    {values.aadhar_front.name
                                                        ? values.aadhar_front.name
                                                        : values.aadhar_front}
                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Aadhar Back</span>}
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
                                            name="aadhar_front"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        Aadhar Card Back Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="aadhar_back"
                                            name="aadhar_back"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                setFieldValue("aadhar_back", event.currentTarget.files[0]);
                                                // handlePreview(files[0]);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("aadhar_back").click();
                                            }}
                                        >
                                            {values.aadhar_back ? (
                                                <div

                                                     className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                >
                                                    {values.aadhar_back.name
                                                        ? values.aadhar_back.name
                                                        : values.aadhar_back}

                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Aadhar Back</span>}

                                        </button>
                                        {inputPreview?.aadharback?.startsWith("blob") ? (
                                            <img
                                                src={inputPreview.aadharback}
                                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        ) : (
                                            <img
                                                src={`${apiImgUrl}${inputPreview.aadharback}`}
                                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="aadhar_back"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        Pan Card Front Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="pan_front"
                                            name="pan_front"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                console.log(files, "filesfiles");
                                                // setFieldValue("pan_front", files);
                                                setFieldValue(
                                                    "pan_front",
                                                    event.currentTarget.files[0]
                                                );
                                                handlePreview(files[0]);
                                            }}

                                        />
                                        <button
                                            type="button"
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("pan_front").click();
                                            }}
                                        >
                                            {values.pan_front ? (
                                                <div

                                                className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                >
                                                    {values.pan_front.name
                                                        ? values.pan_front.name
                                                        : values.pan_front}

                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Pancard Front</span>}

                                        </button>
                                        {inputPreview?.panfront?.startsWith("blob") ? (
                                            <img
                                                src={inputPreview.panfront}
                                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        ) : (
                                            <img
                                                src={`${apiImgUrl}${inputPreview.panfront}`}
                                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="pan_front"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        Pan Card Back Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="pan_back"
                                            name="pan_back"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                console.log(files, "filesfiles");

                                                setFieldValue(
                                                    "pan_back",
                                                    event.currentTarget.files[0]
                                                );
                                                handlePreview(files[0]);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("pan_back").click();
                                            }}
                                        >
                                            {values.pan_back ?
                                                (
                                                    <div

                                                    className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                    >
                                                        {values.pan_back.name
                                                            ? values.pan_back.name
                                                            : values.pan_back}
                                                        {/* <p>Pan Back</p> */}
                                                    </div>
                                                )
                                                : <span className="opacity-50">Upload Pancard Back</span>}

                                        </button>
                                        {inputPreview?.panback?.startsWith("blob") ? (
                                            <img
                                                src={inputPreview.panback}
                                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        ) : (
                                            <img
                                                src={`${apiImgUrl}${inputPreview.panback}`}
                                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="pan_back"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        MSME Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="msme_docs"
                                            name="msme_docs"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                console.log(files, "filesfiles");

                                                setFieldValue(
                                                    "msme_docs",
                                                    event.currentTarget.files[0]
                                                );
                                                handlePreview(files[0]);
                                            }}

                                        />
                                        <button
                                            type="button"
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("msme_docs").click();
                                            }}
                                        >
                                            {values.msme_docs ? (
                                                <div

                                                className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                >
                                                    {values.msme_docs.name
                                                        ? values.msme_docs.name
                                                        : values.msme_docs}

                                                </div>
                                            )
                                                : <span className="opacity-50">Upload MSME Image</span>}

                                        </button>
                                        {inputPreview?.msme?.startsWith("blob") ? (
                                            <img
                                                src={inputPreview.msme}
                                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        ) : (
                                            <img
                                                src={`${apiImgUrl}${inputPreview.msme}`}
                                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="msme_docs"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1vw]"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        GST Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div className='relative'>
                                        <input
                                            id="gst_file"
                                            name="gst_file"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                const files = Array.from(event.target.files);
                                                console.log(files, "filesfiles");
                                                setFieldValue("gst_file",
                                                    event.currentTarget.files[0]);
                                                //   handlePreview(file); // If you want to preview the selected file
                                                handlePreview(files[0]);
                                            }}
                                        />
                                        <button
                                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                            disabled={isEdit === false}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("gst_file").click();
                                            }}
                                        >
                                            {values.gst_file ? (
                                                <div

                                                    className={`${isEdit === false ? 'cursor-not-allowed' : ''}  underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]`}
                                                >
                                                    {values.gst_file.name
                                                        ? values.gst_file.name
                                                        : values.gst_file}

                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload GST Image</span>
                                            }

                                        </button>
                                        {inputPreview?.gst?.startsWith("blob") ? (
                                            <img
                                                src={inputPreview.gst}
                                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        ) : (
                                            <img
                                                src={`${apiImgUrl}${inputPreview.gst}`}
                                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.8vw]"
                                                alt="Aadhar Front"
                                                onClick={openModal}
                                            />
                                        )}
                                        <ErrorMessage
                                            name="gst_file"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw]"
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
            </div >
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
        </>
    )
}

export default Documents