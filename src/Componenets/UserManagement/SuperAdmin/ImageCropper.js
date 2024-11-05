import { useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { IoCloseCircle } from "react-icons/io5";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ onImageCrop }) => {

    const [avatarUrl, setAvatarUrl] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState({ aspect: ASPECT_RATIO, unit: "%", width: 100 });
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    setImgSrc("");
                } else {
                    setImgSrc(imageUrl);
                    setError("");
                    const crop = makeAspectCrop(
                        {
                            unit: "%", width: 100,
                        },
                        ASPECT_RATIO,
                        naturalWidth,
                        naturalHeight
                    );
                    setCrop(centerCrop(crop, naturalWidth, naturalHeight));
                    setModalOpen(true);
                }
            });
        });
        reader.readAsDataURL(file);
        console.log(file, 'current_Fiule');

    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        if (!crop) {
            const crop = makeAspectCrop(
                {
                    unit: "%",
                    width: 100,
                },
                ASPECT_RATIO,
                width,
                height
            );
            setCrop(centerCrop(crop, width, height));
        }
    };

    const handleCrop = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgRef = document.createElement('img');
        imgRef.src = imgSrc;

        imgRef.onload = () => {
            const pixelCrop = convertToPixelCrop(crop, imgRef.width, imgRef.height);
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            ctx.drawImage(
                imgRef,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );
            const dataUrl = canvas.toDataURL();
            const byteString = atob(dataUrl.split(',')[1]);
            const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const newFile = new Blob([ab], { type: mimeString });
            onImageCrop(newFile);
            setAvatarUrl(dataUrl);
            setModalOpen(false);
            setImgSrc("");
        };
    };

    return (
        <div className="">
            <label className="flex flex-col items-center cursor-pointer">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[7.2vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] object-cover"
                    />
                ) : (
                    <div className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[7.2vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]">
                        Upload
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
            {modalOpen && (
                <div
                    className="relative z-10"
                    aria-labelledby="crop-image-dialog"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-slate-300 bg-opacity-5 transition-all backdrop-blur-sm"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex justify-center px-2 py-12 text-center ">
                            <div className="relative  border-l-[0.1vw] px-[2vw] border-t-[0.2vw] border-b-[0.5vw] border-r-[0.5vw] rounded-lg border-[#1f4b7f] bg-white text-slate-100 text-left shadow-xl transition-all">
                                <div className="px-5 py-4">
                                    <button
                                        type="button"
                                        className="rounded-md p-1 inline-flex items-center justify-center text-[#1F487C] hover:bg-[#c2d3ea] focus:outline-none absolute top-2 right-2"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <IoCloseCircle />
                                    </button>
                                    {error && <p className="text-red-400 text-xs">{error}</p>}
                                    {imgSrc && (
                                        <div className="flex flex-col items-center">
                                            <ReactCrop
                                                crop={crop}
                                                onChange={(newCrop) => setCrop(newCrop)}
                                                circularCrop
                                                keepSelection
                                            >
                                                <img
                                                    src={imgSrc}
                                                    alt="Upload"
                                                    style={{ maxHeight: "70vh", objectFit: "contain" }}
                                                    onLoad={onImageLoad}
                                                />
                                            </ReactCrop>
                                            <button
                                                className="text-white text-xs py-2 px-4 rounded-2xl mt-4 bg-[#1F487C] hover:bg-[#1f3b7c]"
                                                onClick={handleCrop}
                                            >
                                                Crop Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
