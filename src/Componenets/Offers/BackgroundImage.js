import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logo from "../../asserts/bus.jpg";
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
}) => {
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
  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, currentoffers.length - 1);
    setStartIndex(newIndex);
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
  const downloadImage = () => {
    // html2canvas(document.querySelector(".offer-container")).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   link.download = "offer-image.png";
    //   link.click();
    // });
    html2canvas(document.querySelector(".offer-container"), {
      scale: 2, // Increase the resolution of the canvas
      useCORS: true, // Enable cross-origin resource sharing if needed
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded
        const offerContainer = clonedDoc.querySelector(".offer-container");
        offerContainer.style.fontFamily = getComputedStyle(
          document.querySelector(".offer-container")
        ).fontFamily;
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "offer-image.png";
      link.click();
    });
  };
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
  const handleSubmit = async () => {
    if (offerlist.offer_bgImgae) {
      try {
        const data = await SubmitOffersData(
          allvalues,
          updatedata,
          dispatch,
          offerlist
        );
        setModalIsOpen(false);
        toast.success(data?.message);
        GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
    else{
      toast.error("Please upload Offer Image")
    }
  };
  console.log(currentoffers, "offerlistofferlist");
  return uploadimage == false ? (
    <>
      <div className="h-full w-full">
        <div className="flex flex-col">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
            Occupation
          </label>
          <select
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
          </select>
        </div>
        {currentoffers.length > 0 ? (
          <div className="flex items-center justify-between mt-[2.5vw]">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="text-[#1F4B7F] font-semibold"
            >
              <IoIosArrowDropleft size={"3vw"} />
            </button>

            <div className="flex relative justify-center items-center space-x-[1vw] offer-container">
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
                <img
                  src={previewUrl}
                  className="w-[8.2vw] h-[15vw] bg-white object-cover opacity-50 rounded-tl-[1vw] rounded-bl-[1vw] rounded-tr-[2.2vw] rounded-br-[1.5vw]"
                />
              </div>
              <img
                src={previewUrl}
                className="absolute top-[4.5vw] bg-white left-[0.5vw] w-[5.5vw] h-[5.5vw] rounded-[50%]"
              />

              <div className="bg-white bg-opacity-30 rounded-[2vw] px-[1vw]  py-[0.2vw] absolute top-[1.5vw] left-[9vw]">
                <h1 className="text-white  text-[1.2vw]">
                  {currentofferdata.offer_name}
                </h1>
              </div>
              <p className="text-white font-extrabold text-[1vw]  absolute top-[4.5vw] left-[9vw]">
                {currentofferdata.offer_desc}
              </p>
              <p className="text-white  text-[1vw]  absolute top-[9.5vw] left-[9vw]">{`Valid till ${dayjs(
                new Date(currentofferdata.start_date)
              ).format("DD MMM")}`}</p>
              <div className="bg-white bg-opacity-30 border-dashed border-[0.1vw] border-white px-[1vw]  py-[0.2vw] absolute top-[11.5vw] left-[9vw]">
                <p className="text-white font-bold text-[1vw]">
                  {currentofferdata.offer_code}
                </p>
              </div>
            </div>

            <button
              onClick={nextSlide}
              disabled={startIndex + 1 >= currentoffers.length}
              className="text-[#1F4B7F] font-semibold"
            >
              <IoIosArrowDropright size={"3vw"} />
            </button>
          </div>
        ) : (
          ""
        )}
        {currentoffers.length > 0 && (
          <div className="flex items-center justify-end">
            <div className="flex gap-[1vw]">
              <button
                onClick={downloadImage}
                className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[1vw] "
              >
                Download as Image
              </button>
              <button
                // onClick={downloadImage}
                onClick={() => setUploadImage(true)}
                className="mt-[1.5vw] bg-[#1F4B7F] text-[1vw] rounded-[0.5vw] text-white py-[0.5vw] px-[2vw] "
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
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
