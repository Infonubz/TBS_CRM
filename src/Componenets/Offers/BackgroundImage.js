import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import { useRef } from "react";
import rasterizeHTML from "rasterizehtml";
import logo from "../../asserts/bus.jpg";
import { toPng, toJpeg } from "html-to-image";
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


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import './swipper.css'
import { GetRedeemOffersData, SubmitRedeemOffersData } from "../../Api/Offers/RedeemOffers";
import 'swiper/css/navigation'

const BackgroundView = ({
  occupationvalue,
  setOccupationValue,
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
  offerType
}) => {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

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
    handicapped2,
    handicapped3,
    handicapped4,
    handicapped5,
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
    pilgrim4,
    pilgrim5,
    pilgrim6,
    pilgrim7,
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
    tourist4,
    tourist5,
    tourist6,
    tourist7,
    tourist8,
    tourist9,
    tourist10,
  ];
  // const prevSlide = () => {
  //   const newIndex = Math.max(0, startIndex - 1);
  //   setStartIndex(newIndex);
  // };
  // const nextSlide = () => {
  //   const newIndex = Math.min(startIndex + 1, currentoffers.length - 1);
  //   setStartIndex(newIndex);
  // };

  const nextSlide = () => {
    if (startIndex + 1 < currentoffers.length) {
      setStartIndex(startIndex + 1);
      rotateCarousel('next');
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      rotateCarousel('prev');
    }
  };

  const rotateCarousel = (direction) => {
    let newAngle = rotateAngle + (direction === 'next' ? -30 : 30); // Rotate by 30 degrees per slide
    if (newAngle <= -360) newAngle = 0; // Reset angle if it goes below -360
    if (newAngle >= 360) newAngle = 0; // Reset angle if it goes above 360
    setRotateAngle(newAngle); // Update the rotation angle state
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

  // const downloadImage = () => {
  //   const element = document.querySelector(".offer-container");
  //   setDownloadReq(true);

  //   //*********dom to image quality 60 % */

  //   // if (element) {
  //   //   domtoimage.toPng(element, { bgcolor: '#ffffff' ,quality: 1.0 }) // Use bgcolor to avoid transparency issues
  //   //     .then((dataUrl) => {
  //   //       const link = document.createElement('a');
  //   //       link.href = dataUrl;
  //   //       link.download = 'capture.png';
  //   //       link.click();
  //   //     })
  //   //     .catch((error) => console.error('Error capturing image:', error));
  //   // }

  //   //***********html2canva************** */

  //   // if (element) {
  //   //   html2canvas(element, { scale: 2 }) // Increase scale for better resolution
  //   //     .then((canvas) => {
  //   //       const link = document.createElement('a');
  //   //       link.href = canvas.toDataURL('image/png');
  //   //       link.download = 'capture.png';
  //   //       link.click();
  //   //     });
  //   // }

  //   //********************to png************************ */

  //   if (element) {
  //     toPng(element, { quality: 1.0 }) // Adjust quality if needed
  //       .then((dataUrl) => {
  //         const link = document.createElement("a");
  //         link.href = dataUrl;
  //         link.download = "OfferImage.png";
  //         link.click();
  //       })
  //       .catch((error) => console.error("Error capturing image:", error));
  //   }

  //   // if (element) {
  //   //   toJpeg(element, { quality: 1.0 }) // Adjust quality (0.0 to 1.0, where 1.0 is highest)
  //   //     .then((dataUrl) => {
  //   //       const link = document.createElement('a');
  //   //       link.href = dataUrl;
  //   //       link.download = 'capture.jpeg'; // Change the file extension to .jpeg
  //   //       link.click();
  //   //     })
  //   //     .catch((error) => console.error('Error capturing image:', error));
  //   // }

  //   // if (element) {
  //   //   // Create a new canvas with higher resolution
  //   //   const scale = 2; // Scale factor for higher resolution
  //   //   const originalWidth = element.offsetWidth;
  //   //   const originalHeight = element.offsetHeight;

  //   //   // Set a higher resolution for the canvas
  //   //   const canvas = document.createElement('canvas');
  //   //   canvas.width = originalWidth * scale;
  //   //   canvas.height = originalHeight * scale;
  //   //   const context = canvas.getContext('2d');
  //   //   context.scale(scale, scale);

  //   //   // Capture the image using the higher-resolution canvas
  //   //   toJpeg(element, {
  //   //     canvas: canvas,
  //   //     quality: 0.9 // Set quality (0.0 to 1.0, where 1.0 is highest)
  //   //   })
  //   //   .then((dataUrl) => {
  //   //     const link = document.createElement('a');
  //   //     link.href = dataUrl;
  //   //     link.download = 'capture.jpeg'; // Change extension to .jpeg
  //   //     link.click();
  //   //   })
  //   //   .catch((error) => console.error('Error capturing image:', error));
  //   // }

  //   // html2canvas(document.querySelector(".offer-container")).then((canvas) => {
  //   //   const link = document.createElement("a");
  //   //   link.href = canvas.toDataURL("image/png");
  //   //   link.download = "offer-image.png";
  //   //   link.click();
  //   // });

  //   // html2canvas(document.querySelector(".offer-container"), {
  //   //   scale: 2, // Increase the resolution of the canvas
  //   //   useCORS: true, // Enable cross-origin resource sharing if needed
  //   //   onclone: (clonedDoc) => {
  //   //     // Ensure fonts are loaded
  //   //     const offerContainer = clonedDoc.querySelector(".offer-container");
  //   //     offerContainer.style.fontFamily = getComputedStyle(
  //   //       document.querySelector(".offer-container")
  //   //     ).fontFamily;
  //   //   },
  //   // }).then((canvas) => {
  //   //   const link = document.createElement("a");
  //   //   link.href = canvas.toDataURL("image/png");
  //   //   link.download = "offer-image.png";
  //   //   link.click();
  //   // });

  //   // html2canvas(document.querySelector(".offer-container"), {
  //   //   scale: 2, // Increase the resolution of the canvas
  //   //   useCORS: true, // Enable cross-origin resource sharing if needed
  //   //   onclone: (clonedDoc) => {
  //   //     const offerContainer = clonedDoc.querySelector(".offer-container");
  //   //     const originalStyles = getComputedStyle(document.querySelector(".offer-container"));

  //   //     // Apply the same styles to the cloned document
  //   //     offerContainer.style.fontFamily = originalStyles.fontFamily;
  //   //     offerContainer.style.fontSize = originalStyles.fontSize;
  //   //     offerContainer.style.lineHeight = originalStyles.lineHeight;
  //   //     offerContainer.style.textAlign = originalStyles.textAlign;
  //   //     offerContainer.style.margin = originalStyles.margin; // Add margin
  //   //     offerContainer.style.padding = originalStyles.padding; // Add padding
  //   //     offerContainer.style.boxSizing = originalStyles.boxSizing; // Add box-sizing
  //   //     offerContainer.style.position = originalStyles.position; // Ensure position is included
  //   //     offerContainer.style.top = originalStyles.top; // Ensure top is included
  //   //     offerContainer.style.left = originalStyles.left; // Ensure left is included
  //   //     offerContainer.style.transform = originalStyles.transform; // Add transform if applicable
  //   //     offerContainer.style.marginTop = (parseFloat(originalStyles.marginTop) + 0.5) + 'vw';
  //   //   },
  //   // }).then((canvas) => {
  //   //   const link = document.createElement("a");
  //   //   link.href = canvas.toDataURL("image/png");
  //   //   link.download = "offer-image.png";
  //   //   link.click();
  //   // });

  //   //********************Dom to Image Package ************************* */

  //   //   if (offerContainerRef.current) {
  //   //     domtoimage.toPng(offerContainerRef.current, {
  //   //       bgcolor: 'white', // Background color (adjust as needed)
  //   //       quality: 1, // Image quality
  //   //       style: {
  //   //         fontFamily: getComputedStyle(offerContainerRef.current).fontFamily, // Ensure correct font
  //   //       },
  //   //       scale: 10
  //   //     })
  //   //     .then((dataUrl) => {
  //   //       const link = document.createElement('a');
  //   //       link.href = dataUrl;
  //   //       link.download = 'offer-image.png';
  //   //       link.click();
  //   //     })
  //   //     .catch((error) => {
  //   //       console.error('Error generating image:', error);
  //   //     });
  //   //   }
  //   // };

  //   //********************Dom to Image Package ************************* */

  //   // if (offerRef.current) {
  //   //   // Define scale factor to improve image quality
  //   //   const scaleFactor = 2; // Increase this for higher resolution

  //   //   // Calculate width and height based on scale factor
  //   //   const width = offerRef.current.offsetWidth * scaleFactor;
  //   //   const height = offerRef.current.offsetHeight * scaleFactor;

  //   //   rasterizeHTML.drawHTML(offerRef.current.outerHTML, {
  //   //     windowWidth: width,
  //   //     windowHeight: height,
  //   //     // Additional options if necessary
  //   //   }).then(function (renderResult) {
  //   //     // Create a new canvas to apply higher DPI
  //   //     const highDpiCanvas = document.createElement('canvas');
  //   //     const context = highDpiCanvas.getContext('2d');
  //   //     highDpiCanvas.width = width;
  //   //     highDpiCanvas.height = height;
  //   //     context.scale(scaleFactor, scaleFactor);
  //   //     context.drawImage(renderResult.image, 0, 0);

  //   //     // Create download link and trigger download
  //   //     const link = document.createElement("a");
  //   //     link.href = highDpiCanvas.toDataURL("image/png");
  //   //     link.download = "offer-image.png";
  //   //     link.click();
  //   //   }).catch(function (error) {
  //   //     console.error("Error rasterizing HTML:", error);
  //   //   });
  //   // }
  // };

  // const downloadImage = async() => {
  //   const element = document.getElementById('.offer-container'),
  //   canvas = await html2canvas(element),
  //   data = canvas.toDataURL('image/jpg'),
  //   link = document.createElement('a');
  //   link.href = data;
  //   link.download = 'downloaded-image.jpg';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  const [uploadimage, setUploadImage] = useState(false);

  console.log(currentofferdata, "occupationvalue");
  const handleupload = (file) => {
    setOfferlist({
      ...offerlist,
      offer_bgImgae: file,
    });
  };
  const handleonSubmit = () => {
    setModalIsOpen(false);
  };
  const dispatch = useDispatch();

  const [usage, setUsage] = useState(offerdata.usage || '')

  const offerUsage = offerdata.usage ? offerdata.usage : usage
  console.log(offerUsage, 'offer_usage')

  const [error, setError] = useState()

  const handleSubmit = async () => {
    if (offerType === 'discount') {
      if (offerlist.offer_bgImgae) {
        try {
          const data = await SubmitOffersData(
            allvalues,
            updatedata,
            dispatch,
            offerlist,
            offerUsage
          );
          setModalIsOpen(false);
          toast.success(data?.message);
          GetOffersData(dispatch);
          console.log(data);
        } catch (error) {
          console.error("Error uploading data", error);
        }
      } else {
        toast.error("Please upload Offer Image");
      }
    }
    else {
      if (offerlist.offer_bgImgae) {
        try {
          const data = await SubmitRedeemOffersData(
            allvalues,
            updatedata,
            dispatch,
            offerlist,
            offerUsage
          );
          setModalIsOpen(false);
          toast.success(data?.message);
          GetRedeemOffersData(dispatch);
          console.log(data);
        } catch (error) {
          console.error("Error uploading data", error);
        }
      } else {
        toast.error("Please upload Offer Image");
      }
    }
  };
  console.log(currentoffers, "offerlistofferlist");

  // useEffect(() => {
  //   setOfferlist({ ...offerlist, occupation: offerdata.occupation_id });
  // }, []);


  // const [startIndex, setStartIndex] = useState(0);

  // This ref is to get access to the Swiper instance to control navigation (if necessary)
  const swiperRef = useRef(null);

  // const nextSlide = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slideNext();
  //   }
  // };

  // const prevSlide = () => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slidePrev();
  //   }
  // };


  const [centeredImage, setCenteredImage] = useState(currentoffers[0]); // Set the first image as the default centered image
  const centeredImageRef = useRef(null); // Ref to store the container of the centered image



  // Handle slide change to update the centered image and set the ref to the container
  const handleSlideChange = (swiper) => {
    const currentSlide = swiper?.slides[swiper?.activeIndex];
    const imgSrc = currentSlide?.querySelector("img")?.src;
    setCenteredImage(imgSrc);
    const container = currentSlide?.querySelector('.offer-container');
    centeredImageRef.current = container;
    console.log(centeredImageRef.current, 'current_slide')
  };

   const downloadImage = () => {
    if (!centeredImageRef.current) return; // Make sure the container exists

    const image = centeredImageRef.current.querySelector('img'); // Extract the image from the container
    if (!image) return; // If no image found, return

    const imgSrc = image.src; // Get the image source

    // Create a new image object to load the image
    const img = new Image();
    img.onload = () => {
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size to the desired dimensions (257x154)
      const targetWidth = 257;
      const targetHeight = 154;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Calculate the aspect ratio and center the image within the canvas
      const aspectRatio = img.width / img.height;
      let width = targetWidth;
      let height = targetHeight;

      if (aspectRatio > 1) {
        // Image is wider than tall, so scale based on width
        height = targetWidth / aspectRatio;
      } else {
        // Image is taller than wide, so scale based on height
        width = targetHeight * aspectRatio;
      }

      // Draw the image onto the canvas, scaling it while maintaining aspect ratio
      ctx.drawImage(img, (targetWidth - width) / 2, (targetHeight - height) / 2, width, height);

      // Convert canvas to a data URL (this is the image in PNG format)
      const dataUrl = canvas.toDataURL('image/png');

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'resized-image.png'; // Filename for the downloaded image
      a.click();
    };

    // Start loading the image
    img.src = imgSrc;
  };


  return uploadimage == false ? (
    <>
      <div className="h-full w-full">
        <div className="flex flex-col">
          {/* <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
            Occupation
          </label> */}
          {/* <select
            value={offerdata.occupation_id || ""}
            onChange={(e) => {
              setOfferlist({ ...offerlist, occupation: e.target.value });
            }}
            className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw]"
          >
            <option label="Select Occupation" value={0} className="" />
            <option label="Business" value={1} className="" />
            <option label="General Public" value={2} className="" />
            <option label="Handicapped" value={3} className="" />
            <option label="Pilgrim" value={4} className="" />
            <option label="Senior Citizen" value={5} className="" />
            <option label="Student" value={6} className="" />
            <option label="Tourist" value={7} className="" />
          </select> */}

          <div className=" relative col-span-1 flex-col flex">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Usage Count
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                *
              </span>
            </label>
            <input
              type="text"
              name="usage"
              placeholder="Usage Count"
              value={usage}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log(newValue, 'new_values')
                sessionStorage.setItem("usage", newValue);
                setUsage(newValue);
                newValue === 0 ? setError('Please Select the Usage value') : setError('')
              }}
              className="placeholder-[#1F487C] border-r-[0.2vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-xl outline-none px-[1vw]"
            />
            <div className="absolute bottom-[-1.2vw] text-[0.8vw] text-red-500">{error}</div>
            {/* <ErrorMessage
              name="usage"
              component="div"
              className="text-red-500 text-[0.8vw]"
            /> */}
          </div>
        </div>
        {/* {currentoffers.length > 0 ? (
          <div className="flex items-center justify-between mt-[2.5vw]">
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

            <div
              ref={offerRef}
              className="flex relative justify-center items-center space-x-[1vw] offer-container"
            >
              {currentoffers
                .slice(startIndex, startIndex + 1)
                .map((image, index) => (
                  <img
                    key={index}
                    className="h-[15vw] w-[25vw] rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out"
                    src={image}
                    alt={`Offer ${index}`}
                  />
                ))}
              <div className=" absolute top-0 left-[-1vw]">
                {updatedata && draggerImage === false ? (
                  <img
                    // src={previewUrl}
                    // src={currentofferdata.file}
                    src={`${apiImgUrl}${offerdata.offer_img}`}
                    className="w-[8.2vw] h-[15vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    className="w-[8.2vw] h-[15vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                  />
                )}
              </div>

              {updatedata && draggerImage === false ? (
                <img
                  // src={previewUrl}
                  src={`${apiImgUrl}${offerdata.offer_img}`}
                  className="absolute top-[4.5vw] bg-white left-[0.5vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
                />
              ) : (
                <img
                  src={previewUrl}
                  // src={`${apiImgUrl}${offerdata.offer_img}`}
                  className="absolute top-[4.5vw] bg-white left-[0.5vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
                />
              )}

              <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw]  py-[0.2vw] absolute top-[1.5vw] left-[9vw]">
                <h1 className="text-white  text-[1.2vw]">
                  {currentofferdata.offer_name}
                </h1>
              </div>
              <p className="text-white font-extrabold text-[1vw]  absolute top-[4.5vw] left-[9vw]">
                {currentofferdata.offer_desc}
              </p>
              <p className="text-white  text-[1vw]  absolute top-[9.5vw] left-[9vw]">{`Valid till ${dayjs(
                new Date(currentofferdata.expiry_date)
              ).format("DD MMM")}`}</p>
              <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw]  py-[0.2vw] absolute top-[11.5vw] left-[9vw]">
                <p className="text-white font-bold text-[1vw]">
                  {currentofferdata.offer_code}
                </p>
              </div>
            </div>
            {startIndex + 1 >= currentoffers.length ?
              (
                <div className="w-[3vw] h-[3vw]"></div>
              )
              :
              (<button
                onClick={nextSlide}
                disabled={startIndex + 1 >= currentoffers.length}
                className="text-[#1F4B7F] font-semibold"
              >
                <IoIosArrowDropright size={"3vw"} />
              </button>)
            }

          </div>
        ) : (
          ""
        )} */}


        {/* {currentoffers.length > 0 ? (
          <div className="container">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}  // Make sure the number of visible slides is dynamic
              spaceBetween={10}  // Adjust space between slides if necessary
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
              {currentoffers.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-[15vw] w-[25vw] rounded-[1vw] object-cover transition-transform duration-1000 ease-in-out offer-container"
                    src={image}
                    alt={`Offer ${index}`}
                  />
                </SwiperSlide>
              ))}
              
              <div className="slider-controller">
                <div className="swiper-button-prev slider-arrow">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        ) : null} */}


        <div className="container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"2"}
            spaceBetween={10}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            <div className="relative z-0">
              {Array.isArray(currentoffers) &&
                currentoffers.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`offer-container  ${centeredImage === image ? "centered" : ""
                        }`}
                    >
                      <img
                        className={`${centeredImage === image ? "centered" : ""} rounded-xl`}
                        src={image}
                        alt={`Offer ${index}`}
                      />
                      <div className=" flex absolute top-0 w-full h-full ">
                        <div className="  w-[7.2vw] bg-white rounded-lg ">
                          <img
                            src={`${apiImgUrl}${offerdata.offer_img}`}
                            className="w-[4vw] h-[1vw] opacity-30  " />
                        </div>
                        <div className="w-[10vw] h-[10vw] rounded-full absolute top-1 z-20 ">
                          <img
                            src={`${apiImgUrl}${offerdata.offer_img}`}
                            className="w-[6vw]" />
                        </div>
                        <div>
                          {currentofferdata.offer_name}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </div>
        {
          currentoffers.length > 0 && (
            // <div className="flex">

            <div className="flex items-center justify-between">
              {downloadReq == false ? (
                <div className="mt-[1.5vw] text-red-400 text-[1.2vw]">
                  {" "}
                  Download and click next
                </div>
              ) : (
                <div></div>
              )}

              <div className="flex gap-[1vw]">
                {/* <p className="text-red-600">download and click next</p> */}
                <button
                  onClick={downloadImage}
                  className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[1vw] "
                >
                  Download as Image
                </button>
                <button
                  // onClick={downloadImage}
                  onClick={() =>
                    downloadReq == true ? setUploadImage(true) : ""
                  }
                  className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
                >
                  Next
                </button>
              </div>
            </div>
            // </div>
          )
        }
      </div >
    </>
  ) : (
    <>
      <div>
        <label className="text-[#1F4B7F] text-[1.2vw] font-bold">
          Upload Downloaded Image
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleupload(e?.target?.files[0])}
        />
        <label
          htmlFor="fileInput"
          className="h-[7vw] w-[100%] mt-[0.5vw] cursor-pointer flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1f4b7f] rounded-[0.5vw]"
        >
          {/* {selectedFile ? (
            <img src={`${profileurl}${selectedFile}`} />
          ) : (
            <span className="text-[1.1vw] text-[#1f4b7f] font-bold">
              Profile
            </span>
          )} */}
          <span className="text-[1.1vw] text-[#1f4b7f] font-bold">Profile</span>
        </label>
        {offerlist.offer_bgImgae ? (
          <p className="text-[0.9vw] text-[#1f4b7f] ">
            {offerlist.offer_bgImgae.name}
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center mt-[1vw] justify-end gap-x-[1vw]">
          <button
            onClick={() => setUploadImage(false)}
            className="border-[#1f4b7f] border-[0.1vw] text-[#1f4b7f] text-[1vw] px-[2vw] py-[0.5vw] rounded-[0.5vw]"
          >
            Back
          </button>
          <button
            className="bg-[#1f4b7f] text-white text-[1vw] px-[2vw] py-[0.5vw] rounded-[0.5vw]"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundView;
