import React,{useState} from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate} from "react-router-dom";
import Cover2 from "../assets/Cover/cover-2.jpg";
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/authSlice.js";
import {
    useToast
} from '@chakra-ui/react';



export function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast=useToast({position: 'top',})

    const handleLogin = async () => {
        try {
          const data = await dispatch(loginUser({email, password}));
           // console.log("Login Response",data);
            if (data.payload.error) {
                toast({
                    title: 'Login failed.',
                    description: data.payload?.error || 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }else{
                toast({
                    title: 'Login successful.',
                    description: 'Redirecting to Dashboard...',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setTimeout(() => {
                    navigate('/dashboard/account-dashboard');
                }, 3000);
            }
        }catch (err){
            toast({
                title: 'Login failed.',
                description: err.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.log(err)
        }

        };
    return (
        <section>
            <div className="flex lg:flex-row flex-col w-screen h-screen items-center justify-center ">
                <div
                    className="flex lg:w-[50%] w-full flex-col items-center lg:justify-around justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-16 lg:py-24">
                    <div className="w-full  ">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Log in</h2>
                        <p>Foreverknots Admin Section</p>
                        {/*<p className="mt-2 text-sm text-gray-600">*/}
                        {/*    Don&apos;t have an account?{' '}*/}
                        {/*    <Link to={"/signup"}>*/}
                        {/*    <span*/}

                        {/*        className="font-semibold text-black transition-all duration-200 hover:underline"*/}
                        {/*    >*/}
                        {/*        Create a free account*/}
                        {/*    </span>*/}
                        {/*    </Link>*/}
                        {/*</p>*/}

                        <form action="#" method="POST" className="mt-8 lg:w-[80%]">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            password{' '}
                                        </label>
                                        {/*<a*/}
                                        {/*    href="#"*/}
                                        {/*    title=""*/}
                                        {/*    className="text-sm font-semibold text-black hover:underline"*/}
                                        {/*>*/}
                                        {/*    {' '}*/}
                                        {/*    Forgot password?{' '}*/}
                                        {/*</a>*/}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleLogin}
                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started <ArrowRight className="ml-2" size={16}/>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="h-[80%] w-[50%] relative flex items-center bg-red-300 justify-center rounded-md  ">
                    <img
                        className="h-full w-full rounded-md object-cover"
                        src={Cover2}
                        alt=""
                    />
                    <div
                        className="absolute inset-0 bg-black opacity-65 transition-opacity duration-300 rounded-md "></div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-md ">
                        <span className="text-white text-3xl font-[700] font-Jost">ForeverKnots Admin Page</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
