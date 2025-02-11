import React from "react";

export default function GridTheme({ theme_background }) {
    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;


    return (
        <>


            {theme_background.map((item, index) => (
                // <div className="relative bg-red-400 w-full h-full">
                //     <img
                //         src={`${apiImgUrl}${item?.background}`}
                //         className="absolute top-0 left-0 z-[1] object-cover scale-100 w-1/4 h-1/4"
                //         alt="background"
                //     />

                //     <img
                //         src={`${apiImgUrl}${item?.sky}`}
                //         className="absolute top-0 left-0 z-[2] object-cover scale-100 w-1/4 h-1/4"
                //         alt="sky"
                //     />

                //     <img
                //         src={`${apiImgUrl}${item?.building}`}
                //         className="absolute top-0 left-0 z-[3] object-contain scale-100 w-1/4 h-1/4"
                //         alt="building"
                //     />

                //     <img
                //         src={`${apiImgUrl}${item?.road}`}
                //         className="absolute top-0 left-0 z-[4] object-contain scale-100 w-1/4 h-1/4"
                //         alt="road"
                //     />
                // </div>
                <div>

                </div>

            ))}


        </>
    );

}