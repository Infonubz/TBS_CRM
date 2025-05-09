import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

export default function Video_modal({ viewData, setViewModalIsOpen }) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    if (viewData) {
      GetAdData(viewData.id);
    }
  }, [viewData]);

  const GetAdData = async (id) => {
    try {
      const response = await axios.get(`${apiImgUrl}/ads/${id}`);
      setAdData(response.data[0]);
    } catch (error) {
      console.error("Error fetching advertisement data:", error);
    }
  };

  if (!adData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span className="text-[#1f487c] text-[1.3vw] font-bold">Video</span>
      <div className="rounded-3xl mt-[0.3vw] h-[15vw] w-[40vw] border-[0.1vw] border-l-[0.2vw] border-b-[0.2vw] border-[#1f487c]">
        {adData.ad_file_type && adData.ad_file_type.startsWith("image/") ? (
          <img
            src={`${apiImgUrl}${adData.ad_video_url}`}
            alt="Ad"
            className="p-[0.4] w-full h-full"
            style={{
              objectFit: "fill",
              borderRadius: "1.4vw",
            }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full"
            style={{
              objectFit: "cover",
              borderRadius: "1.2vw",
            }}
          >
            <source src={`${apiImgUrl}${adData.ad_video_url}`} />
          </video>
        )}
      </div>
    </div>
  );
}
