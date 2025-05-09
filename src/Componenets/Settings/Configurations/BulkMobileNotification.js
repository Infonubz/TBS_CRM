import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendMobileBulkNotification } from "../.././../Api/Settings/Configuration/BulkMobileNotification";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import { Table ,Spin, notification} from "antd";
import { GetMobileNotification } from "../.././../Api/Settings/Configuration/BulkMobileNotification";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import ModalPopup from "../../Common/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-js-pagination";
import Noimage from "../../../asserts/No_image_available.jpg";


const BulkMobileNotification = (
 
) => {
  const apiImageUrl = process.env.REACT_APP_API_URL_IMAGE;
  const[togglepage,setTogglePage]=useState(1);
  
  const[hoverid,setHoverId]=useState("");
  const[button,setbutton]=useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const[activePage,setActivePage]=useState(1);
    

  const fileInputRef = useRef(null);
  const initialValues = {
    title: "",
    body: "",
    image: null,
    tbs_user_id: ''
  };
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.crm.mobile_notification 
    
  );
  // console.log(notifications,"selected notifications");
  
  const itemsper=5;
  console.log(itemsper,"itemperpage");
  
  const handlePageChange = (selectedPage) => {
    
    setActivePage(selectedPage);
    console.log("Selected page:", selectedPage);
  };
  
  const indexOfLastItem = activePage * itemsper;
    const indexOfFirstItem = indexOfLastItem - itemsper;
  
    const currentItems = notifications?.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    console.log(currentItems,"CurrentItems")
  useEffect(() => {
   
    GetMobileNotification(dispatch);
   
  }, []);
  const handleClick=()=>{
    setTogglePage(2);
    
  }
  
  
  const showModal = (id, index) => {
    const image = notifications.find((t) => t.id === id);
    setCurrentTheme(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTheme(null);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr); // Convert the string into a Date object
    if (isNaN(date)) return "-"; // Check for invalid date
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }); // e.g., "may."
    const year = date.getFullYear();
  
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = (hours % 12 || 12).toString().padStart(2, '0');
  
    return `${day} ${month} ${year} (${hour12}:${minutes} ${ampm})`;
  };
  

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
    image: Yup.mixed()
      .nullable() // allow null values
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return true; // skip validation if no file is selected
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values);
    try {
      const respose = await sendMobileBulkNotification(values);
      toast.success(respose.message);
      console.log(respose);
    } catch (err) {
      console.log(err);
    } finally {
      resetForm();
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // <-- Reset file input manually
      }
    }
  };
  const columns = [
    {
      title: (
        <div className="flex justify-center items-center font-bold text-[1.1vw]">
          Logo
        </div>
      ),
      
      align: "center",
      render: (row) => {
        const image = `${apiImageUrl}${row?.image_path}`;
        console.log(row?.profileimg, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${row?.image_path ? `${apiImageUrl}${row?.image_path}` :Noimage
                } `}
              alt="Photo"
              className="w-[2vw] h-[2vw] object-cover rounded-[0.2vw]"
              onClick={() => showModal(row?.id)}
            />
            
          </div>
        );
      },
      width: "6vw",
    },
      {
        title: (
          <div className="flex items-center justify-center text-[1.2vw]">
           User Id
          </div>
        ),
  
        render: (row) => {
          return (
            <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
              {row?.tbs_user_id?(row.tbs_user_id):("-")}
            </div>
          );
        },
      },
      {
        title: (
          <div className="flex items-center justify-center text-[1.2vw]">
            Title
          </div>
        ),
        render: (row) => {
          return (
            <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
              {row?.title}
            </div>
          );
        },
      },
      {
        title: (
          <div className="flex items-center justify-center text-[1.2vw]">
            Content
          </div>
        ),
        render: (row) => {
          return (
            <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
             {row?.body}
            </div>
          );
        },
      },
      {
        title: (
          <div className="flex items-center justify-center text-[1.2vw]">
            Created Date
          </div>
        ),
        
        render: (row) => {
          return (
            <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
              {formatDate(row?.send_datetime)}
            </div>
          );
        },
      },
      
    ]

  return (
    <div className="p-[2vw]">
              {
                togglepage===1?(<div className="flex justify-end mr-[3vw]">
  
                  <button
                    className="bg-white text-[#1F487C] border-[0.1vw] border-b-[0.2vw] border-r-[0.2vw] border-[#1F487C] rounded-[0.5vw] py-[0.25vw] outline-none flex items-center  px-[1vw] gap-[0.25vw]"
                    onClick={() => {
                      handleClick();
                      
                     
                    }}
                  >
                     <IoIosAdd size={"1.5vw"} />{" "} 
                    <span className="text-[1.2vw]">Add</span> 
                  </button>
              </div>):(<div className="flex justify-end mr-[3vw]">
                                <button
                                    type='button'
                                    onClick={() => {
                                        setTogglePage(1)
                                        
                                    }}
                                    className='px-[0.75vw] py-[0.25vw] border-[#1F487C] border-[0.1vw]  text-[#1F487C] hover:text-white hover:bg-[#1F487C] font-semibold rounded-md shadow-sm hover:shadow-none shadow-[#1F487C] text-[1vw]'
                                    style={{ transition: "all 0.3s" }}>
                                    Back
                                </button>
                      </div>)
              }
        


                    {togglepage===1?(
          <Table
        className="custom-table mt-[2vw]"
        columns={columns}
        dataSource={currentItems}
        pagination={false}
      />
      
      
                    ):(<Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue }) => (
                        <Form className="p-[1vw]">
                          <div>
                            <label
                              htmlFor="title"
                              className="block text-[1.1vw] font-medium text-[#1f487c]"
                            >
                              Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
              
                          {/* Body Field */}
                          <div>
                            <label
                              htmlFor="body"
                              className="block text-[1.1vw] font-medium text-[#1f487c]"
                            >
                              Body
                            </label>
                            <Field
                              name="body"
                              as="textarea"
                              rows="3"
                              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
                            />
                            <ErrorMessage
                              name="body"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
              
                          {/* Image Field */}
                          <div>
                            <label
                              htmlFor="image"
                              className="block text-[1.1vw] font-medium text-[#1f487c]"
                            >
                              Image
                            </label>
                            <input
                              name="image"
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={(event) => {
                                setFieldValue("image", event.currentTarget.files[0]);
                              }}
                              className="mt-1 block w-full text-sm text-gray-500"
                            />
                            <ErrorMessage
                              name="image"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
              
                          {/* Submit Button */}
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="w-[10vw] rounded-[.5vw] bg-[#1f487c] text-white  px-4 py-2 mt-[2vw] rounde transition"
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>)}

                    <ModalPopup

        show={isModalOpen}
        onClose={closeModal}
        width="25vw"
        height="15vw"
        closeicon={false}
      >
        {currentTheme && (
          <div className="relative w-full h-full">
            {/* {isLoading && (
              <Spin size="large" className="absolute w-full h-full flex justify-center items-center z-10 backdrop-blur-sm"/>
            )} */}
            <img
                  src={currentTheme.image_path ? `${apiImageUrl}${currentTheme.image_path}` : Noimage}
                  alt={`${currentIndex}`}
                  className="absolute bottom-0 w-full h-[12vw]"
                />
            
          </div>
        )}
      </ModalPopup>
      <div>
{notifications?.length > itemsper && (
 
  
  <div className="flex justify-end pt-4 pr-2">
  <ReactPaginate
    activePage={activePage}
    itemsCountPerPage={itemsper}
    totalItemsCount={notifications?.length}
    pageRangeDisplayed={3}
    onChange={handlePageChange}
    itemClass="page-item"
    linkClass="page-link "
    activeClass="active"
    prevPageText={
    <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
  }
    nextPageText={
    <FontAwesomeIcon icon={faChevronRight} size="1x" />
  }
    firstPageText={
    <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />
  }
    lastPageText={
    <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
  }
  />
</div>


)}




</div>


  

    </div>
  );
};

export default BulkMobileNotification;
