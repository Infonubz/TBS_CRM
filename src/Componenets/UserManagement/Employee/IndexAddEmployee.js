import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, Progress, Modal } from "antd";
// import AddSuperAdmin from "./AddCompanyProfile";
// import AddPartner from "../Partner/AddPartner";
// import AddEmployee from "../Employee/IndexAddEmployee";
import { BiPlus } from "react-icons/bi";
import AddPersonalDetails from "./AddPersonalDetails";
import { useDispatch } from "react-redux";
import AddProfessionalDetails from "./AddProfessionalDetails";
import AddDocuments from "./AddDocuments";
import AddRegisterAddress from "./AddRegisterAddress";
import { useLocation } from "react-router";
import {
  GetOwnerEmployeeProfile,
  OwnerEmployeeProfile,
  GetEmployeeData
} from "../../../Api/UserManagement/Employee";
import { toast } from "react-toastify";
import { RiUser3Fill } from "react-icons/ri";

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

export default function AddEmployee({
  adminUser,
  EmployeeID,
  setEmployeeID,
  setModalIsOpen,
}) {
  const [currentpage, setCurrentpage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

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
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div className="flex items-center justify-center flex-col">
      <BiPlus size={"1.2vw"} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log(currentpage == 1, "shcjsbd");
  console.log();
  const [addressback, setAddressBack] = useState(false);
  const [proffesionaback, setProffesionalBack] = useState(false);
  const [documentback, setDocumentBack] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const getprofile = async () => {
    try {
      const data = await GetOwnerEmployeeProfile(EmployeeID);
      setSelectedFile(data?.profile_img);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  const handleupload = async (image) => {
    console.log(image, "85885555");
    try {
      const data = await OwnerEmployeeProfile(image, EmployeeID, dispatch);
      // setSuperAdminData(data);
      toast.success(data.message);
      GetEmployeeData(dispatch);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    getprofile();
  }, []);
  const EmployeeProfileImg = sessionStorage.getItem('EmployeeProfileImg')

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
        <div className="w-full h-[28vw]">
          <div className="grid grid-cols-7 w-full h-full">
            <div className="col-span-3 flex relative flex-col">
              <div className="flex flex-col px-[5vw]">
                <label className="text-[1.5vw] font-bold text-[#1f4b7f]">
                  {EmployeeID ? "Update Employee" : "Create Employee"}
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
                > */}
                {/* {selectedFile ? (
                    <img src={`http://192.168.90.47:4000${selectedFile}`} />
                  ) : (
                    <span className="text-[1.1vw] text-[#1f4b7f] font-bold">
                      Profile
                    </span>
                  )} */}
                {/* </label> */}

                {EmployeeProfileImg === null ? (
                  <div>
                    <RiUser3Fill size='1vw'
                      color="#1F487C"
                      className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                  </div>
                ) : (

                  <img src={`http://192.168.90.47:4000${EmployeeProfileImg}`}
                    alt="Photo"
                    className="h-[7vw] w-[7vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]" />
                )}
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

              <div className="flex gap-[3vw] pt-[2vw] px-[6.5vw]">
                <div className="">
                  <div className="bg-[#D9D9D9] rounded-t-full rounded-b-full w-[0.7vw] h-[14vw] relative">
                    <div
                      className={`absolute rounded-t-full rounded-b-full w-[0.7vw] h-[2.5vw] bg-[#1f4b7f] ${currentpage == 1
                        ? "top-0"
                        : currentpage == 2
                          ? "top-[4vw]"
                          : currentpage == 3
                            ? "top-[8vw]"
                            : "bottom-0"
                        }`}
                    ></div>
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
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Professional Details
                    </label>
                    <label className="text-[#1f4b7f] font-semibold text-[1.1vw]">
                      Documents
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              {currentpage == 1 ? (
                <AddPersonalDetails
                  setCurrentpage={setCurrentpage}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setAddressBack={setAddressBack}
                  addressback={addressback}
                  setModalIsOpen={setModalIsOpen}
                />
              ) : currentpage == 2 ? (
                <AddRegisterAddress
                  setCurrentpage={setCurrentpage}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setAddressBack={setAddressBack}
                  setProffesionalBack={setProffesionalBack}
                  proffesionaback={proffesionaback}
                  setModalIsOpen={setModalIsOpen}
                />
              ) : currentpage == 3 ? (
                <AddProfessionalDetails
                  setCurrentpage={setCurrentpage}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setProffesionalBack={setProffesionalBack}
                  proffesionaback={proffesionaback}
                  documentback={documentback}
                  setModalIsOpen={setModalIsOpen}
                />
              ) : (
                <AddDocuments
                  setCurrentpage={setCurrentpage}
                  EmployeeID={EmployeeID}
                  setEmployeeID={setEmployeeID}
                  setDocumentBack={setDocumentBack}
                  documentback={documentback}
                  setModalIsOpen={setModalIsOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
