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
//import { Upload } from "antd";
//import { useDispatch } from "react-redux";
import { FaCloudDownloadAlt } from "react-icons/fa";
import {
  toPng,
  //toJpeg
} from "html-to-image";
// import { ErrorMessage, Field } from "formik";
//import html2canvas from "html2canvas";
//import { RiDownload2Fill } from "react-icons/ri";
import {
  // exportComponentAsJPEG,
  // exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// import { PROMO_BG_IMAGE } from "../../Store/Type";
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext,
// } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Background_View = ({
  setCurrentPromo,
  currentPromo,
  // promo,
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
  setBgPromo,
  onImageConversionComplete,
  setPromoBackground,
  currentPromodata,
  usageError,
  setUsageError,
  handleChange,
  setFieldValue,
}) => {
  // const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  // const [currentIndex, setCurrentIndex] = useState(0);
  //const [fileName, setFileName] = useState("");
  //const [fileList, setFileList] = useState([]);
  //const { Dragger } = Upload;
  //const [userName, setUserName] = useState("");
  //const [userType, setUserType] = useState("");
  //const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  //const [downloadReq, setDownloadReq] = useState(false);
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

  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, promo?.length - 1);
    setStartIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };

  //const [currentIndex, setCurrentIndex] = useState(2); // Start at 3rd slide (middle)
  // const visibleSlides = 5; // Number of slides visible at once

  // const getSlideClass = (index) => {
  //   const position = (index - currentIndex + promo.length) % promo.length;

  //   if (position === 2) return "large-slide"; // Middle slide (large)
  //   if (position === 1 || position === 3) return "medium-slide"; // Adjacent slides (medium)
  //   if (position === 0 || position === 4) return "small-slide"; // Outer slides (small)
  //   return "hidden-slide"; // Other slides (hidden)
  // };

  const componentRef = useRef(null);

  const exportAsPNG = () => {
    exportComponentAsPNG(componentRef, {
      fileName: "myComponent",
      html2CanvasOptions: {
        backgroundColor: "#ffffff",
      },
    });
  };

  //const [imageFile, setImageFile] = useState(null);

  //const [convertedImage, setConvertedImage] = useState(null);
  const containerRef = useRef(null); // Ref for the entire container
  //const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide

  // Simulate image conversion
  const [isCapturing, setIsCapturing] = useState(false);

  const waitForImagesToLoad = (container) => {
    const images = Array.from(container.querySelectorAll("img"));
    const promises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    );
    return Promise.all(promises);
  };

  const convertImage = async () => {
    try {
      if (!containerRef.current) {
        console.error("Container not found");
        return;
      }

      setIsCapturing(true);

      // Wait for images to load before capturing
      await waitForImagesToLoad(containerRef.current);

      // Get the bounding box of the container (content area)
      const boundingBox = containerRef.current.getBoundingClientRect();

      // Capture only the visible area of the container
      const dataUrl = await toPng(containerRef.current, {
        width: boundingBox.width, // Capture only the content width
        height: boundingBox.height, // Capture only the content height
        style: {
          position: "absolute",
          top: "0px", // Ensure proper alignment
          left: "0px", // Ensure proper alignment
          margin: "0px",
        },
      });

      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a File object from the Blob
      const fileName = `captured_slide_${startIndex + 1}.png`;
      const file = new File([blob], fileName, {
        type: "image/png",
        lastModified: Date.now(),
      });

      // Set the File object in the state
      setPromolist((prev) => ({ ...prev, background_image: file }));
      setPromoBackground(file);

      console.log("File Object:", file);

      setIsCapturing(false);
      onImageConversionComplete();
    } catch (error) {
      console.error("Error converting image", error);
      setIsCapturing(false);
    }
  };

  const downloadImage = async () => {
    try {
      if (!containerRef.current) {
        console.error("Container not found");
        return;
      }

      setIsCapturing(true);

      // Wait for images to load
      await waitForImagesToLoad(containerRef.current);

      // Convert container to PNG
      const dataUrl = await toPng(containerRef.current, { quality: 1.0 });

      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "OffersImage.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsCapturing(false);
    } catch (error) {
      console.error("Error capturing image:", error);
      setIsCapturing(false);
    }
  };

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div className="flex items-center justify-between mt-[1vw]">
      {/* <button
      onClick={prevSlide}
      disabled={startIndex === 0}
      className="text-[#1F4B7F] font-semibold"
    >
      <IoIosArrowDropleft size={"3vw"} />
    </button> */}
      {startIndex === 0 ? (
        <div className="w-[3vw] h-[3vw]"></div>
      ) : (
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className="text-[#1F4B7F] font-semibold"
        >
          <IoIosArrowDropleft size={"3vw"} />
        </button>
      )}
      <div
        className="flex relative justify-center  items-center space-x-0 promo-container "
        style={{ display: "inline-block" }} // Ensure content fits perfectly
        ref={containerRef}
      >
        {promo?.slice(startIndex, startIndex + 1).map((image, index) => (
          <img
            key={index}
            className="h-[13vw] w-auto  rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out"
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
        <div className=" absolute top-0 left-[0vw]">
          {updatedata && draggerImage === false ? (
            <img
              // src={previewUrl}
              // src={currentofferdata.file}
              alt="promoimage"
              src={`http://192.168.90.47:4000${currentPromodata?.file}`}
              className="w-[7.7vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          ) : (
            <img
              alt="promoimage"
              src={URL.createObjectURL(currentPromodata?.file)}
              className="w-[7.7vw] h-[13vw] bg-white object-cover opacity-50 blur-[0.1vw] rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          )}
        </div>
        {updatedata && draggerImage === false ? (
          <img
            alt="promoimage"
            src={`http://192.168.90.47:4000${currentPromodata?.file}`}
            className="absolute top-[4vw] bg-white left-[1vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
          />
        ) : (
          <img
            alt="promoimage"
            src={URL.createObjectURL(currentPromodata?.file)}
            // src={`http://192.168.90.47:4000${promodata.promo_image}`}
            className="absolute top-[4vw] bg-white left-[1vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
          />
        )}

        <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw] mr-[0.4vw] py-[0.2vw] absolute top-[1vw] left-[9.3vw]">
          <h1 className="text-white text-[1.2vw] font-extrabold">
            {currentPromodata?.promotion_name}
          </h1>
        </div>
        <p className="text-white font-semibold flex flex-wrap text-[1vw] pr-[0.5vw] absolute top-[4.2vw] left-[9.5vw]">
          {currentPromodata?.promotion_description}
        </p>
        <p className="text-white text-[1vw] absolute top-[8vw] left-[9.5vw]">
          {`Valid till ${dayjs(new Date(currentPromodata?.expiry_date)).format(
            "DD MMM"
          )}`}
        </p>
        <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw] py-[0.2vw] absolute top-[10vw] left-[9.5vw]">
          <p className="text-white text-[1vw] font-extrabold">
            {currentPromodata.promo_code}
          </p>
        </div>
      </div>

      {startIndex + 1 >= promo?.length ? (
        <div className="w-[3vw] h-[3vw]"></div>
      ) : (
        <button
          onClick={nextSlide}
          disabled={startIndex + 1 >= promo?.length}
          className="text-[#1F4B7F] font-semibold"
        >
          <IoIosArrowDropright size={"3vw"} />
        </button>
      )}
    </div>
  ));

  useEffect(() => {
    convertImage();
  }, [startIndex]);

  return (
    <>
      <div className="relative px-[0.5vw]">
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
          onChange={(e) => {
            const value = e.target.value;
            // Check if the value is a number and between 1 and 100
            if (/^\d*$/.test(value)) {
              if (
                value === "" ||
                (Number(value) >= 1 && Number(value) <= 100)
              ) {
                setPromolist({
                  ...promolist,
                  usage: value,
                });
                setFieldValue("usage", value);
                setUsageError(""); // Clear the error if valid
              } else {
                setUsageError("Usage must be between 1 and 100");
              }
            } else {
              setUsageError("Only numbers are allowed");
            }
          }}
          value={promolist.usage}
        />
        {usageError && (
          <p className="text-[0.8vw]" style={{ color: "red" }}>
            {usageError}
          </p>
        )}
        <div className="mt-[4vw]">
          <ComponentToPrint ref={containerRef} />
        </div>
        {/* <button type="button" onClick={downloadImage}>Donload</button>  */}
        <div className="flex absolute top-[-3.65vw] cursor-pointer left-[24.75vw]">
          <FaCloudDownloadAlt
            onClick={downloadImage}
            className="pt-[0.1vw]"
            size={"2.5vw"}
            color="#1F4B7F"
          />
        </div>
      </div>
    </>
  );
};

export default Background_View;
