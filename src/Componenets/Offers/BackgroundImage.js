import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import { useRef } from "react";
import rasterizeHTML from "rasterizehtml";
import logo from "../../asserts/bus.jpg";
import { toPng, toJpeg } from "html-to-image";
import { FaCloudDownloadAlt } from "react-icons/fa";
// business
import business1 from "../../asserts/Offers/Business/Business01.png";
import business2 from "../../asserts/Offers/Business/Business02.png";
import business3 from "../../asserts/Offers/Business/Business03.png";
import business4 from "../../asserts/Offers/Business/Business04.png";
import business5 from "../../asserts/Offers/Business/Business05.png";
import business6 from "../../asserts/Offers/Business/Business06.png";
import business7 from "../../asserts/Offers/Business/Business07.png";
import business8 from "../../asserts/Offers/Business/Business08.png";
import business9 from "../../asserts/Offers/Business/Business09.png";
import business10 from "../../asserts/Offers/Business/Business10.png";
// Genaral Public
import general_public1 from "../../asserts/Offers/General public/General public01.png";
import general_public2 from "../../asserts/Offers/General public/General public02.png";
import general_public3 from "../../asserts/Offers/General public/General public03.png";
import general_public4 from "../../asserts/Offers/General public/General public04.png";
import general_public5 from "../../asserts/Offers/General public/General public05.png";
import general_public6 from "../../asserts/Offers/General public/General public06.png";
import general_public7 from "../../asserts/Offers/General public/General public07.png";
import general_public8 from "../../asserts/Offers/General public/General public08.png";
import general_public9 from "../../asserts/Offers/General public/General public09.png";
import general_public10 from "../../asserts/Offers/General public/General public10.png";
/// handicapped
import handicapped1 from "../../asserts/Offers/Handicapped/Handicapped01.png";
import handicapped2 from "../../asserts/Offers/Handicapped/Handicapped02.png";
import handicapped3 from "../../asserts/Offers/Handicapped/Handicapped03.png";
import handicapped4 from "../../asserts/Offers/Handicapped/Handicapped04.png";
import handicapped5 from "../../asserts/Offers/Handicapped/Handicapped05.png";
import handicapped6 from "../../asserts/Offers/Handicapped/Handicapped06.png";
import handicapped7 from "../../asserts/Offers/Handicapped/Handicapped07.png";
import handicapped8 from "../../asserts/Offers/Handicapped/Handicapped08.png";
import handicapped9 from "../../asserts/Offers/Handicapped/Handicapped09.png";
import handicapped10 from "../../asserts/Offers/Handicapped/Handicapped10.png";
//pilgrim
import pilgrim1 from "../../asserts/Offers/pilgrim/pilgrim 01.png";
import pilgrim2 from "../../asserts/Offers/pilgrim/pilgrim 02.png";
import pilgrim3 from "../../asserts/Offers/pilgrim/pilgrim 03.png";
import pilgrim4 from "../../asserts/Offers/pilgrim/pilgrim 04.png";
import pilgrim5 from "../../asserts/Offers/pilgrim/pilgrim 05.png";
import pilgrim6 from "../../asserts/Offers/pilgrim/pilgrim 06.png";
import pilgrim7 from "../../asserts/Offers/pilgrim/pilgrim 07.png";
import pilgrim8 from "../../asserts/Offers/pilgrim/pilgrim 08.png";
import pilgrim9 from "../../asserts/Offers/pilgrim/pilgrim 09.png";
import pilgrim10 from "../../asserts/Offers/pilgrim/pilgrim 10.png";
// senior citizon
import senior_citizen1 from "../../asserts/Offers/Senior Citizons/Senior citizens01.png";
import senior_citizen2 from "../../asserts/Offers/Senior Citizons/Senior citizens02.png";
import senior_citizen3 from "../../asserts/Offers/Senior Citizons/Senior citizens03.png";
import senior_citizen4 from "../../asserts/Offers/Senior Citizons/Senior citizens04.png";
import senior_citizen5 from "../../asserts/Offers/Senior Citizons/Senior citizens05.png";
import senior_citizen6 from "../../asserts/Offers/Senior Citizons/Senior citizens06.png";
import senior_citizen7 from "../../asserts/Offers/Senior Citizons/Senior citizens07.png";
import senior_citizen8 from "../../asserts/Offers/Senior Citizons/Senior citizens08.png";
import senior_citizen9 from "../../asserts/Offers/Senior Citizons/Senior citizens09.png";
import senior_citizen10 from "../../asserts/Offers/Senior Citizons/Senior citizens10.png";
// students
import student1 from "../../asserts/Offers/Students/students01.png";
import student2 from "../../asserts/Offers/Students/students02.png";
import student3 from "../../asserts/Offers/Students/students03.png";
import student4 from "../../asserts/Offers/Students/students04.png";
import student5 from "../../asserts/Offers/Students/students05.png";
import student6 from "../../asserts/Offers/Students/students06.png";
import student7 from "../../asserts/Offers/Students/students07.png";
import student8 from "../../asserts/Offers/Students/students08.png";
import student9 from "../../asserts/Offers/Students/students09.png";
import student10 from "../../asserts/Offers/Students/students10.png";
// tourists
import tourist1 from "../../asserts/Offers/Tourists/Tourists01.png";
import tourist2 from "../../asserts/Offers/Tourists/Tourists02.png";
import tourist3 from "../../asserts/Offers/Tourists/Tourists03.png";
import tourist4 from "../../asserts/Offers/Tourists/Tourists04.png";
import tourist5 from "../../asserts/Offers/Tourists/Tourists05.png";
import tourist6 from "../../asserts/Offers/Tourists/Tourists06.png";
import tourist7 from "../../asserts/Offers/Tourists/Tourists07.png";
import tourist8 from "../../asserts/Offers/Tourists/Tourists08.png";
import tourist9 from "../../asserts/Offers/Tourists/Tourists09.png";
import tourist10 from "../../asserts/Offers/Tourists/Tourists10.png";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { GetOffersData, SubmitOffersData } from "../../Api/Offers/Offers";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "./swipper.css";
import {
  GetRedeemOffersData,
  SubmitRedeemOffersData,
} from "../../Api/Offers/RedeemOffers";
import "swiper/css/navigation";

export default function BackgroundView({
  occupationvalue,
  setOccupationValue,
  setCurrentOfferdata,
  setCurrentOffer,
  currentoffers,
  currentofferdata,
  previewUrl,
  setOfferlist,
  offerlist,
  setModalIsOpen,
  allvalues,
  setBgImage,
  updatedata,
  offerdata,
  draggerImage,
  offerType,
  onImageConversionComplete,
  setOfferBackground,
  error,
  setError,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  console.log(offerlist, "usage_offer");
  console.log(draggerImage, "draggerImage_background");
  // const [startIndex, setStartIndex] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  console.log(offerdata, "uuupppddddaatteeee");
  const [showDialog, setShowDialog] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const business = [
    business1,
    business2,
    business3,
    business4,
    business5,
    business6,
    business7,
    business8,
    business9,
    business10,
  ];
  const general_public = [
    general_public1,
    general_public2,
    general_public3,
    general_public4,
    general_public5,
    general_public6,
    general_public7,
    general_public8,
    general_public9,
    general_public10,
  ];
  const handicapped = [
    handicapped1,
    // handicapped2,
    // handicapped3,
    // handicapped4,
    // handicapped5,
    handicapped6,
    handicapped7,
    handicapped8,
    handicapped9,
    handicapped10,
  ];
  const pilgrim = [
    pilgrim1,
    pilgrim2,
    pilgrim3,
    // pilgrim4,
    // pilgrim5,
    // pilgrim6,
    // pilgrim7,
    pilgrim8,
    pilgrim9,
    pilgrim10,
  ];
  const senior_citizen = [
    senior_citizen1,
    senior_citizen2,
    senior_citizen3,
    senior_citizen4,
    senior_citizen5,
    senior_citizen6,
    senior_citizen7,
    senior_citizen8,
    senior_citizen9,
    senior_citizen10,
  ];
  const students = [
    student1,
    student2,
    student3,
    student4,
    student5,
    student6,
    student7,
    student8,
    student9,
    student10,
  ];
  const tourist = [
    tourist1,
    tourist2,
    tourist3,
    // tourist4,
    // tourist5,
    // tourist6,
    // tourist7,
    // tourist8,
    // tourist9,
    // tourist10,
  ];

  const nextSlide = () => {
    if (startIndex + 1 < currentoffers.length) {
      setStartIndex(startIndex + 1);
      rotateCarousel("next");
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      rotateCarousel("prev");
    }
  };

  const rotateCarousel = (direction) => {
    let newAngle = rotateAngle + (direction === "next" ? -30 : 30);
    if (newAngle <= -360) newAngle = 0;
    if (newAngle >= 360) newAngle = 0;
    setRotateAngle(newAngle);
  };

  useEffect(() => {
    if (offerlist.occupation == 1) {
      setCurrentOffer(business);
    } else if (offerlist.occupation == 2) {
      setCurrentOffer(general_public);
    } else if (offerlist.occupation == 3) {
      setCurrentOffer(handicapped);
    } else if (offerlist.occupation == 4) {
      setCurrentOffer(pilgrim);
    } else if (offerlist.occupation == 5) {
      setCurrentOffer(senior_citizen);
    } else if (offerlist.occupation == 6) {
      setCurrentOffer(students);
    } else if (offerlist.occupation == 7) {
      setCurrentOffer(tourist);
    } else {
      setCurrentOffer("");
    }
  }, [offerlist.occupation]);
  const [downloadReq, setDownloadReq] = useState(false);
  const offerContainerRef = useRef(null);
  const offerRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);

  const [convertedImage, setConvertedImage] = useState(null);
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      setOfferlist((prev) => ({ ...prev, background_image: file }));
      setOfferBackground(file);

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

  useEffect(() => {
    convertImage();
    // downloadImage();
  }, [startIndex]);

  // const tempUrl = promo?.file && URL.createObjectURL(promo?.file); // Create temporary URL for the image
  // console.log(tempUrl, "tempUrltempUrl");

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div className="flex items-center justify-between mt-[1vw]">
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
        className="flex relative justify-center  items-center space-x-0 offer-container "
        style={{ display: "inline-block" }} // Ensure content fits perfectly
        ref={containerRef}
      >
        {currentoffers
          ?.slice(startIndex, startIndex + 1)
          .map((image, index) => (
            <img
              key={index}
              className="h-[13vw] w-auto  rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out"
              src={image}
              alt={`Offer ${index}`}
            />
          ))}
        <div className=" absolute top-0 left-[-1vw]"></div>
        <div className=" absolute top-0 left-[0vw]">
          {updatedata && draggerImage === false ? (
            <img
              src={`http://192.168.90.47:4000${offerdata?.offer_img}`}
              className="w-[7.5vw] h-[13vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          ) : (
            <img
              src={previewUrl}
              className="w-[7.5vw] h-[13vw] bg-white object-cover  opacity-50 blur-[0.1vw] rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
            />
          )}
        </div>
        {updatedata && draggerImage === false ? (
          <img
            src={`http://192.168.90.47:4000${offerdata?.offer_img}`}
            className="absolute top-[4vw] bg-white left-[1vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
          />
        ) : (
          <img
            src={previewUrl}
            className="absolute top-[4vw] bg-white left-[1vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
          />
        )}
        <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw]  py-[0.2vw] absolute top-[1vw] left-[9vw]">
          <h1 className="text-white  text-[1.2vw]">
            {currentofferdata.offer_name}
          </h1>
        </div>
        {/* <div className="border-l-[.2vw] h-[13vw] border-dashed absolute top-[0vw] left-[7.6vw] border-white"></div> */}
        <p className="text-white font-extrabold text-[1vw]  absolute top-[4vw] left-[9vw]">
          {currentofferdata.offer_desc}
        </p>
        <p className="text-white  text-[1vw]  absolute top-[8vw] left-[9vw]">{`Valid till ${dayjs(
          new Date(currentofferdata.expiry_date)
        ).format("DD MMM")}`}</p>
        <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw]  py-[0.2vw] absolute top-[10vw] left-[9vw]">
          <p className="text-white font-bold text-[1vw]">
            {currentofferdata?.code?.toUpperCase()}
          </p>
        </div>
      </div>

      {startIndex + 1 >= currentoffers?.length ? (
        <div className="w-[3vw] h-[3vw]"></div>
      ) : (
        <button
          onClick={nextSlide}
          disabled={startIndex + 1 >= currentoffers?.length}
          className="text-[#1F4B7F] font-semibold"
        >
          <IoIosArrowDropright size={"3vw"} />
        </button>
      )}
    </div>
  ));

  return (
    <div className="px-[0.5vw] relative ">
      <div className="mt-[1vw]">
        <label className="text-[#1F4B7F] text-[1.1vw] font-bold ">
          Usage
          <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
          <span className="text-[#909193] text-[0.8vw] pl-[0.25vw]">
            {`(member count)`}
          </span>
        </label>
      </div>
      <div className="relative">
        <input
          placeholder="Enter Usage Count"
          className="border-r-[0.25vw] mt-[0.2vw] border-l-[0.05vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
          onChange={(e) => {
            setOfferlist({
              ...offerlist,
              usage: e.target.value,
            });
            setError("");
          }}
          value={offerlist.usage || ""}
        />
        {error && error.includes("Usage") && (
          <p className="absolute bottom-[-1.2vw] text-[0.8vw] text-red-500">
            {error}
          </p>
        )}
      </div>
      <div className="mt-[4vw] ">
        <ComponentToPrint ref={containerRef} />
      </div>
      <div
        className="cursor-pointer absolute top-[-3.75vw] right-[15.5vw] z-10"
        onClick={downloadImage}
      >
        <FaCloudDownloadAlt size="3vw" color="#1F487C" />
      </div>
    </div>
  );
}
