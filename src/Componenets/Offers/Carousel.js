// import { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function Carousel({ children: slides }) {
//     const [curr, setCurr] = useState(0)
//     const prev = () =>
//         setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
//     const next = () =>
//         setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
//     return (
//         <div className="overflow-hidden relative">
//             <div className="flex transition-transform ease-out duration-500"
//             style={{transform:`translaateX(-${curr * 100}%)`}}>{slides}</div>
//             <div className="absolute inset-0 flex items-center justify-between">
//                 <button
//                     onClick={prev}
//                     className="p-1 rounded-full shadow bg-white text-gray-600 hover:bg-white">
//                     <FaChevronLeft />
//                 </button>
//                 <button
//                     onClick={next}
//                     className="p-1 rounded-full shadow bg-white text-gray-600 hover:bg-white">
//                     <FaChevronRight />
//                 </button>
//             </div>
//         </div>
//     )
// }




// import { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function Carousel({ children: slides }) {
//     const [curr, setCurr] = useState(0);

//     const prev = () => {
//         setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
//     };

//     const next = () => {
//         setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
//     };

//     return (
//         <div className="overflow-hidden relative">
//             <div
//                 className="flex transition-transform ease-out duration-500"
//                 style={{ transform: `translateX(-${curr * 100}%)` }}
//             >
//                 {slides.map((slide, index) => (
//                     <div key={index} className="flex-shrink-0 w-full">
//                         {slide}
//                     </div>
//                 ))}
//             </div>

//             <div className="absolute inset-0 flex items-center justify-between">
//                 <button
//                     onClick={prev}
//                     className="p-1 rounded-full shadow bg-white text-gray-600 hover:bg-white"
//                 >
//                     <FaChevronLeft />
//                 </button>
//                 <button
//                     onClick={next}
//                     className="p-1 rounded-full shadow bg-white text-gray-600 hover:bg-white"
//                 >
//                     <FaChevronRight />
//                 </button>
//             </div>
//         </div>
//     );
// }
