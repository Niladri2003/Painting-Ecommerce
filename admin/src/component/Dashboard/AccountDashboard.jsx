import axios from "axios";
import {BASEAPI} from "../../utils/BASEAPI.js";
import {useEffect, useState} from "react";
import{logout} from "../../redux/authSlice.js";
import { useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";

// Helper function to format date as DD-MM-YYYY
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
const AccountDashboard =()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [S3Details, sets3Details] = useState([]);
    const[GalleryImage, setGalleryImage] = useState([]);
    const[CoverImage,setCoverImage] = useState([]);
    const[username,setUsername] = useState("");
    const[UserDetails,setUserDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startTime, setStartTime] = useState("13-07-2024");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState(null);
    const  token  = JSON.parse(localStorage.getItem("token"))
    const Id=JSON.parse(localStorage.getItem("user"))

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        // Set endTime to current date if token is available
        if (token) {
            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);
           // console.log(formattedDate)// Get the date in YYYY-MM-DD format
            setEndTime(formattedDate);
            GetS3Metrics(formattedDate);
            GetUserInfo();
        }
    }, [token]);

    const GetS3Metrics = async (currentEndTime) => {
        const formData = new FormData();
        formData.append('start_time', startTime);
        formData.append('end_time', currentEndTime); // Use currentEndTime here

        try {
            const response = await axios.post(`${BASEAPI}/v2/metrics`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;
            //console.log((data.data.MetricDataResults[0].Values[0]) / (1024 * 1024));
            sets3Details(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch images');
            setLoading(false);
        }
    };
    const GetUserInfo=async ()=>{
        const Id = JSON.parse(localStorage.getItem("user"));
        //console.log("token", token, "id", Id);
        const formData = new FormData();
        formData.append('Id', Id);
        formData.append('token', token);
        try {
            const UserInfo = await axios.post(`${BASEAPI}/v2/get-user-details`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const userData = UserInfo.data.user
            setUserDetails(userData)
            setGalleryImage(userData.GalleryImage.length)
            setCoverImage(userData.CoverImage.length)
            setUsername(userData.Username)
           // console.log(userData);
        }catch (error){
            console.log("Error while getting User-info")

        }
    }

    const hasData = S3Details && S3Details.data && S3Details.data.MetricDataResults.length > 0;
    const bucketSizeValues = hasData ? S3Details.data.MetricDataResults[0].Values[0] : [];
    const numberOfObjectsValues = hasData ? S3Details.data.MetricDataResults[1].Values[0] : [];
    //console.log(numberOfObjectsValues)

    return <div className=" w-full rounded overflow-hidden shadow-lg ">

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Account
                            Overview</h3>
                        <p className="text-sm text-muted-foreground">View your account details and manage your
                            profile.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Username</span>
                                <span className="text-sm text-muted-foreground">{username}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">User ID</span>
                                <span className="text-sm text-muted-foreground">{Id}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Plan</span>
                                <span className="text-sm text-muted-foreground">Pro</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Expires</span>
                                <span className="text-sm text-muted-foreground">2024-07-21</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Manage Account
                        </button>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Log out
                        </button>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Notifications</h3>
                        <p className="text-sm text-muted-foreground">View and manage your notification settings.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">New Announcements</span>
                                <button
                                    type="button"
                                    role="switch"
                                    defaultChecked={"true"}
                                    data-state="checked"
                                    value="on"
                                    className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                    aria-label="New Announcements"
                                >
                  <span
                      data-state="checked"
                      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                  ></span>
                                </button>
                                <input
                                    type="checkbox"
                                    aria-hidden="true"
                                    className="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                                    tabIndex="-1"
                                    checked=""
                                    value="on"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Product Updates</span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked="true"
                                    data-state="checked"
                                    value="on"
                                    className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                    aria-label="Product Updates"
                                >
                  <span
                      data-state="checked"
                      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                  ></span>
                                </button>
                                <input
                                    type="checkbox"
                                    aria-hidden="true"
                                    className="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                                    tabIndex="-1"
                                    checked=""
                                    value="on"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Security Alerts</span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked="true"
                                    data-state="checked"
                                    value="on"
                                    className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                    aria-label="Security Alerts"
                                >
                  <span
                      data-state="checked"
                      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                  ></span>
                                </button>
                                <input
                                    type="checkbox"
                                    aria-hidden="true"
                                    className="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                                    tabIndex="-1"
                                    checked=""
                                    value="on"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Billing Reminders</span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked="true"
                                    data-state="checked"
                                    value="on"
                                    className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                    aria-label="Billing Reminders"
                                >
                  <span
                      data-state="checked"
                      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                  ></span>
                                </button>
                                <input
                                    type="checkbox"
                                    aria-hidden="true"
                                    className="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                                    tabIndex="-1"
                                    checked=""
                                    value="on"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Manage Notifications
                        </button>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                            Gallery &amp; Cover Images
                        </h3>
                        <p className="text-sm text-muted-foreground">Manage your gallery and cover images for your
                            account.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Gallery Images</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    GalleryImage ? (
                                        `${GalleryImage} images`
                                    ) : (
                                        "Nill"
                                    )
                                )}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Cover Image</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    CoverImage ? (
                                        `${CoverImage} images`
                                    ) : (
                                        "Nill"
                                    )
                                )}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Birthday Images</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    UserDetails.BirthdayPhotography ? (
                                        `${UserDetails.BirthdayPhotography.length} images`
                                    ) : (
                                        "0 images"
                                    )
                                )}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Candid Images</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    UserDetails.CandidPhotography ? (
                                        `${UserDetails.CandidPhotography.length} images`
                                    ) : (
                                        "0 images"
                                    )
                                )}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Maternity Images</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    UserDetails.MaternityPhotography ? (
                                        `${UserDetails.MaternityPhotography.length} images`
                                    ) : (
                                        "0 images"
                                    )
                                )}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Prewedding Images</span>
                                <span className="text-sm text-muted-foreground">{loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    UserDetails.PreWeddingPhotography ? (
                                        `${UserDetails.PreWeddingPhotography.length} images`
                                    ) : (
                                        "0 images"
                                    )
                                )}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Manage Gallery
                        </button>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Image
                            Uploader</h3>
                        <p className="text-sm text-muted-foreground">Upload and manage your images for your account.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Total Images Uploaded</span>
                                <span className="text-sm text-muted-foreground">
                                   {loading ? (
                                       <span>Loading...</span>
                                   ) : (
                                       !error && hasData ? (
                                           `${numberOfObjectsValues} images`
                                       ) : (
                                           "Nill"
                                       )
                                   )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Storage Used</span>
                                <span className="text-sm text-muted-foreground">{loading && <span>Loading...</span>}
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : (
                                        !error && hasData ? (
                                            (bucketSizeValues/ (1024 * 1024)).toFixed(1) +  "MB"// Join the values as a comma-separated string
                                        ) : (
                                            "Nill"
                                        )
                                    )}

                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Storage Limit</span>
                                <span className="text-sm text-muted-foreground">5 GB</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Manage Images
                        </button>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Services</h3>
                        <p className="text-sm text-muted-foreground">View and manage the services you have access
                            to.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Image Optimization</span>
                                <div
                                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    data-v0-t="badge"
                                >
                                    Active
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Custom Domain</span>
                                <div
                                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    data-v0-t="badge"
                                >
                                    Active
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Analytics &amp; Reporting</span>
                                <div
                                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                                    data-v0-t="badge"
                                >
                                    Inactive
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Collaboration Tools</span>
                                <div
                                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                                    data-v0-t="badge"
                                >
                                    Inactive
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Manage Services
                        </button>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Contact
                            Us</h3>
                        <p className="text-sm text-muted-foreground">
                            Get in touch with our support team for any questions or issues.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Support Email</span>
                                <a href="#" className="text-sm text-muted-foreground hover:underline">
                                    support@acme.com
                                </a>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Support Phone</span>
                                <a href="#" className="text-sm text-muted-foreground hover:underline">
                                    +1 (555) 555-5555
                                </a>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Support Hours</span>
                                <span className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
    </div>
}
export default AccountDashboard;