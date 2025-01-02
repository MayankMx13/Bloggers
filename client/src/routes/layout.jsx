
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

function Layout() {

    return (
        <div className="layout ">
            <div className="navbar px-10 md:px-20 lg:px-32">
                <Navbar />
            </div>
            <div className="content px-10 md:px-20 lg:px-32">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}


export default Layout