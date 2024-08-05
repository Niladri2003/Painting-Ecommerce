import React, {useState} from 'react';
import Sidebar from "../component/Dashboard/Sidebar.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import {dashboardLinks} from "../utils/sidebarLink.js";

const Dashboard = () => {
    const location=useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log("clicked")
        console.log(isSidebarOpen)
    };
    return (
        <Box
            mx="auto"
            p={4}
            w="full"
            fontFamily="Roboto"

        >
            {/*direction={{base: "row", lg: "row"}} w="full" gap={4}*/}
            <div className={"flex flex-row w-full"}>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} />
                <div className={"flex flex-col w-full h-screen"}>
                <DashHeader toggleSidebar={toggleSidebar} currentPath={location.pathname} />
                <Box
                    flex="1"
                    h="calc(100vh)"
                    w={"full"}
                    p={4}
                    overflowY="scroll"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                >
                    <Outlet/>
                </Box>
                </div>
            </div>
        </Box>
    );
};

export default Dashboard;

const DashHeader = ({ toggleSidebar, currentPath }) => {
    const breadcrumbMap = dashboardLinks.reduce((acc, link) => {
        acc[`/${link.path}`] = link.name;
        return acc;
    }, {});
//console.log(currentPath);

    const currentBreadcrumb = breadcrumbMap[currentPath] || "Dashboard";
    //console.log(breadcrumbMap[currentPath]);
   // console.log(dashboardLinks)

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center border-b bg-background px-2 shadow-sm sm:px-4 lg:px-8">
            <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 mr-2 lg:hidden"
            >
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
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
                <span className="sr-only">Toggle menu</span>
            </button>
            <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-4">
                    <nav aria-label="breadcrumb">
                        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                            <li className="inline-flex items-center gap-1.5">
                                <Link className="transition-colors hover:text-foreground lg:text-lg" to="dashboard/account-dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
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
                                    className="lucide lucide-chevron-right"
                                >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <span aria-current="page" aria-disabled="true" className="font-normal text-foreground lg:text-lg" role="link">
                                    {currentBreadcrumb}
                                </span>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="flex items-center gap-4"></div>
            </div>
        </header>
    );
};
