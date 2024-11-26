// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// // import logo from "../../asserts/Promotion/bus.jpg";
// import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// import dayjs from "dayjs";
// import html2canvas from "html2canvas";
// import card1 from "../../asserts/Promotion/Offer card01.png";
// import card2 from "../../asserts/Promotion/Offer card02.png";
// import card3 from "../../asserts/Promotion/Offer card03.png";
// import card4 from "../../asserts/Promotion/Offer card04.png";
// import card5 from "../../asserts/Promotion/Offer card05.png";
// import card6 from "../../asserts/Promotion/Offer card06.png";
// import card7 from "../../asserts/Promotion/Offer card07.png";
// import card8 from "../../asserts/Promotion/Offer card08.png";
// import card9 from "../../asserts/Promotion/Offer card09.png";
// import card10 from "../../asserts/Promotion/Offer card10.png";
// import { PiUpload } from "react-icons/pi";
// import { useDispatch, useSelector } from "react-redux";
// import { message, Upload } from "antd";
// import {
//   GetPromotionData,
//   SubmitPromotionData,
// } from "../../Api/Promotion/Promotion";
// import { toPng, toJpeg } from "html-to-image";
// import { ErrorMessage, Field } from "formik";

// const Background_View = ({
//   setCurrentPromo,
//   currentPromo,
//   currentPromodata,
//   previewUrl,
//   setBgImage,
//   setPromolist,
//   promolist,
//   setModalIsOpen,
//   updatedata,
//   promotionId,
//   promodata,
//   draggerImage,
// }) => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [startIndex, setStartIndex] = useState(0);
//   console.log(startIndex, "startIndex");
//   const [uploadBg, setUploadBg] = useState(false);
//   const [downloadReq, setDownloadReq] = useState(false);
//   const promo = [
//     card1,
//     card2,
//     card3,
//     card4,
//     card5,
//     card6,
//     card7,
//     card8,
//     card9,
//     card10,
//   ];
//   console.log(promo, "promo_promo");

//   const [fileName, setFileName] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const { Dragger } = Upload;
//   const [userName, setUserName] = useState("");
//   const [userType, setUserType] = useState("");
//   const dispatch = useDispatch();

//   // console.log(draggerImage,"draggerimagesd");

//   const props = {
//     name: "file",
//     multiple: false,
//     action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
//     fileList: fileList, // Manage the file list manually
//     onChange(info) {
//       const { status, name } = info.file;
//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//         console.log(info.file, "filetesting");
//       }
//       if (status === "done") {
//         message.success(`${name} file uploaded successfully.`);
//         setFileList([info.file]); // Set file list to contain only the last uploaded file
//       } else if (status === "error") {
//         message.error(`${name} file upload failed.`);
//       }
//     },
//     beforeUpload(file) {
//       setFileList([file]);
//       return true;
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   useEffect(() => {
//     // const userNameFromSessionStorage = sessionStorage.getItem("user_name");
//     const userNameFromSessionStorage = sessionStorage.getItem("user_name");
//     // const UserType = sessionStorage.getItem("type_name");
//     const UserType = sessionStorage.getItem("type_name");

//     if (UserType) {
//       setUserType(UserType);
//     }
//     if (userNameFromSessionStorage) {
//       setUserName(userNameFromSessionStorage);
//     }
//     console.log(UserType, "UserType");
//   }, []);

//   const prevSlide = () => {
//     const newIndex = Math.max(0, startIndex - 1);
//     setStartIndex(newIndex);
//   };
//   const nextSlide = () => {
//     const newIndex = Math.min(startIndex + 1, currentPromo?.length - 1);
//     setStartIndex(newIndex);
//     console.log(newIndex, "finding_max_limit");
//   };

//   useEffect(() => {
//     GetPromotionData(dispatch);
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       console.log(currentPromodata, "---promo List");
//       console.log(promolist, "----promo bg image");
//       console.log(promotionId, "promotionId");
//       const data = await SubmitPromotionData(
//         promolist,
//         currentPromodata,
//         promotionId,
//         dispatch
//       );
//       toast.success(data?.message);
//       GetPromotionData(dispatch);
//       setBgImage(false);
//       setModalIsOpen(false);
//       console.log(promolist, currentPromodata, "---promo bg image");
//       console.log(data);
//     } catch (error) {
//       console.error("Error uploading data", error);
//     }
//   };

//   const downloadImage = () => {
//     // html2canvas(document.querySelector(".offer-container")).then((canvas) => {
//     //   const link = document.createElement("a");
//     //   link.href = canvas.toDataURL("image/png");
//     //   link.download = "offer-image.png";
//     //   link.click();
//     // });
//     // html2canvas(document.querySelector(".promo-container"), {
//     //   scale: 2, // Increase the resolution of the canvas
//     //   useCORS: true, // Enable cross-origin resource sharing if needed
//     //   onclone: (clonedDoc) => {
//     //     // Ensure fonts are loaded
//     //     const promoContainer = clonedDoc.querySelector(".promo-container");
//     //     promoContainer.style.fontFamily = getComputedStyle(
//     //       document.querySelector(".promo-container")
//     //     ).fontFamily;
//     //   },
//     // }).then((canvas) => {
//     //   const link = document.createElement("a");
//     //   link.href = canvas.toDataURL("image/png");
//     //   link.download = "promo-image.png";
//     //   link.click();
//     // });

//     const element = document.querySelector(".promo-container");
//     setDownloadReq(true);

//     if (element) {
//       toPng(element, { quality: 1.0 }) // Adjust quality if needed
//         .then((dataUrl) => {
//           const link = document.createElement("a");
//           link.href = dataUrl;
//           link.download = "PromotionImage.png";
//           link.click();
//         })
//         .catch((error) => console.error("Error capturing image:", error));
//     }
//   };

//   useEffect(() => {
//     setCurrentPromo(promo);
//   }, []);

//   console.log(currentPromodata, promolist, "occupationvalue");

//   return (
//     <div className="h-full w-full">
//       <div className="flex items-center justify-between mt-[0.3vw]">
//         <h1 className="text-[#1F4B7F] text-[1.5vw] font-bold">
//           Background Image
//         </h1>
//       </div>

//       {currentPromo?.length > 0 && !uploadBg ? (
//         <div className="flex items-center justify-between mt-[1vw]">
//           {/* <button
//             onClick={prevSlide}
//             disabled={startIndex === 0}
//             className="text-[#1F4B7F] font-semibold"
//           >
//             <IoIosArrowDropleft size={"3vw"} />
//           </button> */}
//           {startIndex === 0 ? (
//             <div className="w-[3vw] h-[3vw]"></div>
//           ) : (
//             <button onClick={prevSlide} disabled={startIndex === 0}>
//               <IoIosArrowDropleft size={"3vw"} />
//             </button>
//           )}
//           <div className="flex relative justify-center  items-center space-x-[1vw] promo-container">
//             {/* {currentPromo
//               .slice(startIndex, startIndex + 1)
//               .map((image, index) => (
//                 <img
//                   key={index}
//                   className="h-[13vw] w-[25vw] rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out"
//                   src={image}
//                   alt={`promo ${index}`}
//                 />
//               ))} */}
//   <div className="flex relative justify-center items-center space-x-[1vw] promo-container">
//   {/* {promo.slice(startIndex, startIndex + 3).map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`promo ${index}`}
//                   className={`object-cover rounded-md transition-transform duration-500 ${
//                     index === 1 ? "h-[13vw] w-[20vw]" : "h-[11vw] w-[6vw]"
//                   }`}
//                 />
//               ))} */}
//               {promo.length > 0 && (
//                 <div className="flex space-x-[0.1vw] mx-4 items-center">
//                   {promo
//                     .slice(startIndex, startIndex + 3)
//                     .map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`promo ${index}`}
//                         className={`object-cover rounded-md transition-transform duration-500 ${
//                           index === 1 ? "h-[13vw] w-[20vw]" : "h-[11vw] w-[6vw]"
//                         }`}
//                       />
//                     ))}
//                 </div>
//               )}
//             </div>
//             {/* <div className=" absolute top-0 left-[-1vw]">
//               {(updatedata && draggerImage === false) ?
//                 <img
//                   // src={previewUrl}
//                   src={`http://192.168.90.47:4000${promodata.promo_image}`}
//                   className="w-[8.2vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
//                 />
//                 :
//                 <div className="w-[8.2vw] h-[27.1vh] overflow-hidden relative rounded-tl-[1vw] rounded-bl-[1vw]">
//                   <img
//                     src={previewUrl}
//                     className="w-full h-full object-cover opacity-50 blur-[0.1vw] absolute top-0 left-0"
//                   />
//                 </div>
//               }
//             </div> */}
//             <div className=" absolute top-0 left-[6vw]">
//               {updatedata && draggerImage === false ? (
//                 <img
//                   // src={previewUrl}
//                   // src={currentofferdata.file}
//                   src={`http://192.168.90.47:4000${promodata.promo_image}`}
//                   className="w-[6.5vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
//                 />
//               ) : (
//                 <img
//                   src={previewUrl}
//                   className="w-[6.5vw] h-[13vw] bg-white object-cover opacity-50 blur-[0.1vw] rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
//                 />
//               )}
//             </div>
//             {updatedata && draggerImage === false ? (
//               <img
//                 src={`http://192.168.90.47:4000${promodata.promo_image}`}
//                 className="absolute top-[4.5vw] bg-white left-[7.2vw] w-[4.5vw] h-[4.5vw] rounded-[50%]"
//               />
//             ) : (
//               <img
//                 src={previewUrl}
//                 // src={`http://192.168.90.47:4000${promodata.promo_image}`}
//                 className="absolute top-[4.5vw] bg-white left-[7.1vw] w-[4.5vw] h-[4.5vw] rounded-[50%]"
//               />
//             )}

//             <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw] py-[0.1vw] absolute top-[1vw] left-[13.5vw]">
//               <h1 className="text-white  text-[1.2vw]">
//                 {currentPromodata.promotion_name}
//               </h1>
//             </div>
//             <p className="text-white font-extrabold text-[1vw] pr-[1vw] absolute top-[3.5vw] flex-wrap w-[10vw]  left-[14vw]">
//               {currentPromodata.promotion_description}
//             </p>
//             <p className="text-white text-[1vw] absolute top-[8vw] left-[14vw]">
//               {`Valid till ${dayjs(
//                 new Date(currentPromodata.expiry_date)
//               ).format("DD MMM")}`}
//             </p>
//             <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw] py-[0.2vw] absolute top-[10vw] left-[14vw]">
//               <p className="text-white font-bold text-[1vw]">
//                 {userType !== "PRODUCTOWNER"
//                   ? userName
//                   : currentPromodata.operator_details}
//               </p>
//             </div>
//           </div>

//           {startIndex + 1 >= currentPromo?.length ? (
//             <div className="w-[3vw] h-[3vw]"></div>
//           ) : (
//             <button
//               onClick={nextSlide}
//               disabled={startIndex === currentPromo.length - 1}
//             >
//               <IoIosArrowDropright size={"3vw"} />
//             </button>
//           )}
//         </div>
//       ) : (
//         <>
//           <div className="col-span-1 flex flex-col mt-[1vw]">
//             <Dragger
//               multiple={false}
//               height={"6.5vw"}
//               beforeUpload={(file) => {
//                 setPromolist(file);
//                 // setFieldValue("file", file);
//                 setFileName(file.name);
//                 // setFieldValue("file_type", file.type);
//                 // setFieldValue("file_size", file.size);
//                 return false; // Prevent automatic uplo
//               }}
//               showUploadList={false}
//               onChange={(e) => {
//                 setPromolist(e.file);
//                 // handleChange({
//                 //   target: { name: "file", value: e.file },
//                 // });
//               }}
//               className="custom-dragger mt-[0.5vw] relative"
//               style={{
//                 backgroundSize: "center",
//                 backgroundPosition: "center",
//                 position: "relative",
//                 //marginTop:"3vw",
//               }}
//             >
//               <label className="flex items-center justify-center">
//                 <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                   Drag and Drop
//                 </p>
//                 <PiUpload color="#1F4B7F" size={"1.2vw"} />
//               </label>
//               <div
//                 className="absolute top-0 left-0 w-full h-full"
//                 // style={{
//                 //   backgroundImage: `url(${
//                 //     adsdata.ad_video
//                 //       ? `http://192.168.90.47:4000${adsdata.ad_video}`
//                 //       : `http://192.168.90.47:4000${fileName.ad_video}`
//                 //   })`,
//                 //   backgroundSize: "cover",
//                 //   backgroundPosition: "center",
//                 //   opacity: "30%",
//                 //   zIndex: 0,
//                 // }}
//               ></div>
//             </Dragger>
//           </div>
//           {fileName && (
//             <p className="text-[#1F4B7F] text-[0.8vw]  mt-2">{fileName}</p>
//           )}
//         </>
//       )}
//       {currentPromo.length > 0 && (
//         <div className="flex items-center justify-between mt-[1vw]">
//           {/* {downloadReq == false ? (
//             <div className="mt-[1.5vw] text-red-400 text-[1.2vw]">
//               {" "}
//               Download and click next
//             </div>
//           ) : (
//             <div></div>
//           )} */}
//           {/* <div className="flex gap-[1vw]">
//             {uploadBg != true && (
//               <>
//                 <button
//                   onClick={downloadImage}
//                   className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[1vw] "
//                 >
//                   Download as Image
//                 </button>
//                 <button
//                   // onClick={downloadImage}
//                   onClick={() => (downloadReq == true ? setUploadBg(true) : "")}
//                   className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
//                 >
//                   Next
//                 </button>
//               </>
//             )}
//           </div> */}
//           <div>
//             <input
//               placeholder="Enter Offer Usage Count"
//               className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[20vw] rounded-[0.5vw] outline-none px-[1vw]"
//             />
//           </div>
//           <div>
//             <button
//               onClick={handleSubmit}
//               className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
//             >
//               Submit
//             </button>
//           </div>
//           {/* <div className="flex gap-[1vw]">
//             {uploadBg != false && (
//               <>
//                 <button
//                   // onClick={downloadImage}
//                   onClick={() => setUploadBg(false)}
//                   className="mt-[1.5vw] border border-[#1F487C] text-[1vw] rounded-[0.5vw] text-[#1F487C] py-[0.5vw] px-[2vw] "
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
//                 >
//                   Submit
//                 </button>
//               </>
//             )}
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Background_View;

// // import React, { useState, useEffect } from "react";
// // import card1 from "../../asserts/Promotion/Offer card01.png";
// // import card2 from "../../asserts/Promotion/Offer card02.png";
// // import card3 from "../../asserts/Promotion/Offer card03.png";
// // import card4 from "../../asserts/Promotion/Offer card04.png";
// // import card5 from "../../asserts/Promotion/Offer card05.png";

// // const Background_View = () => {
// //   const [startIndex, setStartIndex] = useState(0);
// //   const promo = [card1, card2, card3, card4, card5];

// //   const nextSlide = () => {
// //     if (startIndex + 1 < promo.length - 2) {
// //       setStartIndex(startIndex + 1);
// //     }
// //   };

// //   const prevSlide = () => {
// //     if (startIndex > 0) {
// //       setStartIndex(startIndex - 1);
// //     }
// //   };

// //   return (
// //     <div className="h-full w-full flex flex-col items-center">
// //       <h1 className="text-blue-700 text-2xl font-bold">Background Image</h1>

// //       <div className="flex items-center mt-4">
// //         {/* Left Arrow */}
// //         <button onClick={prevSlide} disabled={startIndex === 0}>
// //           <IoIosArrowDropleft size="2rem" />
// //         </button>

// //         {/* Image Container */}
// //         <div className="flex space-x-4 mx-4">
// //           {promo.slice(startIndex, startIndex + 5).map((image, index) => (
// //             <img
// //               key={index}
// //               src={image}
// //               alt={`promo ${index}`}
// //               className={`object-cover rounded-md transition-transform duration-500 ${
// //                 index === 1 || index === 2 || index === 3
// //                   ? "h-40 w-60" // Middle 3 images larger
// //                   : "h-32 w-48" // Outer 2 images smaller
// //               }`}
// //             />
// //           ))}
// //         </div>

// //         {/* Right Arrow */}
// //         <button onClick={nextSlide} disabled={startIndex + 5 >= promo.length}>
// //           <IoIosArrowDropright size="2rem" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Background_View;
import React, { useEffect, useRef, useState } from "react";
import "./Background_View.css"; // Make sure to create the CSS file
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
import dayjs from "dayjs";
import { Upload } from "antd";
import { useDispatch } from "react-redux";
import { toPng, toJpeg } from "html-to-image";
import { ErrorMessage, Field } from "formik";
import html2canvas from "html2canvas";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { PROMO_BG_IMAGE } from "../../Store/Type";
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
  SaveFun,
  bgimage,
  setImageData,
  setSample,
  sample,
  setBgPromo
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const { Dragger } = Upload;
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();
  const [downloadReq, setDownloadReq] = useState(false);

  const handleNext = (e) => {
    // e.preventValue();
    setCurrentIndex((currentIndex + 1) % promo.length);
  };

  const handlePrev = (e) => {
    // e.preventValue();
    setCurrentIndex((currentIndex - 1 + promo.length) % promo.length);
  };
  const getSlideClass = (index) => {
    const totalImages = promo.length;

    const position = (index - currentIndex + totalImages) % totalImages;
    console.log(position, "positionpositionposition");

    if (position === 2) return "large-slide";
    if (position === 1 || position === 3) return "medium-slide";
    if (position === 0 || position === 4) return "small-slide";
    return "hidden-slide";
  };
  console.log(currentPromodata, "currentPromodata852963");
  const downloadImage = () => {
    // html2canvas(document.querySelector(".offer-container")).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   link.download = "offer-image.png";
    //   link.click();
    // });
    html2canvas(document.querySelector(".promo-container"), {
      scale: 2, // Increase the resolution of the canvas
      useCORS: true, // Enable cross-origin resource sharing if needed
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded
        const promoContainer = clonedDoc.querySelector(".promo-container");
        promoContainer.style.fontFamily = getComputedStyle(
          document.querySelector(".promo-container")
        ).fontFamily;
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      console.log(link, "linkokjhbvc");

      link.href = canvas.toDataURL("image/png");
      link.download = "promo-image.png";
      link.click();
    });

    const element = document.querySelector(".promo-container");
    setDownloadReq(true);

    if (element) {
      toPng(element, { quality: 1.0 }) // Adjust quality if needed
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "PromotionImage.png";
          link.click();
        })
        .catch((error) => console.error("Error capturing image:", error));
    }
  };
  // useEffect(() => {
  //   downloadImage();
  // }, [currentIndex]);
  const componentRef = useRef(null);

  const exportAsJPEG = () => {
    exportComponentAsJPEG(componentRef, {
      fileName: "myComponent",
      html2CanvasOptions: {
        backgroundColor: "#ffffff", // Customize the background color here if needed
      },
    });
  };

  const exportAsPDF = () => {
    exportComponentAsPDF(componentRef, {
      fileName: "myComponent",
      html2CanvasOptions: {
        backgroundColor: "#ffffff",
      },
      pdfOptions: {
        format: "a4", // Customize PDF options if needed
      },
    });
  };

  const exportAsPNG = () => {
    exportComponentAsPNG(componentRef, {
      fileName: "myComponent",
      html2CanvasOptions: {
        backgroundColor: "#ffffff",
      },
    });
  };

  const [imageFile, setImageFile] = useState(null);

  const handleimageconvert = async () => {
    const promoContainer = document.querySelector(".promo-container");

    if (!promoContainer) {
      console.error("Promo container not found!");
      return;
    }

    try {
      // Convert the container to a canvas
      const canvas = await html2canvas(promoContainer, {
        scale: 2, // Higher resolution
        useCORS: true, // Enable cross-origin resource sharing if needed
      });

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Convert data URL to a Blob
      const blob = await (await fetch(dataUrl)).blob();

      // Create a File object from the Blob
      const file = new File([blob], "promo-image.png", {
        type: "image/png",
        lastModified: new Date().getTime(),
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryData = reader.result;
        console.log("Binary Data:", binaryData);
        // setBinaryImageData(binaryData); // Set binary data in state
      };
      reader.readAsArrayBuffer(blob); // Convert
      console.log(file, "imagecheck"); // For debugging
      setImageFile(file); // Set the File object in state
    } catch (error) {
      console.error("Error converting component to image:", error);
    }
  };

  const tempUrl = URL.createObjectURL(currentPromodata?.file); // Create temporary URL for the image

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div className="carousel" ref={ref}>
      <button className="carousel-button prev" onClick={(e) => handlePrev(e)}>
        <IoIosArrowDropleft size={"3vw"} color="#1F4B7F" />
      </button>
      <div className="carousel-track-container relative ">
        <ul className="carousel-track">
          {promo.map((image, index) => (
            <li
              key={index}
              className={`carousel-slide ${getSlideClass(index)}`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1} {${
                  getSlideClass(index) === "large-slide"
                    ? "promo-container"
                    : ""
                } `}
              />
            </li>
          ))}
        </ul>
        <div className="absolute top-1/2 left-[10.2vw] -translate-y-1/2">
          {updatedata && !draggerImage ? (
            <img
              src={`http://192.168.90.47:4000${promodata.promo_image}`}
              className="w-[6vw] h-[12.5vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          ) : (
            <img
              src={tempUrl}
              className="w-[6vw] h-[12.5vw] bg-white object-cover opacity-50 blur-[0.05vw] rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          )}
        </div>
        {updatedata && !draggerImage ? (
          <img
            src={`http://192.168.90.47:4000${promodata.promo_image}`}
            className="absolute top-1/2 left-[11vw] -translate-y-1/2 w-[4.5vw] h-[4.5vw] bg-white rounded-full"
          />
        ) : (
          <img
            src={tempUrl}
            className="absolute top-1/2 left-[11vw] -translate-y-1/2 w-[4.5vw] h-[4.5vw] bg-white rounded-full"
          />
        )}
        <div className="absolute top-1/2 left-[17.5vw] -translate-y-1/2 gap-y-[0.5vw] flex max-w-[11.5vw] min-w-auto flex-col">
          <div className="bg-white bg-opacity-30 rounded-[2vw] py-[0.2vw]">
            <h1 className="text-white text-[1vw]">
              {currentPromodata.promotion_name}
            </h1>
          </div>
          <p className="text-white font-bold text-[0.9vw] text-left flex-wrap">
            {currentPromodata.promotion_description}
          </p>
          <p className="text-white text-left text-[0.9vw]">
            {`Valid ${dayjs(new Date(currentPromodata.start_date)).format(
              "DD MMM"
            )} - ${dayjs(new Date(currentPromodata.expiry_date)).format(
              "DD MMM"
            )}`}
          </p>
          <div className="bg-white bg-opacity-30 border-dashed rounded-[0.2vw] border-[0.1vw] border-white py-[0.2vw]">
            <p className="text-white font-bold text-[1vw]">
              {currentPromodata.promo_code}
            </p>
          </div>
        </div>
      </div>
      <button className="carousel-button next" onClick={(e) => handleNext(e)}>
        <IoIosArrowDropright size={"3vw"} color="#1F4B7F" />
      </button>
      {/* <button className="carousel-button next" onClick={handleNext}>
        &gt;
      </button>
      <p className="carousel-caption">Choose Background</p>
      <button onClick={exportAsJPEG}>Export As JPEG</button>
      <button onClick={exportAsPDF}>Export As PDF</button>
      <button onClick={exportAsPNG}>Export As PNG</button> */}
    </div>
  ));
  console.log(promolist?.usage, "promolistpromolist");
  console.log(SaveFun, "SaveFun");

  // const saveAsImage = async () => {
  //   if (componentRef.current) {
  //     try {
  //       const dataUrl = await toPng(componentRef.current, { backgroundColor: "#ffffff" });
  //       setImageData(dataUrl); // Save the image data URL to state
  //       console.log(dataUrl,"Image saved in state!");
  //       sessionStorage.setItem("promo_bg",dataUrl)
  //     } catch (error) {
  //       console.error("Error generating image:", error);
  //     }
  //   }
  // };
  const saveAsImage = async () => {
    if (componentRef.current) {
      try {
        // Generate the image data URL
        const dataUrl = await toPng(componentRef.current, {
          backgroundColor: "#ffffff",
        });

        // Convert the data URL to a Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Create a File object
        const fileName = "pencilicon.png"; // You can customize the file name
        const fileObject = new File([blob], fileName, {
          type: "image/png",
          lastModified: Date.now(),
        });

        // Save the File object in state
        setImageData(fileObject);
        dispatch({
          type: PROMO_BG_IMAGE,
          payload: fileObject,
        });
        console.log(fileObject.name, "fileObject7965413");
        sessionStorage.setItem("promo_bg_name", fileObject.name);
        // sessionStorage.setItem("promo_bg", JSON.stringify(fileObject));
        sessionStorage.setItem("promo_bg", fileObject);

        setPromolist({
          ...promolist,
          background_image: "hello",
        });
        setBgPromo(fileObject)
        setSample("test");
        console.log("File saved in state:", fileObject);
      } catch (error) {
        console.error("Error generating file:", error);
      }
    }
  };
  useEffect(() => {
    if (SaveFun) {
      saveAsImage();
    }
  }, [SaveFun]);
  // console.log(imageData, "imageFileimageFile");
  // const storedFileData = sessionStorage.getItem("promo_bg");
  // console.log(storedFileData,"storedFileData");
  
  // if (storedFileData) {
  //   const { name, lastModified, type, size } = JSON.parse(storedFileData);

  //   // Create a new File object
  //   const reconstructedFile = new File([], name, { type, lastModified });
  //   console.log(reconstructedFile,"reconstructedFile");
  // }
  return (
    <>
      <div className="px-[0.5vw]">
        <div className="mt-[1vw]">
          <label className="text-[#1F4B7F] text-[1.1vw] font-bold ">
            Usage
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
            <span className="text-[#909193] text-[0.8vw] pl-[0.25vw]">
              {`(member count)`}
            </span>
          </label>
        </div>
        <input
          placeholder="Enter Usage Count"
          className="border-r-[0.25vw] mt-[0.2vw] border-l-[0.05vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
          onChange={(e) =>
            setPromolist({
              ...promolist,
              usage: e.target.value,
            })
          }
          value={promolist.usage}
        />
        <div className="mt-[4vw]">
          <ComponentToPrint ref={componentRef} />
        </div>
      </div>
    </>
  );
};

export default Background_View;
