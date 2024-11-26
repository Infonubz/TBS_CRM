import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GetReferEarn, submitReferEarn } from "../../../Api/Settings/Configuration/RefernEarn";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

// const validationSchema = Yup.object().shape({
//     refer_and_earn: Yup.mixed()
//         .required("A file is required")
//         .test("fileType", "Only .txt files are allowed", (value) => {
//             if (value) {
//                 const allowedTypes = ["text/plain"];
//                 return allowedTypes.includes(value.type);
//             }
//             return false;
//         }),
//     refer_and_earn_terms: Yup.mixed()
//         .required("A file is required")
//         .test("fileType", "Only .txt files are allowed", (value) => {
//             if (value) {
//                 const allowedTypes = ["text/plain"];
//                 return allowedTypes.includes(value.type);
//             }
//             return false;
//         }),
//     referal_amount: Yup.string()
//         .required("Enter the Referral  amount"),
// });

const ReferEarn = () => {
    const [buttonHover, setButtonHover] = useState("");
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('')
    const [isReferModalOpen, setIsReferModalOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        GetReferEarn(dispatch)
    }, [dispatch])


    const content_referEarn = useSelector((state) => state?.crm?.refer_earn[0])

    console.log(content_referEarn, 'content_referEarn');


    const openModal = (content, title) => {
        if (content) {
            setModalContent(content);
            setIsModalOpen(true);
            setModalTitle(title)
        }
    };

    const openModalRefer = (content, title) => {
        if (content) {
            setModalContent(content);
            setIsReferModalOpen(true);
            setModalTitle(title)
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
        setIsReferModalOpen(false);
    };


    // ---------------------------------PreviewFunction----------------------------------------------------



    const [fileContents, setFileContents] = useState({
        refer_earn: '',
        refer_earn_terms: ''
    });

    const [referEarn, setReferEarn] = useState()

    const [referEarnTerms, setReferEarnTerms] = useState()

    console.log(referEarn, 'check_file_Name')

    console.log(fileContents, 'file_content')

    const handleFileChange = (event, key) => {

        if (key == 'refer_earn') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFileContents((prevContents) => ({
                        ...prevContents,
                        [key]: e.target.result
                    }));
                };
                reader.readAsText(file);
            }
            console.log(event, 'file_file_fiel')
            setReferEarn(file)
        } else {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFileContents((prevContents) => ({
                        ...prevContents,
                        [key]: e.target.result
                    }));
                };
                reader.readAsText(file);
            }
            console.log(event, 'file_file_fiel')
            setReferEarnTerms(file)
        }
        event.target.value = null

    };

    const renderContent = (content) => {
        return content?.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };


    const getFileName = (key) => {

        switch (key) {
            case 'refer_earn':
                return content_referEarn?.procedure ? 'Refer and Earn-Procedure.txt' : 'Upload File';
            case 'refer_terms_condition':
                return content_referEarn?.['referernt&c'] ? 'Refer & Earn-Terms&Conditions.txt' : 'Upload File';
            default:
                return 'Upload file';
        }
    };


    // ----------------------------------------------------------SaveFunctionality-------------------------------------------

    const re_id = content_referEarn?.id

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const data = await submitReferEarn(values, re_id)
            resetForm();
            GetReferEarn(dispatch)
            setReferEarn(null)
            setReferEarnTerms(null)
            setFileContents({
                refer_earn: '',
                refer_earn_terms: '',
            })
          

        }
        catch (error) {
            console.error("Error uploading data", error)
        }
    }

    // ---------------------------------------------------DownloadContent---------------------------------------------------------
    const procedureString = JSON.stringify(content_referEarn?.procedure);
    console.log(procedureString, 'prcedurestring');

    const procedure_texts = content_referEarn?.procedure
        ? Object.values(content_referEarn.procedure).map(item => item?.text)
        : [];

    const extractText = (texts) => {
        return texts
            .filter(Boolean)
            .join('\n\n');
    };


    const renderedTexts = procedure_texts.map((text, index) => (
        <div key={index}>
            {text?.split(',')?.map((part, i) => (
                <div key={i}>{part?.trim()}</div>
            ))}
        </div>
    ));


    const handleDownload = (key) => {
        let content = '';

        switch (key) {
            case "procedure":

                content = extractText(procedure_texts) || 'No content available.';
                break;
            case "refernt&c":
                const referent = fileContents?.refer_earn_terms ? fileContents?.refer_earn_terms : content_referEarn['referernt&c'];
                console.log(referent, "referandearntermsconditions");
                content = referent || 'No content available.';
                break;
            default:
                console.warn(`No content available for key: ${key}`);
                return;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${key}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    const isDownloadable = fileContents?.refer_earn.trim() !== '' || fileContents?.refer_earn_terms?.trim() !== '';


    const validationSchema = Yup.object().shape({
        refer_and_earn: Yup.mixed()
            .nullable()
            .test("required", "A file is required", function (value) {
                const { path, createError } = this;
                if (value === null && !content_referEarn?.procedure) {
                    return createError({ path, message: "A file is required" });
                }
                return true;
            })
            .test("fileType", "Only .txt files are allowed", (value) => {
                if (value && value.type) {
                    const allowedTypes = ["text/plain"];
                    return allowedTypes.includes(value.type);
                }
                return true; 
            }),
        refer_and_earn_terms: Yup.mixed()
            .nullable() 
            .test("required", "A file is required", function (value) {
                const { path, createError } = this;
                if (value === null && !content_referEarn?.['referernt&c']) {
                    return createError({ path, message: "A file is required" });
                }
                return true; 
            })
            .test("fileType", "Only .txt files are allowed", (value) => {
                if (value && value.type) {
                    const allowedTypes = ["text/plain"];
                    return allowedTypes.includes(value.type);
                }
                return true;
            }),
        referal_amount: Yup.string()
            .required("Enter the Referral amount")
            .nullable(), 
    });

    return (
        <>
            <Formik
                initialValues={{
                    refer_and_earn: content_referEarn?.procedure || "",
                    refer_and_earn_terms: content_referEarn?.['referernt&c'] || "",
                    referal_amount: content_referEarn?.referral_amount || "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
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
                    resetForm
                }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <div className="grid grid-rows-3 gap-[2vw] py-[1vw] pl-[6vw] pr-[6vw]">
                                <div>
                                    <div>
                                        <p className="text-[1.25vw] text-[#1F487C] font-semibold">
                                            Refer and Earn
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-12 gap-[4vw]">
                                        <div className="col-span-7">
                                            <div>
                                                <div className="relative">
                                                    <input
                                                        id="refer_and_earn"
                                                        name="refer_and_earn"
                                                        type="file"
                                                        accept=".txt"
                                                        style={{ display: "none" }}
                                                        // onChange={(event) => handleFileChange(event, 'refer_earn')}
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            if (file) {
                                                                setFieldValue('refer_and_earn', file);
                                                            }
                                                            handleFileChange(event, 'refer_earn')
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            document.getElementById("refer_and_earn").click();
                                                        }}
                                                    >
                                                        <span className="text-[#1f487c]  text-[1vw]">
                                                            {referEarn ? (
                                                                <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">
                                                                    {referEarn?.name}
                                                                </div>
                                                            ) : (
                                                                <p className=" text-[#1F4B7F] text-[1vw]">{getFileName('refer_earn')}</p>
                                                            )}

                                                        </span>
                                                        <FaCloudUploadAlt
                                                            color="#1F487C"
                                                            size={"2vw"}
                                                            className="absolute right-[1vw]"
                                                        />
                                                    </button>

                                                    <ErrorMessage
                                                        name="refer_and_earn"
                                                        component="div"
                                                        style={{ color: "red" }}
                                                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-span-5">
                                            <div className="grid grid-cols-11 gap-[3vw]">
                                                <button
                                                    type="button"
                                                    onClick={() => openModalRefer(fileContents?.refer_earn ? fileContents?.refer_earn : renderedTexts, 'Refer & Earn-Procedure')}
                                                    // onClick={() => handlePreviewClick('refer_earn')}
                                                    onMouseEnter={() => {
                                                        setButtonHover("rfr_rpl");
                                                    }}
                                                    onMouseLeave={() => {
                                                        setButtonHover("");
                                                    }}
                                                    style={{
                                                        transition: "ease-in 0.1s",
                                                    }}
                                                    className={`col-span-4 ${buttonHover === "rfr_rpl"
                                                        ? "bg-[#1F487C] text-white"
                                                        : "bg-white text-[#1F487C]"
                                                        } border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                                >
                                                    Preview
                                                </button>
                                                <button
                                                    type="button"
                                                    onMouseEnter={() => {
                                                        setButtonHover("refr_dwnl");
                                                    }}
                                                    onMouseLeave={() => {
                                                        setButtonHover("");
                                                    }}
                                                    style={{
                                                        transition: "ease-in 0.1s",
                                                    }}
                                                    onClick={() => {
                                                        handleDownload("procedure")
                                                    }}
                                                    className={`col-span-4 ${buttonHover === "refr_dwnl"
                                                        ? "bg-[#1F487C] text-white"
                                                        : "bg-white text-[#1F487C]"
                                                        } border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="text-[1.25vw] text-[#1F487C] font-semibold">
                                            Refer and Earn - T&C
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-12 gap-[4vw]">
                                        <div className="col-span-7">
                                            <div>
                                                <div className="relative">
                                                    <input
                                                        id="refer_and_earn_terms"
                                                        name="refer_and_earn_terms"
                                                        type="file"
                                                        accept=".txt"
                                                        style={{ display: "none" }}
                                                        onChange={(event) => {
                                                            const files = Array.from(event.target.files);
                                                            console.log(files, "filesfiles");
                                                            setFieldValue(
                                                                "refer_and_earn_terms",
                                                                event.currentTarget.files[0]
                                                            );
                                                            handleFileChange(event, 'refer_earn_terms')
                                                        }}
                                                    // onChange={(event) => handleFileChange(event, 'refer_earn_terms')}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            document
                                                                .getElementById("refer_and_earn_terms")
                                                                .click();
                                                        }}
                                                    >
                                                        <span className="text-[#1F487C] text-[1vw]">
                                                            {referEarnTerms ? (
                                                                <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">
                                                                    {referEarnTerms.name}
                                                                </div>
                                                            ) :
                                                                <p className=" text-[#1F4B7F] text-[1vw]">{getFileName('refer_terms_condition')}</p>
                                                            }

                                                        </span>
                                                        <FaCloudUploadAlt
                                                            color="#1F487C"
                                                            size={"2vw"}
                                                            className="absolute right-[1vw]"
                                                        />
                                                    </button>

                                                    <ErrorMessage
                                                        name="refer_and_earn_terms"
                                                        component="div"
                                                        style={{ color: "red" }}
                                                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-5">
                                            <div className="grid grid-cols-11 gap-[3vw]">
                                                <button
                                                    type="button"
                                                    // onClick={() => {
                                                    //     openModal(content_referEarn?.['referernt&c'])
                                                    // }}
                                                    onClick={() => openModal(fileContents?.refer_earn_terms ? fileContents.refer_earn_terms : content_referEarn['referernt&c'], "Refer & Earn Terms and Conditions")}

                                                    onMouseEnter={() => {
                                                        setButtonHover("rtc_rpl");
                                                    }}
                                                    onMouseLeave={() => {
                                                        setButtonHover(1);
                                                    }}
                                                    style={{
                                                        transition: "ease-in 0.1s",
                                                    }}
                                                    className={`col-span-4 ${buttonHover === "rtc_rpl"
                                                        ? "bg-[#1F487C] text-white"
                                                        : "bg-white text-[#1F487C]"
                                                        } border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                                >
                                                    Preview
                                                </button>
                                                <button
                                                    type="button"
                                                    onMouseEnter={() => {
                                                        setButtonHover("rtc_dwnl");
                                                    }}
                                                    onMouseLeave={() => {
                                                        setButtonHover(1);
                                                    }}
                                                    style={{
                                                        transition: "ease-in 0.1s",
                                                    }}
                                                    onClick={() => {
                                                        handleDownload("refernt&c")
                                                    }}
                                                    className={`col-span-4 ${buttonHover === "rtc_dwnl"
                                                        ? "bg-[#1F487C] text-white"
                                                        : "bg-white text-[#1F487C]"
                                                        } border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="text-[1.25vw] text-[#1F487C] font-semibold">
                                            Referral Amount
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-12 gap-[4vw]">
                                        <div className="col-span-7">
                                            <div>
                                                <div className="relative">
                                                    <Field
                                                        type="text"
                                                        name="referal_amount"
                                                        id="referal_amount"
                                                        placeholder="Enter the Amount"
                                                        value={values.referal_amount}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            sessionStorage.setItem(
                                                                "referal_amount",
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                                    />
                                                    <ErrorMessage
                                                        name="referal_amount"
                                                        component="div"
                                                        className="text-[red] text-[0.8vw] absolute bottom-[-1.5vw]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center  py-[2vw]">
                                <button
                                    type="submit"
                                    className="h-[4vw] w-[18vw] text-[2vw] bg-[#1F487C] text-white rounded-lg font-semibold"
                                >
                                    Save
                                </button>
                            </div>

                        </Form>
                    </>
                )}
            </Formik>

            <div className=''>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        onClick={closeModal}
                    >
                        <div
                            className=" bg-white rounded-lg shadow-lg pb-[1vw] px-[0.5vw] border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] w-3/4 min-h-auto max-h-[75vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className=' flex justify-between px-[3vw] pt-[1vw] pb-[0.5vw]'>
                                <p className='order-first  text-[#1F487C] text-[1.54vw] font-bold'>{modalTitle} :</p>
                                <button onClick={closeModal} className="order-last text-gray-500 text-lg float-right hover:bg-blue-100 hover:rounded-lg">
                                    <IoClose size='2vw' color='#1F487C' />
                                </button>
                            </div>

                            <div className=" text-[#1F487C] font-serif  w-full max-h-[65vh] min-h-auto overflow-y-auto text-[1vw]">
                                <div className='px-[3vw] py-[1vw]'>{renderContent(modalContent)}</div>

                            </div>
                        </div>
                    </div>
                )}
                {isReferModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        onClick={closeModal}
                    >
                        <div
                            className=" bg-white rounded-lg shadow-lg pb-[1vw] px-[0.5vw] border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] w-3/4 min-h-auto max-h-[75vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className=' flex justify-between px-[3vw] pt-[1vw] pb-[0.5vw]'>
                                <p className='order-first  text-[#1F487C] text-[1.54vw] font-bold'>{modalTitle} :</p>
                                <button onClick={closeModal} className="order-last text-gray-500 text-lg float-right hover:bg-blue-100 hover:rounded-lg">
                                    <IoClose size='2vw' color='#1F487C' />
                                </button>
                            </div>

                            <div className=" text-[#1F487C] font-serif  w-full max-h-[65vh] min-h-auto overflow-y-auto text-[1vw]">
                                <div className='px-[3vw] py-[1vw]'>{modalContent}</div>

                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default ReferEarn;
