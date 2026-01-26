import { useAuthActions } from "@convex-dev/auth/react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";

const LoginForm = () => {

    const {signIn} = useAuthActions();

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to
                        your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-black-100">Email
                                address</label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" required autoComplete="email"
                                       className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium text-black-100">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-cyan-600 hover:text-sky-600">Forgot
                                        password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" required
                                       autoComplete="current-password"
                                       className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <motion.button
                                whileHover={{scale: 1.05, y: -5}}
                                transition={{duration: 0.3, type: "spring", stiffness: 100}}
                                className="w-full rounded-full bg-sky-600 px-6 py-3 text-white font-medium shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                            >

                                    Sign in

                            </motion.button>

                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign-Up Button */}
                        <motion.button
                            type="button"
                            onClick={() => signIn("google", { redirectTo: "http://localhost:5173/login" })}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50
                         border border-gray-300 rounded-full px-8 py-3.5
                         font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200"
                        >
                            <FcGoogle size={22} />
                            <span>Sign in with Google</span>
                        </motion.button>



                    </form>


                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Not a member?
                        <Link to="/sign-up" className="font-semibold text-indigo-400 hover:text-indigo-300"> Sign up now!</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginForm;