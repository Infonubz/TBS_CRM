import React, { useEffect, useState } from 'react'
import Documents from './Documents'
import AddressDetails from './AddressDetails'
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import PersonalDetail from './PersonalDetail'
import ProfessionalDetails from './ProfessionalDetails'
import { IoTriangleSharp } from "react-icons/io5";

const IndexEmployee = ({ }) => {

    const [switchTab, setSwitchTab] = useState('PersonalDetails')
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [profileImage, setProfileImage] = useState(false)
    const [enableUpload, setEnableUpload] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const [addressType, setAddressType] = useState('temporary')

    console.log(fileList, 'file_list')

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

   
    const handleChange = async ({ fileList: newFileList }) => {
     
        newFileList = Array.isArray(newFileList) ? newFileList : [];

        console.log('newFileList:', newFileList);  

        setFileList(newFileList);

        
        if (newFileList.length > 0) {
            setProfileImage(true);
        } else {
            setProfileImage(false);
        }
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };




    return (
        <>
            <div className='py-[1vw] px-[2.5vw]'>
                <div className='grid grid-cols-4 border-[0.1vw] border-[#1F487C] font-normal text-[1.2vw] rounded-md text-[#1F487C]'>
                    <div
                        className={`${switchTab == 'PersonalDetails' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer rounded-l-[0.25vw]`}
                        onClick={() => setSwitchTab('PersonalDetails')}>
                        Personal Details
                    </div>
                    <div
                        className={`${switchTab == 'AddressDetails' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer`}
                        onClick={() => setSwitchTab('AddressDetails')}>
                        Address Details
                    </div>
                    <div
                        className={`${switchTab == 'ProfessionalDetails' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer`}
                        onClick={() => setSwitchTab('ProfessionalDetails')}>
                        Professional Details
                    </div>
                    <div
                        className={`${switchTab == 'Documents' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C] py-[0.5vw] cursor-pointer rounded-r-[0.25vw]`}
                        onClick={() => setSwitchTab('Documents')}>
                        Documents
                    </div>
                </div>
                <div className='mt-[1vw] grid grid-cols-12'>
                    <div className='col-span-3 flex flex-col items-center justify-center'>
                        <div className=''>
                            <div className="relative">
                                <ImgCrop showGrid rotationSlider showReset onImageCrop={(file) => {

                                }}>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-circle"
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                        disabled={enableUpload}
                                        accept=".png, .jpg, .jpeg"
                                        size="large"
                                    >
                                        {fileList?.length < 1 && "+ Upload"}
                                    </Upload>
                                </ImgCrop>

                                {fileList.length === 0 && selectedFile && (
                                    <img
                                        src={`http://192.168.90.47:4000${selectedFile}`}
                                        alt="Photo"
                                        className="w-[6.1vw] h-[6.1vw] object-cover rounded-full top-[0.1vw] left-[0.15vw] absolute opacity-25 z-[1] pointer-events-none"
                                    />
                                )}
                            </div>
                        </div>
                        {switchTab === 'AddressDetails' ? <div className='flex gap-[3vw] py-[4vw] relative '>
                            <div className='w-[0.5vw] h-auto bg-slate-400 rounded-full '>
                            </div>
                            <div className='flex flex-col gap-[1vw]'>
                                <div className='text-[#1F487C] text-[1vw] font-semibold cursor-pointer' onClick={() => setAddressType('temporary')}>Temporary Address</div>
                                <div className='text-[#1F487C] text-[1vw] font-semibold cursor-pointer' onClick={() => setAddressType('permenant')}>Permanent Address</div>
                            </div>
                            <div className={`h-[0.86vw] w-[2.25vw] bg-[#1F487C] absolute ${addressType === 'temporary' ? 'top-[4.4vw]' : 'top-[6.7vw] '}  rounded-l-full`}>
                                <div className='h-[0.5vw] w-[0.2vw] absolute top-[-0.2vw] right-[-0.7vw] rotate-90'><IoTriangleSharp size='0.95vw' color='#1F487C' /></div>
                            </div>
                        </div> : ""}
                    </div>
                    <div className='col-span-9'>
                        {switchTab == 'PersonalDetails' ?
                            <PersonalDetail fileList={fileList} setSelectedFile={setSelectedFile} /> : switchTab == 'AddressDetails' ? <AddressDetails addressType={addressType} /> : switchTab == 'ProfessionalDetails' ? <ProfessionalDetails /> : switchTab == 'Documents' ? <Documents /> : ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndexEmployee