import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, Progress, Modal } from "antd";
import AddSuperAdmin from "./AddCompanyProfile";
// import AddPartner from "../Partner/AddPartner";
// import AddEmployee from "../Employee/IndexAddEmployee";
import { BiPlus } from "react-icons/bi";
import AddRegisterAddress from "./AddRegisterAddress";
import AddBusinessDetails from "./AddBusinessDetails";
import AddGSTDetails from "./AddGSTDetails";
import AddDocuments from "./AddDocuments";
import pencilshape from '../../../asserts/pencilicon.png'
import {
  GetOperatorProfile,
  GetSuperAdminById,
  OperatorProfile,
  SubmitProfileData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import USERPROFILE from '../../../asserts/Image.png'
import { RiUser3Fill } from "react-icons/ri";
import ImgCrop from "antd-img-crop";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function SuperAdminIndex({
  adminUser,
  setOperatorID,
  operatorID,
  setModalIsOpen,
  updatedata
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  // const apiurl = process.env.REACT_APP_API_URL;

  const [currentpage, setCurrentpage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [operator_id, setOperator_Id] = useState(null);
  const [profileImage, setProfileImage] = useState(false)
  const [enableUpload, setEnableUpload] = useState(false)



  console.log("fileListfileLisfileListt", operatorID, updatedata);


  useEffect(() => {
    if (updatedata) {
      setEnableUpload(true)
    }
    else {
      setEnableUpload(false)
    }
  }, [])


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

  const operatorProfileImage = sessionStorage.getItem('OperatorProfileImg')
  // const operatorProfileImage = useSelector((state) => state.crm.operator_byid[0]?.profileimg)
  console.log(operatorProfileImage, 'check_operator_profile_image')

  const dispatch = useDispatch();

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

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div className="flex items-center justify-center flex-col">
      <BiPlus size={"1.2vw"} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log(currentpage == 1, "shcjsbd");
  const [SPA_ID, SetSPAID] = useState(null);
  const [superadmindata, setSuperAdminData] = useState("");

  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminById(
        operatorID,
        setOperatorID,
        setSuperAdminData,
        dispatch
      );
      setSuperAdminData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  const handleupload = async (image) => {
    console.log(image, "85885555");
    try {
      const data = await OperatorProfile(image, operatorID);
      // setSuperAdminData(data);
      toast.success(data.message);
      getprofile();
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null) {
      fetchGetUser();
    }
  }, [operatorID, setOperatorID, setSuperAdminData]);

  console.log(operatorID, "operatorID operatorID");

  const [addressback, setAddressBack] = useState(false);
  const [businessback, setBusinessBack] = useState(false);
  const [documentback, setDocumentBack] = useState(false);
  const [gstback, setGstback] = useState(false);
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile, 'selected_file')

  const getprofile = async () => {
    try {
      const data = await GetOperatorProfile(operatorID, dispatch);
      setSelectedFile(data[0]?.profileimg);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  useEffect(() => {
    getprofile();
  }, [operatorID]);



  console.log(apiImgUrl,"urlurlurlurlurlurlurlurl");
  

  console.log(
    `${apiImgUrl}${selectedFile}`,
    "locationlocationlocation"
  );

  console.log(profileImage, "imagkjhdfkjdhfk");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  return (
    <div>
      <div
        className={`w-full h-full ${location.pathname != "/settings" ? "py-0" : "py-[1vw] px-[1vw]"
          }`}
      >
        {location.pathname != "/settings" ? (
          <div className="w-full h-[3vw] flex">
            <Progress
              percent={
                currentpage == 1
                  ? 20
                  : currentpage == 2
                    ? 40
                    : currentpage == 3
                      ? 60
                      : currentpage == 4
                        ? 80
                        : 100
              }
              size="1.2vw"
              strokeColor="#1F4B7F"
              className="pr-[2vw] text-[1vw] font-bold text-[#1f4b7f]"
              format={(percent) => `${percent}%`}
            />
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-full">
          <div className="grid grid-cols-7 w-full h-full">
            <div className="col-span-3 flex relative flex-col">
              <div className="flex flex-col px-[5vw]">
                <label className="text-[1.5vw] font-bold text-[#1f4b7f]">
                  {operatorID ? "Update Operator" : "Create Operator"}
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
                  className="outerline-none"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload> */}

                <div className="relative">
                  <ImgCrop showGrid rotationSlider showReset onImageCrop={(file) => {

                  }}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleChange}
                      onPreview={handlePreview}
                      disabled={enableUpload}
                    >
                      {fileList?.length < 1 && "+ Upload"}


                    </Upload>
                  </ImgCrop>

                  {fileList.length === 0 && selectedFile && (  // Check if there are no files in the fileList and selectedFile is set
                    <img
                      src={`${apiImgUrl}${selectedFile}`}
                      alt="Profile"
                      className="w-[5.9vw] h-[5.9vw] object-cover rounded-[0.2vw] top-[0vw] left-[0vw] absolute opacity-25 z-[1] pointer-events-none"
                    />
                  )}
                  
                </div>
                {updatedata
                      ? " "
                      : profileImage === false && (
                          <span className="text-red-700 text-[.7vw] absolute bottom-[-1.2vw]">
                            * Profile Image is required
                          </span>
                        )}


                {/* {operatorProfileImage === 'null' || operatorProfileImage === null ? (
                  <div>
                    <RiUser3Fill size='1vw'
                      color="#1F487C"
                      className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                  </div>
                ) : (

                  <img
                    onChange={handleFileChange}
                    src={`http://192.168.90.47:4000${operatorProfileImage}`}
                    alt="Photo"
                    className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                )} */}

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
              </div>

              <div className="flex gap-[3vw] pt-[2vw] px-[7.5vw] relative">
                <div className="">
                  <div className="bg-[#D9D9D9] rounded-t-full rounded-b-full w-[0.7vw] h-[14vw] relative">
                    <div
                      className={`absolute  h-[1.5vw] w-[3.4vw] ${currentpage == 1
                        ? "top-[.2vw]"
                        : currentpage == 2
                          ? "top-[3.4vw]"
                          : currentpage == 3
                            ? "top-[6.5vw]"
                            : currentpage == 4
                              ? "top-[9.5vw]"
                              : "bottom-[-.3vw]"
                        }`}
                    >
                      <img src={pencilshape} alt='icon' className="h-[1.2vw] w-[3.4vw]" />
                    </div>
                    {/* <img src={pencilshape} alt='icon' 
                      className={`absolute h-[3vw] w-[5vw] ${currentpage == 1
                        ? "top-0"
                        : currentpage == 2
                          ? "top-[3vw]"
                          : currentpage == 3
                            ? "top-[6vw]"
                            : currentpage == 4
                              ? "top-[9vw]"
                              : "bottom-0"
                        }`}
                    /> */}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-[1.5vw]">
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Company Profile
                    </label>

                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Address Details
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Business Details
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Documents
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      G.S.T Details
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              {currentpage == 1 ? (
                <AddSuperAdmin
                  setCurrentpage={setCurrentpage}
                  SetSPAID={SetSPAID}
                  SPA_ID={SPA_ID}
                  superadmindata={superadmindata}
                  operatorID={operatorID}
                  setOperatorID={setOperatorID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  operator_id={operator_id}
                  setOperator_Id={setOperator_Id}
                  fileList={fileList}
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                  updatedata={updatedata}
                  setEnableUpload={setEnableUpload}
                />
              ) : currentpage == 2 ? (
                <AddRegisterAddress
                  setCurrentpage={setCurrentpage}
                  currentpage={currentpage}
                  SetSPAID={SetSPAID}
                  SPA_ID={SPA_ID}
                  superadmindata={superadmindata}
                  operatorID={operatorID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  setBusinessBack={setBusinessBack}
                  businessback={businessback}
                  updatedata={updatedata}
                />
              ) : currentpage == 3 ? (
                <AddBusinessDetails
                  setCurrentpage={setCurrentpage}
                  SetSPAID={SetSPAID}
                  SPA_ID={SPA_ID}
                  superadmindata={superadmindata}
                  operatorID={operatorID}
                  setBusinessBack={setBusinessBack}
                  businessback={businessback}
                  documentback={documentback}
                  setDocumentBack={setDocumentBack}
                  updatedata={updatedata}
                />
              ) : currentpage == 4 ? (
                <AddDocuments
                  setCurrentpage={setCurrentpage}
                  SetSPAID={SetSPAID}
                  SPA_ID={SPA_ID}
                  currentpage={currentpage}
                  superadmindata={superadmindata}
                  operatorID={operatorID}
                  documentback={documentback}
                  setDocumentBack={setDocumentBack}
                  setBusinessBack={setBusinessBack}
                  gstback={gstback}
                  setGstback={setGstback}
                  updatedata={updatedata}
                />
              ) : (
                currentpage == 5 && (
                  <AddGSTDetails
                    setCurrentpage={setCurrentpage}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    superadmindata={superadmindata}
                    operatorID={operatorID}
                    setOperatorID={setOperatorID}
                    setModalIsOpen={setModalIsOpen}
                    gstback={gstback}
                    operator_id={operator_id}
                    setGstback={setGstback}
                    updatedata={updatedata}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
