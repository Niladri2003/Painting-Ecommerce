import React, {useRef, useEffect, useState} from "react";
import { dashboardLinks } from "../../utils/sidebarLink.js";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import {  Link, Text, useColorModeValue } from "@chakra-ui/react";


const Sidebar = ({isSidebarOpen,toggleSidebar,setIsSidebarOpen}) => {
    const sidebarRef = useRef(null);
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };


    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (

        <aside
            ref={sidebarRef}
            className={`bg-white fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background p-6 transition-transform duration-300 ease-in-out lg:static lg:flex lg:translate-x-0 ${
                 (isSidebarOpen ? "translate-x-0" : "-translate-x-full")
            }`}
        >
            <div className="mb-6">
                <a className="flex items-center gap-2 font-bold" href="#">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                    >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                        <path d="M12 3v6"></path>
                    </svg>
                    <span>ForeverKnots</span>
                </a>
            </div>
            <nav className={"flex flex-1 flex-col space-y-1"}>
                {dashboardLinks.map((link) => (
                    <Link
                        as={NavLink}
                        to={link.path}
                        key={link.id}
                        rounded="md"
                        className={"flex items-center gap-2 px-3 py-2 text-sm font-medium"}
                        bg={matchRoute(link.path) ? "blue.500" : "transparent"}
                        color={matchRoute(link.path) ? "white" : useColorModeValue("gray.700", "gray.400")}
                        fontWeight={matchRoute(link.path) ? "bold" : "normal"}
                        _hover={{
                            textDecoration: "none",
                            bg: useColorModeValue("blue.100", "blue.700"),
                            color: useColorModeValue("gray.800", "white"),
                        }}
                        onClick={() => toggleSidebar(false)}
                    >   <span
                        dangerouslySetInnerHTML={{__html: link.icon}}
                        className="icon" // Optionally, you can add a class for styling the SVG
                    />
                        <Text>{link.name}</Text>

                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
