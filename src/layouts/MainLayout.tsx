import {Outlet} from "react-router_dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
export default function MainLayout(){
    return(
        <div>
            <Header/>
            <main><Outlet/></main>
            <Footer/>
        </div>
    );
}