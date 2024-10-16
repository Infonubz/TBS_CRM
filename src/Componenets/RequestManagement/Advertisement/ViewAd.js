// import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import { GetAdsById } from "../../../Api/Ads/Ads";
import ReactPlayer from "react-player";

const ViewAd = ({updatedata}) =>{
    const [adsData,setAdsData] = useState()
    console.log(updatedata,"ponceads");

    const GetAddVideo =async () =>{
        try{
           const data = await GetAdsById(updatedata)
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
                        (adsData?.ad_file_type || adsData?.ad_file_type.startsWith("image/")) ? (
                        <img
                            src={`http://192.168.90.47:4000${adsData?.ad_video}`}
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
                            url={`http://192.168.90.47:4000${adsData?.ad_video}`}
                            className="react-player"
                            />
                        </div>
                        )
                    }
                    </div>    
      </div>    )
}
export default ViewAd;