import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import logo from "../../asserts/Promotion/bus.jpg";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import card1 from "../../asserts/Promotion/Offer card01.png";
import card2 from "../../asserts/Promotion/Offer card02.png";
import card3 from "../../asserts/Promotion/Offer card03.png";
import card4 from "../../asserts/Promotion/Offer card04.png";
import card5 from "../../asserts/Promotion/Offer card05.png";
import card6 from "../../asserts/Promotion/Offer card06.png";
import card7 from "../../asserts/Promotion/Offer card07.png";
import card8 from "../../asserts/Promotion/Offer card08.png";
import card9 from "../../asserts/Promotion/Offer card09.png";
import card10 from "../../asserts/Promotion/Offer card10.png";
import { PiUpload } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { message, Upload } from "antd";
import {
  GetPromotionData,
  SubmitPromotionData,
} from "../../Api/Promotion/Promotion";
import { toPng, toJpeg } from 'html-to-image';

const Background_View = ({
  setCurrentPromo,
  currentPromo,
  currentPromodata,
  previewUrl,
  setBgImage,
  setPromolist,
  promolist,
  setModalIsOpen,
  updatedata,
  promotionId,
  promodata,
  draggerImage,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  console.log(startIndex, 'startIndex')
  const [uploadBg, setUploadBg] = useState(false);
  const [downloadReq, setDownloadReq] = useState(false);
  const promo = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
  ];
  console.log(promo, 'promo_promo');

  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const { Dragger } = Upload;
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();

  // console.log(draggerImage,"draggerimagesd");

  const props = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    fileList: fileList, // Manage the file list manually
    onChange(info) {
      const { status, name } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log(info.file, "filetesting");
      }
      if (status === "done") {
        message.success(`${name} file uploaded successfully.`);
        setFileList([info.file]); // Set file list to contain only the last uploaded file
      } else if (status === "error") {
        message.error(`${name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      setFileList([file]);
      return true;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    // const userNameFromSessionStorage = sessionStorage.getItem("user_name");
    const userNameFromSessionStorage = localStorage.getItem("user_name");
    // const UserType = sessionStorage.getItem("type_name");
    const UserType = localStorage.getItem("type_name");

    if (UserType) {
      setUserType(UserType);
    }
    if (userNameFromSessionStorage) {
      setUserName(userNameFromSessionStorage);
    }
    console.log(UserType, "UserType");
  }, []);

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, currentPromo?.length - 1);
    setStartIndex(newIndex);
    console.log(newIndex, 'finding_max_limit')
  };

  useEffect(() => {
    GetPromotionData(dispatch);
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(currentPromodata, "---promo List");
      console.log(promolist, "----promo bg image");
      console.log(promotionId, "promotionId");
      const data = await SubmitPromotionData(
        promolist,
        currentPromodata,
        promotionId,
        dispatch
      );
      toast.success(data?.message);
      GetPromotionData(dispatch);
      setBgImage(false);
      setModalIsOpen(false);
      console.log(promolist, currentPromodata, "---promo bg image");
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const downloadImage = () => {
    // html2canvas(document.querySelector(".offer-container")).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   link.download = "offer-image.png";
    //   link.click();
    // });
    // html2canvas(document.querySelector(".promo-container"), {
    //   scale: 2, // Increase the resolution of the canvas
    //   useCORS: true, // Enable cross-origin resource sharing if needed
    //   onclone: (clonedDoc) => {
    //     // Ensure fonts are loaded
    //     const promoContainer = clonedDoc.querySelector(".promo-container");
    //     promoContainer.style.fontFamily = getComputedStyle(
    //       document.querySelector(".promo-container")
    //     ).fontFamily;
    //   },
    // }).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   link.download = "promo-image.png";
    //   link.click();
    // });


    const element = document.querySelector(".promo-container");
    setDownloadReq(true)

    if (element) {
      toPng(element, { quality: 1.0 }) // Adjust quality if needed
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'PromotionImage.png';
          link.click();
        })
        .catch((error) => console.error('Error capturing image:', error));
    }

  };

  useEffect(() => {
    setCurrentPromo(promo);
  }, []);

  console.log(currentPromodata, promolist, "occupationvalue");

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mt-[0.3vw]">
        <h1 className="text-[#1F4B7F] text-[1.5vw] font-bold">
          Background Image
        </h1>
      </div>
      {currentPromo?.length > 0 && !uploadBg ? (
        <div className="flex items-center justify-between mt-[1vw]">
          {/* <button
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="text-[#1F4B7F] font-semibold"
          >
            <IoIosArrowDropleft size={"3vw"} />
          </button> */}
          {startIndex === 0 ?
            <div className="w-[3vw] h-[3vw]"></div>
            :
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="text-[#1F4B7F] font-semibold"
            >
              <IoIosArrowDropleft size={"3vw"} />
            </button>}
          <div className="flex relative justify-center  items-center space-x-[1vw] promo-container">
            {currentPromo
              .slice(startIndex, startIndex + 1)
              .map((image, index) => (
                <img
                  key={index}
                  className="h-[13vw] w-[25vw] rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out"
                  src={image}
                  alt={`promo ${index}`}
                />
              ))}
            {/* <div className=" absolute top-0 left-[-1vw]">
              {(updatedata && draggerImage === false) ?
                <img
                  // src={previewUrl}
                  src={`http://192.168.90.47:4000${promodata.promo_image}`}
                  className="w-[8.2vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                />
                :
                <div className="w-[8.2vw] h-[27.1vh] overflow-hidden relative rounded-tl-[1vw] rounded-bl-[1vw]">
                  <img
                    src={previewUrl}
                    className="w-full h-full object-cover opacity-50 blur-[0.1vw] absolute top-0 left-0"
                  />
                </div>
              }
            </div> */}
            <div className=" absolute top-0 left-[-1vw]">
              {updatedata && draggerImage === false ? (
                <img
                  // src={previewUrl}
                  // src={currentofferdata.file}
                  src={`http://192.168.90.47:4000${promodata.promo_image}`}
                  className="w-[8.2vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                />
              ) : (
                <img
                  src={previewUrl}
                  className="w-[8.2vw] h-[13vw] bg-white object-cover opacity-50 blur-[0.1vw] rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                />
              )}
            </div>
            {
              (updatedata && draggerImage === false) ?
                <img
                  src={`http://192.168.90.47:4000${promodata.promo_image}`}
                  className="absolute top-[4vw] bg-white left-[0.5vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
                />
                :
                <img
                  src={previewUrl}
                  // src={`http://192.168.90.47:4000${promodata.promo_image}`}
                  className="absolute top-[4vw] bg-white left-[0.5vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
                />

            }


            <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw] py-[0.2vw] absolute top-[1.5vw] left-[8.5vw]">
              <h1 className="text-white  text-[1.2vw]">
                {currentPromodata.promotion_name}
              </h1>
            </div>
            <p className="text-white font-extrabold text-[1vw] pr-[1vw] absolute top-[4.5vw]  left-[9vw]">
              {currentPromodata.promotion_description}
            </p>
            <p className="text-white text-[1vw] absolute top-[8vw] left-[9vw]">
              {`Valid till ${dayjs(
                new Date(currentPromodata.expiry_date)
              ).format("DD MMM")}`}
            </p>
            <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw] py-[0.2vw] absolute top-[10vw] left-[9vw]">
              <p className="text-white font-bold text-[1vw]">
                {userType !== "PRODUCTOWNER"
                  ? userName
                  : currentPromodata.operator_details}
              </p>
            </div>
          </div>

          {
            startIndex + 1 >= currentPromo?.length ?
              (
                <div className="w-[3vw] h-[3vw]"></div>
              )
              :
              (
                <button
                  onClick={nextSlide}
                  disabled={startIndex + 1 >= currentPromo?.length}
                  className="text-[#1F4B7F] font-semibold"
                >
                  <IoIosArrowDropright size={"3vw"} />
                </button>
              )}
        </div>
      ) : (
        <>
          <div className="col-span-1 flex flex-col mt-[1vw]">
            <Dragger
              multiple={false}
              height={"6.5vw"}
              beforeUpload={(file) => {
                setPromolist(file);
                // setFieldValue("file", file);
                setFileName(file.name);
                // setFieldValue("file_type", file.type);
                // setFieldValue("file_size", file.size);
                return false; // Prevent automatic uplo
              }}
              showUploadList={false}
              onChange={(e) => {
                setPromolist(e.file);
                // handleChange({
                //   target: { name: "file", value: e.file },
                // });
              }}
              className="custom-dragger mt-[0.5vw] relative"
              style={{
                backgroundSize: "center",
                backgroundPosition: "center",
                position: "relative",
                //marginTop:"3vw",
              }}
            >
              <label className="flex items-center justify-center">
                <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
                  Drag and Drop
                </p>
                <PiUpload color="#1F4B7F" size={"1.2vw"} />
              </label>
              <div
                className="absolute top-0 left-0 w-full h-full"
              // style={{
              //   backgroundImage: `url(${
              //     adsdata.ad_video
              //       ? `http://192.168.90.47:4000${adsdata.ad_video}`
              //       : `http://192.168.90.47:4000${fileName.ad_video}`
              //   })`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              //   opacity: "30%",
              //   zIndex: 0,
              // }}
              ></div>
            </Dragger>
          </div>
          {fileName && (
            <p className="text-[#1F4B7F] text-[0.8vw]  mt-2">{fileName}</p>
          )}
        </>
      )}
      {currentPromo.length > 0 && (
        <div className="flex items-center justify-between">
          {downloadReq == false ?

            <div className="mt-[1.5vw] text-red-400 text-[1.2vw]"> Download and click next</div> : <div></div>
          }
          <div className="flex gap-[1vw]">
            {uploadBg != true && (
              <>
                <button
                  onClick={downloadImage}
                  className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[1vw] "
                >
                  Download as Image
                </button>
                <button
                  // onClick={downloadImage}
                  onClick={() => (downloadReq == true) ? setUploadBg(true) : ""}
                  className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
                >
                  Next
                </button>
              </>
            )}
          </div>
          <div className="flex gap-[1vw]">
            {uploadBg != false && (
              <>
                <button
                  // onClick={downloadImage}
                  onClick={() => setUploadBg(false)}
                  className="mt-[1.5vw] border border-[#1F487C] text-[1vw] rounded-[0.5vw] text-[#1F487C] py-[0.5vw] px-[2vw] "
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Background_View;
