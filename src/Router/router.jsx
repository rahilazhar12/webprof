import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Adminregister from "../Screens/Admin/Adminregister";
import Sidebar from "../Components/Sidebar/Sidebar";
import Addstaff from "../Screens/Staff/Addstaff";
import Staffreport from "../Screens/Reports/Staffreport";
import Stafflogin from "../Screens/Staff/Stafflogin";
import Adminlogin from "../Screens/Admin/Adminlogin";
import Viewreport from "../Screens/Reports/Viewreport";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index:true, element: <Stafflogin /> },
      { path: "admin-login", element: <Adminlogin /> },
      
  ],
  },
  {
    path: "/dashboard",
    element: <Sidebar />,
    children: [
        { path: "add-staff", element: <Addstaff /> },
        { path: "staff-report", element: <Staffreport /> },
        { path: "view-report", element: <Viewreport /> }
    ],
  },
  {
    path: "/admin-register",
    element: <Adminregister />,
  },
]);

export default router;
