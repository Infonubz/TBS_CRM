import React, { useEffect, useState } from "react";
import { GetReqPromotionById } from "../../Api/RequestManagement/RequestManagement";

export default function ViewPromotion({ promoId }) {
  const [promodata, setPromoData] = useState("");
  const fetchGetPromo = async () => {
    try {
      const data = await GetReqPromotionById(promoId);
      console.log(data, "promodatadatadata");
      setPromoData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  useEffect(() => {
    fetchGetPromo();
  }, [promoId]);
  console.log(promodata, "promodata");
  return (
    <div className="w-full h-full">
      {/* <div className="col-span-2 flex flex-col">
        <span className="border-r-[0.3vw] mt-[0.5vw] cursor-not-allowed border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]">
          Tseting
        </span>
        <span className="border-r-[0.3vw] mt-[0.5vw] flex cursor-not-allowed border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]">
          Tseting
        </span>
      </div> */}
      <img src={`http://192.168.90.47:4000${promodata.promo_image}`} className="w-full h-full object-contain" />
    </div>
  );
}
