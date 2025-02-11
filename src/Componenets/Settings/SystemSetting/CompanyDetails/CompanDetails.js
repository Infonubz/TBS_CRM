import React, { useEffect, useState, useRef } from 'react'
import Documents from './Documents'
import AddressDetails from './AddressDetails'
import CompanyProfile from './CompanyProfile'
import BusinessDetails from './BusinessDetails'
import { useDispatch, useSelector } from 'react-redux'
import { GetOperatorData } from '../../../../Api/Settings/SystemSettings/CompanyDetails'
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

const CompanDetails = ({ operatorData, selectedFile }) => {

  const [switchTab, setSwitchTab] = useState('companyProfile')
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [profileImage, setProfileImage] = useState(false)
  const [enableUpload, setEnableUpload] = useState(false)

  console.log(fileList, 'testing_subjectF')

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click(); // Programmatically trigger file input
  };

  const handleChange = async ({ fileList: newFileList }) => {
    console.log(newFileList[0]?.originFileObj, "helldjfhdjkfhdkjf", newFileList?.length, "ereffgdfqe");
    setFileList(newFileList);
    if (newFileList?.length > 0) {

      setProfileImage(true)
    }
    else {
      setProfileImage(false)
    }
    // SubmitProfileData(newFileList[0], dispatch);

    // try {
    //   const data = await OperatorProfile(newFileList[0]);
    //   // setSuperAdminData(data);
    //   console.log(data);

    // } catch (error) {
    //   console.error("Error fetching additional user data", error);
    // }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };


  return (
    <>
      <div className='py-[1vw] px-[2.5vw]'>
        <div className='grid grid-cols-4 border-[0.1vw] border-[#1F487C] font-normal text-[1.2vw] rounded-md text-[#1F487C]'>
          <div
            className={`${switchTab == 'companyProfile' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer rounded-l-[0.25vw]`}
            onClick={() => setSwitchTab('companyProfile')}>
            Company Profile
          </div>
          <div
            className={`${switchTab == 'BusinessDetails' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer`}
            onClick={() => setSwitchTab('BusinessDetails')}>
            Business Details
          </div>
          <div
            className={`${switchTab == 'AddressDetails' ? 'bg-[#1F487C] font-semibold text-white' : ''} flex justify-center border-0 border-[#1F487C]   border-r-[0.1vw] py-[0.5vw] cursor-pointer`}
            onClick={() => setSwitchTab('AddressDetails')}>
            Address Details
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

                {/* <div>
                  <button
                    onClick={handleButtonClick}
                    className="w-[6.1vw] h-[6.1vw] rounded-full bg-white text-white py-2 px-4 border-[0.1vw] border-[#1F487C]"
                  >
                 
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleChange({ fileList: e.target.files })}
                  />
                </div> */}

                {fileList.length === 0 && selectedFile && (  // Check if there are no files in the fileList and selectedFile is set
                  <img
                    src={`http://192.168.90.47:4000${selectedFile}`}
                    alt="Photo"
                    className="w-[6.1vw] h-[6.1vw] object-cover rounded-full top-[0.1vw] left-[0.15vw] absolute opacity-25 z-[1] pointer-events-none"

                  />
                )}
              </div>
            </div>
          </div>
          <div className='col-span-9'>
            {switchTab == 'companyProfile' ?
              <CompanyProfile
                operatorData={operatorData}
                fileList={fileList} /> : switchTab == 'BusinessDetails' ? <BusinessDetails operatorData={operatorData} /> : switchTab == 'AddressDetails' ? <AddressDetails operatorData={operatorData} /> : switchTab == 'Documents' ? <Documents operatorData={operatorData} /> : ''}
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanDetails