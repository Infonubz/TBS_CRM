import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { GetOperatorData, SubmitDocumentsData } from '../../../../Api/Settings/SystemSettings/CompanyDetails';
import { toast } from 'react-toastify';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Modal } from "antd";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
];

const validationSchema = Yup.object().shape({
    aadhar_front: Yup.mixed()
        .required("Aadhaar Front Page is required")
        .test("fileSize", "File too large", (value) =>
            typeof value === "string" ? true : value && value.size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported Format", (value) =>
            typeof value === "string"
                ? true
                : value && SUPPORTED_FORMATS.includes(value.type)
        ),
    aadhar_back: Yup.mixed()
        .required("Aadhaar Back Page is required")
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


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewOpen(false);


    console.log(previewImage, 'previewimage')

    // const handlePreview = (file) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setPreviewImage(reader.result);
    //         setPreviewTitle(file.name);
    //     };
    //     reader?.readAsDataURL(file);
    // };

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

    const dispatch = useDispatch()

    const handleSubmit = async (values,) => {
        try {
            const data = await SubmitDocumentsData(
                values,
                dispatch
            );
            GetOperatorData(dispatch)
            toast.success(data?.message);
            console.log('Checking_checking')
        }
        catch (error) {
            console.error("Error uploading data", error);
            toast.error("Failed to submit document. Please try again.");
        }
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
                                    Aadhaar Card Front Doc
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
                                                handlePreview(files[0]);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("aadhar_front").click();
                                            }}
                                        >
                                            {values.aadhar_front ? (
                                                <div
                                                    // onClick={() => {
                                                    //     setPreviewImage(
                                                    //         operatorData?.aadar_back_doc
                                                    //     );
                                                    //     setPreviewOpen(true);
                                                    // }}
                                                    className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                >
                                                    {values.aadhar_front.name
                                                        ? values.aadhar_front.name
                                                        : values.aadhar_front}
                                                    {/* <p>Aadhar Back</p> */}
                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Aadhar Back</span>}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>
                                        {/* {values.aadhar_front ? (
                                            <div
                                                onClick={() => {
                                                    setPreviewImage(
                                                        operatorData?.aadar_front_doc
                                                    );
                                                    setPreviewOpen(true);
                                                }}
                                                className="cursor-pointer underline-offset-1 text-slate-400 text-[0.9vw] absolute bottom-[-1.4vw] left-[0.5vw]"
                                            >
                                                <p>Preview</p>
                                            </div>
                                        ) :
                                            ''
                                        } */}
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
                                    Aadhaar Card Back Doc
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
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("aadhar_back").click();
                                            }}
                                        >
                                            {values.aadhar_back ? (
                                                <div
                                                    // onClick={() => {
                                                    //     setPreviewImage(
                                                    //         operatorData?.aadar_back_doc
                                                    //     );
                                                    //     setPreviewOpen(true);
                                                    // }}
                                                    className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                >
                                                    {values.aadhar_back.name
                                                        ? values.aadhar_back.name
                                                        : values.aadhar_back}
                                                    {/* <p>Aadhar Back</p> */}
                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Aadhaar Back</span>}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>
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
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("pan_front").click();
                                            }}
                                        >
                                            {values.pan_front ? (
                                                <div
                                                    // onClick={() => {
                                                    //     setPreviewImage(
                                                    //         operatorData?.pancard_front_doc
                                                    //     );
                                                    //     setPreviewOpen(true);
                                                    // }}
                                                    className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                >
                                                    {values.pan_front.name
                                                        ? values.pan_front.name
                                                        : values.pan_front}
                                                    {/* <p>Pan Front</p> */}
                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload Pancard Front</span>}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>

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
                                                // setFieldValue("pan_back", files);
                                                setFieldValue(
                                                    "pan_back",
                                                    event.currentTarget.files[0]
                                                );
                                                handlePreview(files[0]);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("pan_back").click();
                                            }}
                                        >
                                            {values.pan_back ?
                                                (
                                                    <div
                                                        // onClick={() => {
                                                        //     setPreviewImage(
                                                        //         operatorData?.pancard_back_doc
                                                        //     );
                                                        //     setPreviewOpen(true);
                                                        // }}
                                                        className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                    >
                                                        {values.pan_back.name
                                                            ? values.pan_back.name
                                                            : values.pan_back}
                                                        {/* <p>Pan Back</p> */}
                                                    </div>
                                                )
                                                : <span className="opacity-50">Upload Pancard Back</span>}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>
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
                                                // setFieldValue("msme_docs", files);
                                                setFieldValue(
                                                    "msme_docs",
                                                    event.currentTarget.files[0]
                                                );
                                                handlePreview(files[0]);
                                            }}

                                        />
                                        <button
                                            type="button"
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("msme_docs").click();
                                            }}
                                        >
                                            {values.msme_docs ? (
                                                <div
                                                    // onClick={() => {
                                                    //     setPreviewImage(
                                                    //         operatorData?.msme_docs
                                                    //     );
                                                    //     setPreviewOpen(true);
                                                    // }}
                                                    className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                >
                                                    {values.msme_docs.name
                                                        ? values.msme_docs.name
                                                        : values.msme_docs}

                                                </div>
                                            )
                                                : <span className="opacity-50">Upload MSME Image</span>}
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>

                                        <ErrorMessage
                                            name="msme_docs"
                                            component="div"
                                            style={{ color: "red" }}
                                            className="text-[0.8vw] absolute bottom-[-1vw]"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                        GST Doc
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                            *
                                        </span>
                                    </label>
                                    <div>
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
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById("gst_file").click();
                                            }}
                                        >
                                            {values.gst_file ? (
                                                <div
                                                    // onClick={() => {
                                                    //     setPreviewImage(
                                                    //         operatorData?.upload_gst
                                                    //     );
                                                    //     setPreviewOpen(true);
                                                    // }}
                                                    className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.9vw]"
                                                >
                                                    {values.gst_file.name
                                                        ? values.gst_file.name
                                                        : values.gst_file}

                                                </div>
                                            )
                                                :
                                                <span className="opacity-50">Upload GST Image</span>
                                            }
                                            {/* <MdOutlineModeEditOutline
                                                color="#1F487C"
                                                size={"1.5vw"}
                                                className="absolute right-[1vw]"
                                            /> */}
                                        </button>
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
                                <button
                                    type="submit"
                                    className=" text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
                                    disabled={isSubmitting || !dirty || !isValid}
                                    style={{
                                        backgroundColor: isSubmitting || !dirty || !isValid ? '#d3d3d3' : '#1F487C',
                                        color: isSubmitting || !dirty || !isValid ? '#9e9e9e' : '#fff',
                                        cursor: isSubmitting || !dirty || !isValid ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                            {console.log(dirty, 'dirty_dirty')}
                        </Form>
                    )}
            </Formik>
        </div >
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={`http://192.168.90.47:4000${previewImage}`}
                />
            </Modal>
        </>
    )
}

export default Documents