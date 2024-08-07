import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ProductOwner from "./Componenets/Login/ProductOwner";
import Employee from "./Componenets/Login/Employee";
import Operator from "./Componenets/Login/Operator";
import Partner from "./Componenets/Login/Partner";
import ProductOwnerLoginPage from "./Componenets/LoginPage/ProductOwner";
import OperatorLoginPage from "./Componenets/LoginPage/Operator";
import OwnerEmployeeLoginPage from "./Componenets/LoginPage/OwnerEmployee";

function App() {
  const [authtoken, setAuthtoken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthtoken(token);
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      {authtoken ? (
        <>
          <div className={`h-screen w-full pb-[6vw]`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/usermanagement" element={<UserManagementList />} />
              <Route path="/discounts" element={<Offers />} />
              <Route path="/ads" element={<Advertisement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/requestmanagement" element={<RequestManagement />} />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/recyclebin" element={<RecycleBin />} />
              <Route path="/support" element={<Support />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
          </div>
          <Sidebar />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<ProductOwnerLoginPage setAuthtoken={setAuthtoken} />} />
          <Route path="/employee" element={<OwnerEmployeeLoginPage />} />
          <Route path="/operator" element={<OperatorLoginPage />} />
          <Route path="/partner" element={<Partner />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

