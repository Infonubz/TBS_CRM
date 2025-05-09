// import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import { GetAdsById } from "../../../Api/Ads/Ads";
import ReactPlayer from "react-player";

const ViewAd = ({updatedata,showtable}) =>{
    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

    const [adsData,setAdsData] = useState()
    console.log(updatedata,"ponceads");

    const GetAddVideo =async () =>{
        try{
           const data = await GetAdsById(updatedata,showtable)
           setAdsData(data)
           console.log(data,"responceads");
        }
        catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        GetAddVideo()
    },[])
    console.log(adsData,"addimagedata");
  

    return(
        <div className="w-full h-full"> 
                    <div className="w-full h-[20vh] overflow-hidden">
                        {
                            showtable == 4 ?
                        (adsData?.ad_file_type || adsData?.ad_file_type.startsWith("image/")) ? (
                        <img
                            src={`${apiImgUrl}${adsData?.ad_video}`}
                            alt="Ad"
                            className="w-full h-full object-cover"
                            style={{
                            borderRadius: "1.4vw",
                            }}
                        />
                        ) : (
                        <div className="react-player-wrapper">
                            <ReactPlayer
                            playing
                            loop
                            muted
                            width="100%"
                            height="auto"
                            style={{
                                objectFit: "cover",
                            }}
                            url={`${apiImgUrl}${adsData?.ad_video}`}
                            className="react-player"
                            />
                        </div>
                        )
                        :
                        (adsData?.mobad_file_type || adsData?.mobad_file_type.startsWith("image/")) ? (
                            <img
                                src={`${apiImgUrl}${adsData?.mobad_vdo}`}
                                alt="Ad"
                                className="w-full h-full object-cover"
                                style={{
                                borderRadius: "1.4vw",
                                }}
                            />
                            ) : (
                            <div className="react-player-wrapper">
                                <ReactPlayer
                                playing
                                loop
                                muted
                                width="100%"
                                height="auto"
                                style={{
                                    objectFit: "cover",
                                }}
                                url={`${apiImgUrl}${adsData?.mobad_vdo}`}
                                className="react-player"
                                />
                            </div>
                            )
                    }
                    </div>    
      </div>    )
}
export default ViewAd;