import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, Progress, Modal } from "antd";
// import AddSuperAdmin from "./AddCompanyProfile";
// import AddPartner from "../Partner/AddPartner";
// import AddEmployee from "../Employee/IndexAddEmployee";
import { BiPlus } from "react-icons/bi";
import AddPersonalDetails from "./AddPersonalDetails";
import AddProfessionalDetails from "./AddProfessionalDetails";
import AddDocuments from "./AddDocuments";
import AddRegisterAddress from "./AddRegisterAddress";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  PartnerProfile,
  GetPartnerProfile,
  GetPartnerData
} from "../../../Api/UserManagement/Partner";
import pencilshape from '../../../asserts/pencilicon.png'
import { RiUser3Fill } from "react-icons/ri";
import ImgCrop from "antd-img-crop";
import umbuslogo from "../../../asserts/umbuslogo.png"
import AddressIndex from "./AddressIndex";

// import AddRegisterAddress from "./AddRegisterAddress";
// import AddBusinessDetails from "./AddBusinessDetails";
// import AddGSTDetails from "./AddGSTDetails";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddParner({
  adminUser,
  PartnerID,
  setPartnerID,
  setModalIsOpen,
  updatedata
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [currentpage, setCurrentpage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [addressback, setAddressBack] = useState(false);
  const [proffesionaback, setProffesionalBack] = useState(false);
  const [documentback, setDocumentBack] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [enableUpload, setEnableUpload] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  console.log(selectedFile, 'selected_file')
  const dispatch = useDispatch();

  const getprofile = async () => {
    try {
      const data = await GetPartnerProfile(PartnerID);
      console.log(updatedata,data.profile_img == null, "datasddf")
      setSelectedFile(data.profile_img);
      if(updatedata && data.profile_img == null){
        setProfileImage(false)
      }
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  console.log(PartnerID,updatedata,"idjdjhsdgfsgfuyegjd");
  
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

  // const handleChange = ({ fileList: newFileList }) => {
  //   console.log(newFileList, "newFileList");
  //   setFileList(newFileList);
  //   if (newFileList?.length > 0) {
  //     setProfileImage(true);
  //   } else {
  //     setProfileImage(false);
  //   }
  //   // SubmitProfileData(newFileList[0], dispatch);
  // };
  const handleChange = async ({ fileList: newFileList }) => {
    const file = newFileList[0]?.originFileObj;
    
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      
      if (fileSizeInMB > 5) {
        // If the file size is greater than 5MB, alert the user
        // alert('File size exceeds 5MB limit!');
        setProfileImage(false)
        // Remove the file from the list
        newFileList.pop(); 
      } else {
        setFileList(newFileList);
        setSelectedFile(newFileList)
        if (newFileList?.length > 0) {
          setProfileImage(true);
        } else {
          setProfileImage(false);
        }
      }
    } else {
      // If no file, just update the file list
      setProfileImage(false)
      setFileList(newFileList);
      setSelectedFile(newFileList)
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div className="flex items-center justify-center flex-col">
      <BiPlus size={"1.2vw"} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleupload = async (image) => {
    console.log(image, "85885555");
    try {
      const data = await PartnerProfile(image, PartnerID, dispatch);
      // setSuperAdminData(data);
      toast.success(data.message);
      GetPartnerData(dispatch);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  console.log(currentpage == 1, "shcjsbd");

  useEffect(() => {
    getprofile();
  }, []);

  const PartnerProfileImg = sessionStorage.getItem('PartnerProfileImg')
  console.log(PartnerProfileImg, 'check_partner_profile_image')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [partnerData, setPartnerData] = useState('')

  useEffect(() => {
    if (updatedata) {
      setEnableUpload(true);
    } else {
      setEnableUpload(false);
    }
  }, []);

 
  return (
    <div>
      <div className="w-full h-full">
        <div className="w-full h-[3vw] flex">
          <Progress
            percent={
              currentpage == 1
                ? 25
                : currentpage == 2
                  ? 50
                  : currentpage == 3
                    ? 75
                    : 100
            }
            size="1.2vw"
            strokeColor="#1F4B7F"
            className="pr-[2vw] text-[1vw] font-bold text-[#1f4b7f]"
            format={(percent) => `${percent}%`}
          />
        </div>
        <div className="w-full h-full">
          <div className="grid grid-cols-7 w-full h-full">
            <div className="col-span-3 flex relative flex-col">
              <div className="flex flex-col px-[5vw]">
                <label className="text-[1.5vw] font-bold text-[#1f4b7f]">
                 {updatedata ? "Update Partner" : "Create Partner"}
                </label>
                <label className="text-[1vw] text-[#1f4b7f]">
                  Company Setup
                </label>
              </div>
              <div className="pl-[5vw] pt-[0.3vw] pb-[1.5vw]">
                <div className="border-b-[0.1vw] border-[#1f4b7f] w-[15vw]"></div>
              </div>

              <div className="flex items-center flex-col relative">
                {/* <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showErrorIcon: false,
                  }}
                  className="outerline-none h-[5.5vw]"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}
                {/* <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleupload(e?.target?.files[0])}
                />
                <label
                  htmlFor="fileInput"
                  className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]"
                >
                  {selectedFile ? (
                    <img src={`http://192.168.90.47:4000${selectedFile}`} />
                  ) : (
                    <span className="text-[1.1vw] text-[#1f4b7f] font-bold">
                      Profile
                    </span>
                  )}
                </label> */}
                {/* {PartnerProfileImg === 'null' || PartnerProfileImg === null || PartnerProfileImg === undefined || PartnerProfileImg === 'undefined' ? (
                  < div >
                    <RiUser3Fill size='1vw'
                      color="#1F487C"
                      className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                  </div>
                ) : (

                  <img
                    onChange={handleFileChange}
                    src={`http://192.168.90.47:4000${PartnerProfileImg}`}
                    alt="Photo"
                    className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                )} */}

<div className="relative">
                  <ImgCrop
                    showGrid
                    rotationSlider
                    showReset
                    onImageCrop={(file) => {}}
                  >
                    <Upload
                    className="umimgupload"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleChange}
                      onPreview={handlePreview}
                      disabled={enableUpload}
                      accept=".jpg,.jpeg,.png" 
                    >
                      {fileList?.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>

                  {/* {fileList.length === 0 &&
                    selectedFile && ( // Check if there are no files in the fileList and selectedFile is set
                      <img
                        src={`${apiImgUrl}${selectedFile}`}
                        alt="Profile"
                        className="w-[5.9vw] h-[5.9vw] object-cover rounded-[0.2vw] top-[0vw] left-[0vw] absolute opacity-25 z-[1] pointer-events-none"
                      />
                    )} */}
                     {fileList.length === 0 &&
                    selectedFile && ( // Check if there are no files in the fileList and selectedFile is set
                      <img
                        src={`${apiImgUrl}${selectedFile}`}
                        alt="Profile"
                        className="w-[5.9vw] h-[5.9vw] object-cover rounded-[0.2vw] top-[0vw] left-[0vw] absolute opacity-25 z-[1] pointer-events-none"
                      />
                    )}
      
                </div>

                <Modal
                  visible={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                {updatedata && selectedFile != null 
                        ? " "
                        : profileImage === false && (
                          <div className="text-red-500 text-[.7vw] bottom-[-1.2vw] absolute">
                            * Profile Image is required - (Max Size : 5MB)
                          </div>
                        )}
                          {/* {updatedata
                        ? profileImage === false && (
                          <div className="text-red-500 text-[.7vw] bottom-[-1.2vw] absolute">
                            * Profile Image is required - (Max Size : 5MB)
                          </div>)
                        : profileImage === false && (
                          <div className="text-red-500 text-[.7vw] bottom-[-1.2vw] absolute">
                            * Profile Image is required - (Max Size : 5MB)
                          </div>
                        )} */}
              </div>

              <div className="flex gap-[3vw] pt-[2vw] px-[6.5vw]">
                <div className="">
                  <div className="bg-[#D9D9D9] rounded-t-full rounded-b-full w-[0.7vw] h-[10vw] relative">
                    <div
                      className={`absolute h-[1.5vw] w-[3.4vw] ${currentpage == 1
                        ? "top-[.2vw]"
                        : currentpage == 2
                          ? "top-[4.2vw]"
                          : currentpage == 3
                            ? "top-[8.5vw]"
                            : "bottom-0"
                        }`}
                    >
                        <img src={pencilshape} alt='icon' className="h-[1.2vw] w-[3.4vw]" />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-[2.5vw]">
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Personal Details
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Address Details
                    </label>
                    {/* <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Professional Details
                    </label> */}
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Documents
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 relative">
            <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-1.5vw] flex justify-center items-center z-[1]"><img className="" src={umbuslogo} alt="buslogo"/></div>
              {currentpage == 1 ? (
                <AddPersonalDetails
                  setCurrentpage={setCurrentpage}
                  PartnerID={PartnerID}
                  setPartnerID={setPartnerID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  setModalIsOpen={setModalIsOpen}
                  setProffesionalBack={setProffesionalBack}
                  proffesionaback={proffesionaback}
                  fileList={fileList}
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                  updatedata={updatedata}
                  setEnableUpload={setEnableUpload}
                  selectedFile={selectedFile}
                  enableUpload={enableUpload}
                  setSelectedFile={setSelectedFile}
                />
              ) : currentpage == 2 ? (
                // <AddRegisterAddress
                //   setCurrentpage={setCurrentpage}
                //   PartnerID={PartnerID}
                //   setPartnerID={setPartnerID}
                //   setAddressBack={setAddressBack}
                //   addressback={addressback}
                //   setModalIsOpen={setModalIsOpen}
                // />
                <AddressIndex 
                setAddressBack={setAddressBack}
                setCurrentpage={setCurrentpage}
                documentback={documentback}
                 addressback={addressback}
                 PartnerID={PartnerID}
                 proffesionaback={proffesionaback}
                 setPartnerID={setPartnerID}
                 updatedata={updatedata}
                 />
              ) : (
                // : currentpage == 3 ? (
                //   <AddProfessionalDetails
                //   setCurrentpage={setCurrentpage}
                //   PartnerID={PartnerID}
                //   setPartnerID={setPartnerID}
                //   setProffesionalBack={setProffesionalBack}
                //   proffesionaback={proffesionaback}
                //   documentback={documentback}
                //   setModalIsOpen={setModalIsOpen}
                //    />
                // )
                <AddDocuments
                  setCurrentpage={setCurrentpage}
                  currentpage={currentpage}
                  addressback={addressback}
                  PartnerID={PartnerID}
                  setPartnerID={setPartnerID}
                  setDocumentBack={setDocumentBack}
                  documentback={documentback}
                  setModalIsOpen={setModalIsOpen}
                  updatedata={updatedata}
                  
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
