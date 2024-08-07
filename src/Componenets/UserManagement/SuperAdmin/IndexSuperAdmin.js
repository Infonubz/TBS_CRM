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
import {
  GetOperatorProfile,
  GetSuperAdminById,
  OperatorProfile,
  SubmitProfileData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
}) {
  const [currentpage, setCurrentpage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

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
  const dispatch = useDispatch();
  const handleChange = async ({ fileList: newFileList }) => {
    console.log(newFileList, "newFileList");
    setFileList(newFileList);
    // SubmitProfileData(newFileList[0], dispatch);

    try {
      const data = await OperatorProfile(newFileList[0]);
      // setSuperAdminData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
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
        setSuperAdminData
      );
      setSuperAdminData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const handleupload = async (image) => {
    console.log(image, "85885555");
    try {
      const data = await OperatorProfile(image);
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

  console.log(operatorID, "operatorIDoperatorID");
  const [addressback, setAddressBack] = useState(false);
  const [businessback, setBusinessBack] = useState(false);
  const [documentback, setDocumentBack] = useState(false);
  const [gstback, setGstback] = useState(false);
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const getprofile = async () => {
    try {
      const data = await GetOperatorProfile(operatorID);
      setSelectedFile(data[0]?.profileimg);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    getprofile();
  }, [operatorID]);
  const apiurl = process.env.REACT_APP_API_URL;
  const profileurl = process.env.REACT_SERVER_IMAGE_URL;
  console.log(`${profileurl}${selectedFile}`, "locationlocationlocation");
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

              <div className="flex items-center flex-col">
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
                <input
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
                </label>
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

              <div className="flex gap-[3vw] pt-[2vw] px-[7.5vw]">
                <div className="">
                  <div className="bg-[#D9D9D9] rounded-t-full rounded-b-full w-[0.7vw] h-[14vw] relative">
                    <div
                      className={`absolute rounded-t-full rounded-b-full w-[0.7vw] h-[2vw] bg-[#1f4b7f] ${
                        currentpage == 1
                          ? "top-0"
                          : currentpage == 2
                          ? "top-[3vw]"
                          : currentpage == 3
                          ? "top-[6vw]"
                          : currentpage == 4
                          ? "top-[9vw]"
                          : "bottom-0"
                      }`}
                    ></div>
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
                  setAddressBack={setAddressBack}
                  addressback={addressback}
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
                />
              ) : (
                currentpage == 5 && (
                  <AddGSTDetails
                    setCurrentpage={setCurrentpage}
                    SetSPAID={SetSPAID}
                    SPA_ID={SPA_ID}
                    superadmindata={superadmindata}
                    operatorID={operatorID}
                    setModalIsOpen={setModalIsOpen}
                    gstback={gstback}
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
