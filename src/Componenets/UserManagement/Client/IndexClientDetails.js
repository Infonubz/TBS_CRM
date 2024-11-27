import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, Progress, Modal } from "antd";
// import AddPartner from "../Partner/AddPartner";
// import AddEmployee from "../Employee/IndexAddEmployee";
import { BiPlus } from "react-icons/bi";
import AddRegisterAddress from "./AddRegisterAddress";
import AddGSTDetails from "./AddGSTDetails";
import { SubmitProfileData } from "../../../Api/UserManagement/SuperAdmin";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import AddCompanyDetails from "./AddCompanyDetails";
import umbuslogo from "../../../asserts/umbuslogo.png"
import pencilshape from '../../../asserts/pencilicon.png'
import {
  ClientProfile,
  GetClientProfile,
  GetCompanyDetailsById,
  GetClientData,
} from "../../../Api/UserManagement/Client";
import { toast } from "react-toastify";
import { RiUser3Fill } from "react-icons/ri";
import ImgCrop from "antd-img-crop";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ClientIndex({
  adminUser,
  setClientID,
  clientID,
  setModalIsOpen,
  updatedata,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [currentpage, setCurrentpage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [client_id, setClient_Id] = useState(null);
  const [profileImage, setProfileImage] = useState(false);
  const [enableUpload, setEnableUpload] = useState(false);
  const [apiMethod, setApiMethod] = useState(false);
  const [addressback, setAddressBack] = useState(false);
  const [businessback, setBusinessBack] = useState(false);
  const [documentback, setDocumentBack] = useState(false);
  const [gstback, setGstback] = useState(false);
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [SPA_ID, SetSPAID] = useState(null);

  const imgUrl = process.env.REACT_SERVER_IMAGE_URL
  //const [superadmindata, setSuperAdminData] = useState("");
  const [clientdata, setClientData] = useState("");

  const dispatch = useDispatch();
  const ClientCompanyLogo = sessionStorage.getItem("ClientCompanyLogo");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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

  const handleChange = ({ fileList: newFileList }) => {
    console.log(newFileList, "newFileList");
    setFileList(newFileList);
    if (newFileList?.length > 0) {
      setProfileImage(true);
    } else {
      setProfileImage(false);
    }
    // SubmitProfileData(newFileList[0], dispatch);
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div className="flex items-center justify-center flex-col">
      <BiPlus size={"1.2vw"} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log(currentpage == 1, "shcjsbd");

  const fetchGetClient = async () => {
    try {
      const data = await GetCompanyDetailsById(
        clientID,
        setClientID,
        setClientData
      );
      setClientData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  const getprofile = async () => {
    try {
      const data = await GetClientProfile(clientID);
      setSelectedFile(data?.company_logo);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  // const handleupload = async (image) => {
  //   console.log(image, "85885555");
  //   try {
  //     const data = await ClientProfile(image, clientID, dispatch);
  //     // setClientData(data);
  //     toast.success(data.message);
  //     GetClientProfile(clientID);
  //     GetClientData(dispatch);
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };
  useEffect(() => {
    if (updatedata) {
      setEnableUpload(true);
    } else {
      setEnableUpload(false);
    }
  }, []);

  useEffect(() => {
    if (clientID != null) {
      getprofile();
    }
    console.log(clientID, "clientID");
  }, []);

  useEffect(() => {
    if (clientID != null) {
      fetchGetClient();
    }
  }, [clientID, setClientID, setClientData]);

  console.log(clientID,updatedata, "clientdata");

  console.log(location.pathname == "/settings", "locationlocationlocation");

  // useEffect(()=>{
  //   if(selectedFile){
  //     setFileList(selectedFile)
  //   }
  // },[selectedFile])
console.log(process.env.REACT_SERVER_IMAGE_URL,"urlrurlrurlrurlrurlrurl");

  return (
    <div>
      <div
        className={`w-full h-full ${
          location.pathname != "/settings" ? "py-0" : "py-[1vw] px-[1vw]"
        }`}
      >
        {location.pathname != "/settings" ? (
          <div className="w-full h-[3vw] flex">
            <Progress
              percent={
                currentpage == 1
                  ? 35
                  : currentpage == 2
                  ? 70
                  : currentpage == 3
                  ? 100
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
                  {clientID ? "Update Client" : "Create Client"}
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
                {/* {ClientCompanyLogo === 'null' || ClientCompanyLogo === null ? (
                  <div>
                    <RiUser3Fill size='1vw'
                      color="#1F487C"
                      className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                  </div>
                ) : (

                  <img
                    onChange={handleFileChange}
                    src={`http://192.168.90.47:4000${ClientCompanyLogo}`}
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

                  {fileList.length === 0 &&
                    selectedFile && ( // Check if there are no files in the fileList and selectedFile is set
                      <img
                        src={`${apiImgUrl}${selectedFile}`}
                        alt="Profile"
                        className="w-[5.9vw] h-[5.9vw] object-cover rounded-[0.2vw] top-[0vw] left-[0vw] absolute opacity-25 z-[1] pointer-events-none"
                      />
                    )}
                </div>

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
                {updatedata
                      ? " "
                      : profileImage === false && (
                          <div className="text-red-700 text-[.7vw] bottom-[-1.2vw] absolute">
                            * Profile Image is required
                          </div>
                        )}
              </div>

              <div className="flex gap-[3vw] pt-[2vw] px-[7.5vw]">
                <div className="">
                  <div className="bg-[#D9D9D9] rounded-t-full rounded-b-full w-[0.7vw] h-[11vw] relative">
                    <div
                      className={`absolute w-[3.4vw] h-[1.5vw] ${
                        currentpage == 1
                          ? "top-[.2vw]"
                          : currentpage == 2
                          ? "top-[4.8vw]"
                          : currentpage == 3
                          ? "bottom-0"
                          : "bottom-0"
                      }`}
                    >
                       <img src={pencilshape} alt='icon' className="h-[1.2vw] w-[3.4vw]" />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-y-[3vw]">
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Company Details
                    </label>

                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Address Details
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      G.S.T Details
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 relative">
            <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-1.5vw] flex justify-center items-center z-[1]"><img className="" src={umbuslogo} alt="buslogo"/></div>

              {currentpage == 1 ? (
                <AddCompanyDetails
                  setCurrentpage={setCurrentpage}
                  SetSPAID={SetSPAID}
                  setClientID={setClientID}
                  SPA_ID={SPA_ID}
                  clientdata={clientdata}
                  clientID={clientID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  client_id={client_id}
                  setClient_Id={setClient_Id}
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
                  clientdata={clientdata}
                  clientID={clientID}
                  setClientID={setClientID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  setBusinessBack={setBusinessBack}
                  businessback={businessback}
                  updatedata={updatedata}
                  gstback={gstback}
                />
              ) : (
                currentpage == 3 && (
                  <AddGSTDetails
                    setCurrentpage={setCurrentpage}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    clientdata={clientdata}
                    clientID={clientID}
                    setClientID={setClientID}
                    setModalIsOpen={setModalIsOpen}
                    gstback={gstback}
                    client_id={client_id}
                    setGstback={setGstback}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
