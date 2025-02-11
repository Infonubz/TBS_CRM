import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GetThemeBg, GetThemeById, submitThemeBg } from '../../../Api/Settings/ThemeSetting/ThemeSettings';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ConfigProvider, Upload } from 'antd';
import { FaUpload } from 'react-icons/fa';

const ImageValidation = (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
        return 'Invalid file type. Only JPEG and PNG are allowed.';
    }

    if (file.size > MAX_SIZE) {
        return 'File size exceeds the maximum limit of 5MB.';
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
        img.onload = () => {
            if (img.width < 100 || img.height < 100) {
                reject('Image dimensions are too small. Minimum size is 100x100.');
            }
            resolve();
        };
        img.onerror = () => reject('Error loading image.');
    });
};

const AddTheme = ({ setTogglePage, setThemeID, themeId }) => {

    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

    const { Dragger } = Upload
    const [error, setError] = useState({
        title: '',
        background: null,
        sky: null,
        road: null,
        buildings: null,
    })

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Theme Title is required')
            .min(5, 'Theme Title must be at least 5 characters')
            .max(20, 'Theme Title must be less than 20 characters'),
        background: Yup.mixed()
            .required('Background image is required')
            .test('file-size', 'File size exceeds the maximum limit of 5MB.', function (value) {
                // If the value is a file object, check size and type
                if (value && value instanceof File) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('file-type', 'Invalid file type. Only JPEG and PNG are allowed.', function (value) {
                // If the value is a file object, check type
                if (value && value instanceof File) {
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('image-dimensions', `Image Dimensions Doesn't Match. The Size is 1920 X 608.`, async (value) => {
                if (value && value instanceof File) {  // Ensure value is a File object
                    const img = new Image();
                    img.src = URL.createObjectURL(value);
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            if (img.width === 1920 && img.height === 608) {
                                resolve(); // Image is valid, resolve promise
                            } else {
                                return setError((prevState) => ({
                                    ...prevState,
                                    background: ` Image Dimensions Doesn't Match. The Size is 1920 X 608.`
                                }));
                            }
                        };
                        img.onerror = () => reject('Error loading image.'); // Reject if the image fails to load
                    });
                }
                return true; // In case there's no file, return true
            }),
        sky: Yup.mixed()
            .required('Sky image is required')
            .test('file-size', 'File size exceeds the maximum limit of 5MB.', function (value) {
                // If the value is a file object, check size and type
                if (value && value instanceof File) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('file-type', 'Invalid file type. Only JPEG and PNG are allowed.', function (value) {
                // If the value is a file object, check type
                if (value && value instanceof File) {
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('image-dimensions', ` Image Dimensions Doesn't Match. The Size is 1588 x 424.`, async (value) => {
                if (value && value instanceof File) {  // Ensure value is a File object
                    const img = new Image();
                    img.src = URL.createObjectURL(value);
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            if (img.width === 1588 && img.height === 424) {
                                resolve();
                            } else {
                                return setError((prevState) => ({
                                    ...prevState,
                                    sky: ` Image Dimensions Doesn't Match. The Size is 1588 x 424.`
                                }));
                            }
                        };
                        img.onerror = () => reject('Error loading image.');
                    });
                }
                return true;
            }),
        road: Yup.mixed()
            .required('Road image is required')
            .test('file-size', 'File size exceeds the maximum limit of 5MB.', function (value) {
                // If the value is a file object, check size and type
                if (value && value instanceof File) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('file-type', 'Invalid file type. Only JPEG and PNG are allowed.', function (value) {
                // If the value is a file object, check type
                if (value && value instanceof File) {
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('image-dimensions', ` Image Dimensions Doesn't Match. The Size is 9585 x 483.`, async (value) => {
                if (value && value instanceof File) {  // Ensure value is a File object
                    const img = new Image();
                    img.src = URL.createObjectURL(value);
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            if (img.width === 9585 && img.height === 483) {
                                resolve();
                            } else {
                                return setError((prevState) => ({
                                    ...prevState,
                                    road: ` Image dimensions are too small. Minimum size is 1920 x 606.`
                                }));
                            }
                        };
                        img.onerror = () => reject('Error loading image.');
                    });
                }
                return true;
            }),
        buildings: Yup.mixed()
            .required('Buildings image is required')
            .test('file-size', 'File size exceeds the maximum limit of 5MB.', function (value) {
                // If the value is a file object, check size and type
                if (value && value instanceof File) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('file-type', 'Invalid file type. Only JPEG and PNG are allowed.', function (value) {
                // If the value is a file object, check type
                if (value && value instanceof File) {
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return true; // Skip validation if it's just a file path (string)
            })
            .test('image-dimensions', ` Image dimensions are too small. Minimum size is 6791 x 2432.`, async (value) => {
                if (value && value instanceof File) {  // Ensure value is a File object
                    const img = new Image();

                    // Use createObjectURL with value, which should be a File object
                    img.src = URL.createObjectURL(value);

                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            if (img.width === 6791 && img.height === 2432) {
                                resolve();
                            } else {
                                return setError((prevState) => ({
                                    ...prevState,
                                    buildings: `Image dimensions are too small. Minimum size is 6791 x 2432.`,
                                }));
                            }
                        };
                        img.onerror = () => reject('Error loading image.');
                    });
                }
                return true;
            }),
    });


    const [images, setImages] = useState({
        title: '',
        background: null,
        sky: null,
        road: null,
        buildings: null,
    });

    const [fetchedImg, setFetchedImg] = useState({
        title: '',
        background: null,
        sky: null,
        road: null,
        buildings: null,
    });

    console.log(fetchedImg?.title, 'theme_image_title')
    const [previewUrl, setPreviewUrl] = useState({
        title: '',
        background: null,
        sky: null,
        road: null,
        buildings: null,
    })

    const [draggerImage, setDraggerImage] = useState()

    const handleImageChange = (e, fieldName) => {
        const file = e?.currentTarget?.files[0];
        if (file) {
            // Create a URL for the image file
            const imageUrl = URL.createObjectURL(file);
            const image = new Image();

            // Once the image is loaded, print its dimensions
            image.onload = () => {
                console.log('Image Dimensions:', image?.width, 'x', image?.height);
            };

            // Set the image source to the created object URL
            image.src = imageUrl;

            // Update the image in the state for the respective fieldName
            setImages({
                ...images,
                [fieldName]: file,
            });
        }
    };

    const dispatch = useDispatch()

    const fetchThemeBg = async () => {
        try {
            if (themeId) {
                const data = await GetThemeById(themeId);
                setFetchedImg((prevState) => ({
                    ...prevState,
                    title: data?.title,
                    background: data?.background,
                    sky: data?.sky,
                    road: data?.road,
                    buildings: data?.building,
                }));
                console.log(data?.title, 'response_data')
                return data
            }
        } catch (error) {
            console.error('Error fetching theme background:', error);
        }
    };

    useEffect(() => {
        fetchThemeBg();
    }, []);

    const handleSubmit = async (values) => {

        try {

            const data = await submitThemeBg(
                themeId,
                values,
                dispatch
            );
            setTogglePage(1)
            console.log(data, 'theme_data')
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };
    return (
        <Formik
            initialValues={{
                title: fetchedImg?.title || '',
                background: fetchedImg?.background ? fetchedImg?.background : '',
                sky: fetchedImg?.sky ? fetchedImg?.sky : '',
                road: fetchedImg?.road ? fetchedImg?.road : '',
                buildings: fetchedImg?.buildings ? fetchedImg?.buildings : '',

            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values)
                console.log('Form Submitted:', values);
            }}
            enableReinitialize={true}
        >
            {({ setFieldValue, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='p-[1vw]'>
                        {/* Submit Button */}
                        <div className='flex items-center justify-between gap-[1vw]'>
                            <div className='text-[1.35vw] font-semibold text-[#1F487C] underline'>
                                {themeId ? 'Update Theme' : 'Add Theme'}
                            </div>
                            <div className='flex items-center gap-[1vw] justify-center'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setTogglePage(1)
                                        setThemeID('')
                                    }}
                                    className='px-[0.75vw] py-[0.25vw] border-[#1F487C] border-[0.1vw]  text-[#1F487C] hover:text-white hover:bg-[#1F487C] font-semibold rounded-md shadow-sm hover:shadow-none shadow-[#1F487C] text-[1vw]'
                                    style={{ transition: "all 0.3s" }}>
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className='px-[0.75vw] py-[0.25vw] border-[#1F487C] border-[0.1vw]  text-[#1F487C] hover:text-white hover:bg-[#1F487C] font-semibold rounded-md shadow-sm hover:shadow-none shadow-[#1F487C] text-[1vw]'
                                    style={{ transition: "all 0.3s" }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        {/* Title Input */}
                        <div className='grid grid-cols-2 gap-[1.5vw] mt-[1vw]'>
                            <div className='relative'>
                                <label htmlFor="title" className="block text-[1vw] font-medium text-[#1F487C]">
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter Theme Title"
                                    className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]"
                                />
                            </div>
                            <div></div>

                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBorder: "rgb(0,0,0,0)",  // Fully invisible border
                                        colorPrimary: "rgb(0,0,0,0)",
                                        colorPrimaryHover: 'rgb(0,0,0,0)'
                                    }
                                }}>
                                {/* Background Image */}
                                <div className='relative'>
                                    <label htmlFor="background" className="block text-[1vw] font-medium text-[#1F487C]">
                                        Background Image
                                    </label>
                                  

                                        <div className='border-[0.1vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C] rounded-[0.5vw]'>
                                            <Dragger
                                                height={"7.2vw"}
                                                id='background_image'
                                                type="file"
                                                name="background"
                                                accept="image/*"
                                                className=" mt-[0.2vw] relative"
                                                beforeUpload={(file) => {
                                                    const tempUrl = URL.createObjectURL(file);
                                                    setPreviewUrl((prevState) => ({
                                                        ...prevState,
                                                        background: tempUrl,
                                                    }));
                                                    setFieldValue("file", file);
                                                    return false; // Prevent automatic upload
                                                }}
                                                onChange={({ fileList }) => {
                                                    if (fileList.length > 0) {
                                                        setDraggerImage(true)
                                                        setFieldValue('background', fileList[0].originFileObj);
                                                    }
                                                }}
                                                showUploadList={false}

                                                style={{
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    position: "relative",
                                                }}
                                            >
                                                <label className="flex items-center justify-center relative z-10">
                                                    <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                                        Drag and Drop
                                                    </p>
                                                    <FaUpload color="#1F4B7F" size={"1.2vw"} />
                                                </label>
                                                <div
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    style={{
                                                        backgroundImage: `url(${draggerImage
                                                            ? previewUrl?.background
                                                            : `${apiImgUrl}${fetchedImg?.background}`
                                                            })`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        opacity: "30%",
                                                        zIndex: 0,
                                                    }}
                                                ></div>
                                            </Dragger>
                                        </div>
                                   

                                    {error?.background ? <div className='text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]'>{error?.background}</div> :
                                        <ErrorMessage
                                            name="background"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]"
                                        />
                                    }
                                </div>
                                
                                {/* Sky Image */}
                                <div className='relative'>
                                    <label htmlFor="sky" className="block text-[1vw] font-medium text-[#1F487C]">
                                        Sky Image
                                    </label>
                                    <div className='border-[0.1vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C] rounded-[0.5vw]'>
                                        <Dragger
                                            height={"7.2vw"}
                                            type="file"
                                            name="sky"
                                            accept="image/*"

                                            className=" mt-[0.2vw] relative"

                                            beforeUpload={(file) => {
                                                const tempUrl = URL.createObjectURL(file);
                                                setPreviewUrl((prevState) => ({
                                                    ...prevState,
                                                    sky: tempUrl,
                                                }));
                                                setFieldValue("file", file);
                                                return false; // Prevent automatic upload
                                            }}
                                            onChange={({ fileList }) => {
                                                if (fileList.length > 0) {
                                                    setDraggerImage(true)
                                                    setFieldValue('sky', fileList[0].originFileObj);
                                                }
                                            }}
                                            showUploadList={false}

                                            style={{
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                position: "relative",
                                            }}
                                        >
                                            <label className="flex items-center justify-center relative z-10">
                                                <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                                    Drag and Drop
                                                </p>
                                                <FaUpload color="#1F4B7F" size={"1.2vw"} />
                                            </label>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    backgroundImage: `url(${draggerImage
                                                        ? previewUrl?.sky
                                                        : `${apiImgUrl}${fetchedImg?.sky}`
                                                        })`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    opacity: "30%",
                                                    zIndex: 0,
                                                }}
                                            ></div>
                                        </Dragger>
                                    </div>
                                    {error?.sky ? <div className='text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]'>{error?.sky}</div> :
                                        <ErrorMessage
                                            name="sky"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]"
                                        />
                                    }
                                </div>
                                {/* Road Image */}
                                <div className='relative'>
                                    <label htmlFor="road" className="block text-[1vw] font-medium text-[#1F487C]">
                                        Road Image
                                    </label>
                                    <div className='border-[0.1vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C] rounded-[0.5vw]'>
                                        <Dragger
                                            height={"7.2vw"}
                                            type="file"
                                            name="road"
                                            accept="image/*"

                                            className=" mt-[0.2vw] relative"

                                            beforeUpload={(file) => {
                                                const tempUrl = URL.createObjectURL(file);
                                                setPreviewUrl((prevState) => ({
                                                    ...prevState,
                                                    road: tempUrl,
                                                }));
                                                setFieldValue("file", file);
                                                return false; // Prevent automatic upload
                                            }}
                                            onChange={({ fileList }) => {
                                                if (fileList.length > 0) {
                                                    setDraggerImage(true)
                                                    setFieldValue('road', fileList[0].originFileObj);
                                                }
                                            }}
                                            showUploadList={false}

                                            style={{
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                position: "relative",
                                            }}
                                        >
                                            <label className="flex items-center justify-center relative z-10">
                                                <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                                    Drag and Drop
                                                </p>
                                                <FaUpload color="#1F4B7F" size={"1.2vw"} />
                                            </label>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    backgroundImage: `url(${draggerImage
                                                        ? previewUrl?.road
                                                        : `${apiImgUrl}${fetchedImg?.road}`
                                                        })`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    opacity: "30%",
                                                    zIndex: 0,
                                                }}
                                            ></div>
                                        </Dragger>
                                    </div>
                                    {error?.road ? <div className='text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]'>{error?.road}</div> :
                                        <ErrorMessage
                                            name="road"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]"
                                        />
                                    }
                                </div>
                                {/* Buildings Image */}
                                <div className='relative'>
                                    <label htmlFor="buildings" className="block text-[1vw] font-medium text-[#1F487C]">
                                        Buildings Image
                                    </label>
                                    <div className='border-[0.1vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C] rounded-[0.5vw]'>
                                        <Dragger
                                            height={"7.2vw"}
                                            type="file"
                                            name="buildings"
                                            accept="image/*"

                                            className=" mt-[0.2vw] relative"

                                            beforeUpload={(file) => {
                                                const tempUrl = URL.createObjectURL(file);
                                                setPreviewUrl((prevState) => ({
                                                    ...prevState,
                                                    buildings: tempUrl,
                                                }));
                                                setFieldValue("file", file);
                                                return false; // Prevent automatic upload
                                            }}
                                            onChange={({ fileList }) => {
                                                if (fileList.length > 0) {
                                                    setDraggerImage(true)
                                                    setFieldValue('buildings', fileList[0].originFileObj);
                                                }
                                            }}
                                            showUploadList={false}

                                            style={{
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                position: "relative",
                                            }}
                                        >
                                            <label className="flex items-center justify-center relative z-10">
                                                <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                                    Drag and Drop
                                                </p>
                                                <FaUpload color="#1F4B7F" size={"1.2vw"} />
                                            </label>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    backgroundImage: `url(${draggerImage
                                                        ? previewUrl?.buildings
                                                        : `${apiImgUrl}${fetchedImg?.buildings}`
                                                        })`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    opacity: "30%",
                                                    zIndex: 0,
                                                }}
                                            ></div>
                                        </Dragger>
                                    </div>
                                    {error?.buildings ? <div className='text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]'>{error?.buildings}</div> :
                                        <ErrorMessage
                                            name="buildings"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.4vw]"
                                        />
                                    }
                                </div>
                            </ConfigProvider>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default AddTheme;
