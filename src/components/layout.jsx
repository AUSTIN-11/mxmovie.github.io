import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Layout = ({children}) => {
    const [searchValue, setSearchValue] =useState('');
    console.log("searchValue: " + searchValue);
    return (
        <div>
            <Navbar />
            <SearchBar setSearchValue={setSearchValue}/>
            <main>
                {children}
                <Outlet/>
            </main>
            <Footer />
        </div>

    );
};  
export default Layout;