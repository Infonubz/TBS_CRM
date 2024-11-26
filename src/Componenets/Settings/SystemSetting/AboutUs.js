import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { GetTbsInfo, SubmitAboutUs, SubmitPrivacyPolicy, SubmitTermsConditions, SubmitUserAgreement } from '../../../Api/Settings/SystemSettings/LegalInformations';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";

const AboutUs = () => {


    const dispatch = useDispatch();

    const legal_info = useSelector((state) => state?.crm?.tbs_info)
    console.log(legal_info?.terms_conditions, 'about_us_info');
    const li_id = legal_info.id
    console.log(li_id, 'legal_info_id')

    useEffect(() => {
        GetTbsInfo(dispatch);
    }, [dispatch]);

    // useEffect(() => {
    //     if (legal_info) {
    //         setAboutUs(legal_info?.about_us || '');
    //         setPrivacyPolicy(legal_info?.privacy_policy || '');
    //         setTermsConditions(legal_info?.terms_conditions || '');
    //         setUserAgreement(legal_info?.user_agreement || '');
    //     }
    // }, [legal_info]);


    const [aboutUs, setAboutUs] = useState('');
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [termsConditions, setTermsConditions] = useState('');
    const [userAgreement, setUserAgreement] = useState('');
    const [errors, setErrors] = useState({});
    const [buttonHover, setButtonHover] = useState("")

    console.log(aboutUs, 'valueofaboutus');
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAboutUsValid, setIsAboutUsValid] = useState(false);

    const [fileContents, setFileContents] = useState({});

    const [uploadStatus, setUploadStatus] = useState({
        about_us: false,
        privacy_policy: false,
        terms_condition: false,
        user_agreement: false,
    });


    console.log(fileContents, 'filecontnetabout_us')

    const openModal = (content, title) => {
        if (content, title) {
            setModalContent(content);
            setIsModalOpen(true);
            setModalTitle(title)
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };


    const validateFile = (file) => {
        if (!file) return 'Please select a file.';
        if (file.size > 5 * 1024 * 1024) return 'File size must be less than 2MB.';
        if (file.type !== 'text/plain') return 'Only .txt files are allowed.';
        return '';
    };

    // --------------------------------------------------Upload & Preview------------------------------------------------------------------------

    const handleFileChange = (event, key) => {
        const file = event.target.files[0];

        const validationError = validateFile(file);
        console.log(file, 'selected_file')
        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: validationError || '',
        }));

        // setter(validationError ? null : file);
        setIsAboutUsValid(!validationError);
        // console.log(setter, "setter_setter")
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContents((prevContents) => ({
                    ...prevContents,
                    [key]: e.target.result
                }));
            };

            reader.readAsText(file);

            setErrors((prevErrors) => ({
                ...prevErrors,
                [key]: ""
            }));

            setUploadStatus((prevStatus) => ({
                ...prevStatus,
                [key]: true 
            }));

            switch (key) {
                case 'about_us':
                    setAboutUs(file);
                    break;
                case 'privacy_policy':
                    setPrivacyPolicy(file);
                    break;
                case 'terms_condition':
                    setTermsConditions(file);
                    break;
                case 'user_agreement':
                    setUserAgreement(file);
                    break;
                default:
                    console.warn('Unexpected key:', key);
                    break;
            }

            event.target.value = null;
        }
    };


    const getFileName = (key) => {

        switch (key) {
            case 'about_us':
                return legal_info.about_us ? 'About Us.txt' : 'Upload About Us.txt';
            case 'privacy_policy':
                return legal_info.privacy_policy ? 'Privacy Policy.txt' : 'Upload Privacy Policy.txt';
            case 'terms_conditions':
                return legal_info.terms_conditions ? 'Terms and Conditions.txt' : 'Upload Terms and Conditions.txt';
            case 'user_agreement':
                return legal_info.user_agreement ? 'User Agreement.txt' : 'Upload User Agreement.txt';
            default:
                return 'Upload file';
        }
    };

    // ---------------------------------------------------------------------------------SaveFunctionality-------------------------------------------------------

    const handleSave = async (file, key) => {
        // const validationError = validateFile(file);
        // setErrors((prevErrors) => ({
        //     ...prevErrors,
        //     [key]: validationError,
        // }));
        // console.log(validationError, 'validation_error');

        // if (!validationError) {
        //     console.log(`${key} is valid and ready to be saved:`, file);
        // }
        const validationError = validateFile(file);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: validationError,
        }));
        console.log(validationError, 'validation_error');

        if (validationError) return;

        console.log(`${key} is valid and ready to be saved:`, file);
       

        if (file) {
            switch (key) {
                case "about_us":
                    try {
                        const data = await SubmitAboutUs(file, li_id);
                        console.log(data, 'about_us');
                        toast.success(data?.message);
                        setFileContents((prevContents) => ({
                            ...prevContents,
                            about_us: '',
                        }));
                        setAboutUs('');

                        setUploadStatus((prevStatus) => ({
                            ...prevStatus,
                            about_us: false,
                        }));
                    } catch (error) {
                        console.error("Error uploading data", error);
                    }
                    break;

                case "privacy_policy":
                    try {
                        const data = await SubmitPrivacyPolicy(file, li_id);
                        toast.success(data?.message);
                        setFileContents((prevContents) => ({
                            ...prevContents,
                            privacy_policy: '',
                        }));
                        setPrivacyPolicy('');
                        setUploadStatus((prevStatus) => ({
                            ...prevStatus,
                            privacy_policy: false,
                        }));
                    } catch (error) {
                        console.error("Error uploading data", error);
                    }
                    break;

                case "terms_condition":
                    try {
                        const data = await SubmitTermsConditions(file, li_id);
                        toast.success(data?.message);
                        setFileContents((prevContents) => ({
                            ...prevContents,
                            terms_condition: '',
                        }));
                        setTermsConditions('');

                        setUploadStatus((prevStatus) => ({
                            ...prevStatus,
                            terms_condition: false,
                        }));
                    } catch (error) {
                        console.error("Error uploading data", error);
                    }
                    break;

                case "user_agreement":
                    try {
                        const data = await SubmitUserAgreement(file, li_id);
                        toast.success(data?.message);
                        setFileContents((prevContents) => ({
                            ...prevContents,
                            user_agreement: '',
                        }));
                        setUserAgreement('');
                        setUploadStatus((prevStatus) => ({
                            ...prevStatus,
                            user_agreement: false,
                        }));
                    } catch (error) {
                        console.error("Error uploading data", error);
                    }
                    break;

                default:
                    console.warn(`No handler for key: ${key}`);
                    break;
            }
        } else {
            return errors;
        }
    };



    console.log(fileContents?.about_us?.trim(), fileContents?.privacy_policy?.trim(), fileContents?.terms_condition?.trim(), fileContents?.user_agreement?.trim(), 'all_of_the_file_content')

    // -------------------------------------------------------------------DownloadFunctionality---------------------------------------------------------------------

    const handleDownload = (key) => {
        let content = '';

        switch (key) {
            case "about_us":
                content = fileContents?.about_us ? fileContents?.about_us : legal_info?.about_us;
                break;
            case "privacy_policy":
                content = fileContents?.privacy_policy ? fileContents?.privacy_policy : legal_info?.privacy_policy;
                break;
            case "terms_conditions":
                content = fileContents?.terms_condition ? fileContents?.terms_condition : legal_info?.terms_conditions;
                break;
            case "user_agreement":
                content = fileContents?.user_agreement ? fileContents?.user_agreement : legal_info?.user_agreement;
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


    return (
        <>

            <div className='grid grid-rows-4 gap-[0.5vw] py-[1vw] pl-[6vw] pr-[6vw]'>
                <div>
                    <div>
                        <p className='text-[1.25vw] text-[#1F487C] font-semibold'>About Us</p>
                    </div>
                    <div className='grid grid-cols-12 gap-[4vw]'>
                        <div className='col-span-7'>

                            <div>
                                <div className="relative mb-2">
                                    <input
                                        id="about_us"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".txt"
                                        // onChange={(event) => handleFileChange(setAboutUs, 'about_us', event)}
                                        onChange={(event) => handleFileChange(event, 'about_us')}

                                    />
                                    <button
                                        type="button"
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("about_us").click();
                                        }}
                                    >
                                        {aboutUs ? (
                                            <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">

                                                {aboutUs.name}
                                            </div>
                                        ) : (
                                            <span className="opacity-80 text-[#1F4B7F] text-[0.8vw]">{getFileName('about_us')}</span>
                                        )}
                                        <FaCloudUploadAlt
                                            color="#1F487C"
                                            size={"2vw"}
                                            className="absolute right-[1vw]"
                                        />
                                    </button>

                                    {errors.about_us && (
                                        <div style={{ color: "red" }} className="text-[0.8vw] absolute bottom-[-1.25vw]">
                                            {errors.about_us}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5'>
                            <div className='grid grid-cols-11 gap-[3vw]'>
                                <button
                                    type='button'
                                    // onClick={() => openModal(legal_info.about_us, 'About Us')}
                                    onClick={() => openModal(fileContents.about_us ? fileContents.about_us : legal_info.about_us, 'About Us')}

                                    onMouseEnter={() => { setButtonHover("abt_rpl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "abt_rpl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Preview
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleDownload('about_us')}
                                    onMouseEnter={() => { setButtonHover("abt_dwnl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "abt_dwnl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Download
                                </button>
                                <button
                                    type='button'
                                    className={`col-span-3 ${buttonHover === "abt_sve" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                    disabled={!uploadStatus.about_us}
                                    onClick={() => handleSave(aboutUs, 'about_us')}
                                    onMouseEnter={() => { setButtonHover("abt_sve") }}
                                    onMouseLeave={() => { setButtonHover("") }}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='text-[1.25vw] text-[#1F487C] font-semibold'>Privacy Policy</p>
                    </div>
                    <div className='grid grid-cols-12 gap-[4vw]'>
                        <div className='col-span-7'>

                            <div>
                                <div className="relative mb-2">
                                    <input
                                        id="privacy_policy"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".txt"
                                        // onChange={(event) => handleFileChange(setPrivacyPolicy, 'privacyPolicy', event)}
                                        onChange={(event) => handleFileChange(event, 'privacy_policy')}

                                    />
                                    <button
                                        type="button"
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("privacy_policy").click();
                                        }}
                                    >
                                        {privacyPolicy ? (
                                            <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">

                                                {privacyPolicy.name}
                                            </div>
                                        ) : (
                                            <span className="opacity-80 text-[#1F4B7F] text-[0.8vw]"> {getFileName('privacy_policy')}</span>
                                        )}

                                        <FaCloudUploadAlt
                                            color="#1F487C"
                                            size={"2vw"}
                                            className="absolute right-[1vw]"
                                        />
                                    </button>
                                    {errors.privacy_policy && (
                                        <div style={{ color: "red" }} className="text-[0.8vw] absolute bottom-[-1.25vw]">
                                            {errors.privacy_policy}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5'>
                            <div className='grid grid-cols-11 gap-[3vw]'>
                                <button
                                    type='button'
                                    // onClick={() => openModal(legal_info.privacy_policy, 'Privacy Policy')}
                                    onClick={() => openModal(fileContents.privacy_policy ? fileContents.privacy_policy : legal_info.privacy_policy, 'Privacy Policy')}
                                    onMouseEnter={() => { setButtonHover("pyc_rpl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "pyc_rpl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Preview
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleDownload('privacy_policy')}
                                    onMouseEnter={() => { setButtonHover("pyc_dwnl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "pyc_dwnl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Download
                                </button>
                                <button
                                    type='button'
                                    className={`col-span-3 ${buttonHover === "pyc_sve" ? "bg-[#1F487C] text-white border-white " : "bg-white text-[#1F487C] border-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                    onClick={() => handleSave(privacyPolicy, 'privacy_policy')}
                                    onMouseEnter={() => { setButtonHover("pyc_sve") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    disabled={!uploadStatus.privacy_policy}

                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='text-[1.25vw] text-[#1F487C] font-semibold'>Terms and Conditions</p>
                    </div>
                    <div className='grid grid-cols-12 gap-[4vw]'>
                        <div className='col-span-7'>

                            <div>
                                <div className="relative mb-2">
                                    <input
                                        id="terms_conditions"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".txt"
                                        // onChange={(event) => handleFileChange(setTermsConditions, 'terms_conditions_upload', event)}
                                        onChange={(event) => handleFileChange(event, 'terms_condition')}

                                    />
                                    <button
                                        type="button"
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("terms_conditions").click();
                                        }}
                                    >
                                        {termsConditions ? (
                                            <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">

                                                {termsConditions.name}
                                            </div>
                                        ) : (
                                            <span className="opacity-80 text-[#1F4B7F] text-[0.8vw]"> {getFileName('terms_conditions')}</span>
                                        )}

                                        <FaCloudUploadAlt
                                            color="#1F487C"
                                            size={"2vw"}
                                            className="absolute right-[1vw]"
                                        />
                                    </button>
                                    {/* {termsConditions && (
                                        <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]">
                                            {termsConditions.name}
                                        </div>
                                    )} */}
                                    {errors.terms_condition && (
                                        <div style={{ color: "red" }} className="text-[0.8vw] absolute bottom-[-1.25vw]">
                                            {errors.terms_condition}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5'>
                            <div className='grid grid-cols-11 gap-[3vw]'>
                                <button
                                    type='button'
                                    // onClick={() => openModal(legal_info.terms_conditions, 'Terms & Conditions')}
                                    onClick={() => openModal(fileContents.terms_condition ? fileContents?.terms_condition : legal_info?.terms_conditions, 'Terms & Condition')}
                                    onMouseEnter={() => { setButtonHover("tmc_rpl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "tmc_rpl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Preview
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleDownload('terms_conditions')}
                                    onMouseEnter={() => { setButtonHover("tmc_dwnl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "tmc_dwnl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Download
                                </button>
                                <button
                                    type='button'
                                    className={`col-span-3 ${buttonHover === "tmc_sve" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                    // onClick={() => openModal(fileContents.terms_condition ? fileContents.terms_condition : legal_info.terms_condition, 'About Us')}
                                    onClick={() => handleSave(termsConditions, 'terms_condition')}
                                    onMouseEnter={() => { setButtonHover("tmc_sve") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    disabled={!uploadStatus.terms_condition}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='text-[1.25vw] text-[#1F487C] font-semibold'>User Agreement </p>
                    </div>
                    <div className='grid grid-cols-12 gap-[4vw]'>
                        <div className='col-span-7'>

                            <div>
                                <div className="relative mb-2">
                                    <input
                                        id="user_agreement"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".txt"
                                        onChange={(event) => handleFileChange(event, 'user_agreement')}
                                    // onChange={(event) => handleFileChange(setUserAgreement, 'user_agreement', event)}
                                    />
                                    <button
                                        type="button"
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById("user_agreement").click();
                                        }}
                                    >
                                        {userAgreement ? (
                                            <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[1vw]">
                                                {userAgreement.name}
                                            </div>
                                        ) : (
                                            <span className="opacity-80 text-[#1F4B7F] text-[0.8vw]"> {getFileName('user_agreement')}</span>
                                        )}


                                        <FaCloudUploadAlt
                                            color="#1F487C"
                                            size={"2vw"}
                                            className="absolute right-[1vw]"
                                        />
                                    </button>
                                    {/* {userAgreement && (
                                        <div className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]">
                                            {userAgreement.name}
                                        </div>
                                    )} */}
                                    {errors.user_agreement && (
                                        <div style={{ color: "red" }} className="text-[0.8vw] absolute bottom-[-1.25vw]">
                                            {errors.user_agreement}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5'>
                            <div className='grid grid-cols-11 gap-[3vw]'>
                                <button
                                    type='button'
                                    onClick={() => openModal(fileContents.user_agreement ? fileContents.user_agreement : legal_info.user_agreement, 'User Agreement')}
                                    onMouseEnter={() => { setButtonHover("usa_rpl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "usa_rpl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Preview
                                </button>
                                <button
                                    type='button'
                                    onMouseEnter={() => { setButtonHover("usa_dwnl") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    onClick={() => handleDownload('user_agreement')}
                                    style={{
                                        transition: "ease-in 0.1s",
                                    }}
                                    className={`col-span-4 ${buttonHover === "usa_dwnl" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}>
                                    Download
                                </button>
                                <button
                                    type='button'
                                    className={`col-span-3 ${buttonHover === "usa_sve" ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"} border-r-[0.2vw] relative  px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                                    // onClick={() => openModal(fileContents.user_agreement ? fileContents.user_agreement : legal_info.user_agreement, 'About Us')}
                                    onClick={() => handleSave(userAgreement, 'user_agreement')}
                                    onMouseEnter={() => { setButtonHover("usa_sve") }}
                                    onMouseLeave={() => { setButtonHover("") }}
                                    disabled={!uploadStatus.user_agreement}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                <div className='px-[3vw] py-[1vw]'>{modalContent?.split("\r\n")?.map((item) => (
                                    <p>{item}</p>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AboutUs

