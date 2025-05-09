import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import UserManagementList from "./Componenets/UserManagement/UserManagementList";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Componenets/Dashboard/Dashboard";
import Roles from "./Componenets/Roles/Roles";
import Reports from "./Componenets/Reports/Reports";
import Advertisement from "./Componenets/Ads/Ads";
import Settings from "./Componenets/Settings/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProfileRegister from "./Componenets/Login/Login";
// import LoginPage from "./Componenets/Login/Login";
import RequestManagement from "./Componenets/RequestManagement/RequestManagement";
import Promotion from "./Componenets/Promotion/Promotion";
import RecycleBin from "./Componenets/RecycleBin/RecycleBin";
import Support from "./Componenets/Support/Support";
// import Login from "./Componenets/Login/Login";
import Offers from "./Componenets/Offers/Offers";
import Subscription from "./Componenets/Subscription/Subscription";
import Notification from "./Componenets/Notification/Notification";
// import ProductOwner from "./Componenets/Login/ProductOwner";
// import Employee from "./Componenets/Login/Employee";
// import Operator from "./Componenets/Login/Operator";
// import Partner from "./Componenets/Login/Partner";
import ProductOwnerLoginPage from "./Componenets/LoginPage/ProductOwner";
import OperatorLoginPage from "./Componenets/LoginPage/Operator";
import OwnerEmployeeLoginPage from "./Componenets/LoginPage/OwnerEmployee";
import PartnerLoginPage from "./Componenets/LoginPage/Partner";
import OperatorEmployeeLoginPage from "./Componenets/LoginPage/OperatorEmployee";
import BookingTable from "./Componenets/Dashboard/BookingTable";
// import dotenv from 'dotenv';
// dotenv.config();
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CancelTable from "./Componenets/Dashboard/CancelTable";
import Payments from "./Componenets/Payments/Payments";
import BackUp from "./Componenets/BackUp/BackUp";

function App() {
  // const [authtoken, setAuthtoken] = useState(sessionStorage.getItem("token"));
  const [authtoken, setAuthtoken] = useState(sessionStorage.getItem("token"));
  // const navigate = useNavigate();
  // const location = useLocation();
  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthtoken(token);
    }
  }, []);

  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // }
  console.log(authtoken, "authtoken852");
  const searchby = ["Operator name", "Phone", "Email"];
  const [currentSearch, setCurrentSearch] = useState(searchby[0]);

  useEffect(() => {
    // Function to reset localStorage when back navigation occurs
    const resetLocalStorageOnBack = () => {
      const historyState = window.history.state;
      // Check if it's the last page or any other condition for final back navigation
      if (historyState && historyState.idx === 0) {
        localStorage.clear(); // Reset the localStorage here
        sessionStorage.clear();
        window.location.reload();
        console.log("localStorage reset on last back navigation");
      } 
    };
    // Add event listener for popstate event
    window.addEventListener("popstate", resetLocalStorageOnBack);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", resetLocalStorageOnBack);
    };
  }, []);

  //--------------------------------handles logged in user manually entering / path
  useEffect(() => {
    if (authtoken && window.location.pathname === '/') {
      sessionStorage.removeItem('token');
      setAuthtoken(null);
      window.location.reload();
    }
  }, [authtoken]);

  // useEffect(() => {
  //   if (location.pathname === '/dashboard' && !authtoken) {
  //     navigate('/');
  //   }

  //   const handlePopState = () => {
  //     if (location.pathname === '/dashboard') {
  //       setAuthtoken(null);
  //       navigate('/');
  //     }
  //   };

  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [authtoken, location.pathname, navigate]);

  return (
    <Router>
      <ToastContainer />
      {authtoken ? (
        <>
          <div className={`h-screen w-full pb-[6vw]`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payments" element={<Payments/>}/>
              <Route path="/usermanagement" element={<UserManagementList />} />
              <Route path="/discounts" element={<Offers />} />
              <Route path="/ads" element={<Advertisement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/reports" element={<Reports />} />
              <Route
                path="/requestmanagement"
                element={<RequestManagement />}
              />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/recyclebin" element={<RecycleBin />} />
              <Route path="/support" element={<Support />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/backup" element={<BackUp/>} />
            </Routes>
          </div>
          <Sidebar />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<ProductOwnerLoginPage setAuthtoken={setAuthtoken} />}
          />
          <Route
            path="/poemployee"
            element={<OwnerEmployeeLoginPage setAuthtoken={setAuthtoken} />}
          />
          <Route
            path="/opemployee"
            element={<OperatorEmployeeLoginPage setAuthtoken={setAuthtoken} />}
          />
          <Route path="/operator" element={<OperatorLoginPage />} />
          <Route
            path="/partner"
            element={<PartnerLoginPage setAuthtoken={setAuthtoken} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;

// const WrappedApp = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default WrappedApp;
