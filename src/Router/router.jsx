import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Adminregister from "../Screens/Admin/Adminregister";
import Sidebar from "../Components/Sidebar/Sidebar";
import Addstaff from "../Screens/Staff/Addstaff";
import Staffreport from "../Screens/Reports/Staffreport";
import Stafflogin from "../Screens/Staff/Stafflogin";
import Adminlogin from "../Screens/Admin/Adminlogin";
import Viewreport from "../Screens/Reports/Viewreport";
import ProtectedRoutes from "../Components/ProtectedRoutes/ProtectedRoutes";
import UnauthorizedAccess from "../Screens/Error/Unathorizedaccess";
import WelcomePage from "../Screens/Welocme/Welcomepage"; // Corrected path spelling
import Markattendence from "../Screens/Attendence/Markattendence";
import AttendanceTable from "../Screens/Reports/Attendancestaff";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Stafflogin /> },
      { path: "admin-login", element: <Adminlogin /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Sidebar />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "add-staff", element: <ProtectedRoutes element={<Addstaff />} allowedRoles={["Admin"]} /> },
      { path: "staff-attendance-report", element: <ProtectedRoutes element={<AttendanceTable/>} allowedRoles={["Admin"]} /> },
      { path: "staff-report", element: <Staffreport /> },
      { path: "staff-attendence", element: <Markattendence/> },
      { path: "view-report", element: <ProtectedRoutes element={<Viewreport />} allowedRoles={["Admin"]} /> },
    ],
  },
  {
    path: "/admin-register",
    element: <ProtectedRoutes element={<Adminregister />} allowedRoles={["Admin"]} />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedAccess />, // Use a specific path for unauthorized access
  },
]);

export default router;
