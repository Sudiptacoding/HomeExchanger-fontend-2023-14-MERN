import React, { useContext, useState } from 'react';
import { UserProvider } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import swal from 'sweetalert';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { Helmet } from 'react-helmet';

const Registration = () => {
    const { createUser, setUserPhoto, handelGoogle } = useContext(UserProvider)
    const axiosAuth = useAxios()
    const [see, setSee] = useState(true)
    const [img, setImg] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    const handelFileData = (e) => {
        const imgbbApiKey = '9d5e814c7c5f4867978ca6169e144b8b';
        const selectedFile = e.target.files[0];
        const inputType = selectedFile.type.split('/')[1];
        if (inputType !== 'png' && inputType !== 'jpeg') {
            toast.error("Please input jpeg/png image")
            return
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
        })
            .then(response => {
                const imageUrl = response.data.data.url;
                setImg(imageUrl)
                toast.success('Image upload sucessfylly !')
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handelRegistration = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = img;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
        if (!checkbox) {
            toast.error("Please add Terms and Conditions")
            return
        }

        const isValidCarPassword = /^(?=.*[A-Z]).+$/.test(password);
        const isValidSpacialPassword = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/.test(password);

        if (password.length < 6) {
            toast.error("PLease provide 6 character password")
            return
        }

        if (!isValidCarPassword) {
            toast.error("PLease provide capital letter")
            return
        }
        if (!isValidSpacialPassword) {
            toast.error("PLease provide special character")
            return
        }
        createUser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo || "https://www.w3schools.com/howto/img_avatar.png"
                }).then(() => {
                    toast.success('User created successfully !')
                    axiosAuth.post('/jwt', { email })
                        .then(() => {
                            swal("Sucess!", `User created sucessfully`, "success");
                            navigate(location?.state ? location.state : '/')
                        })
                    setUserPhoto(photo)
                }).catch((error) => {
                    console.log(error)
                });
            }).catch(() => {
                toast.error("User alrady created. please add new email")
            })
    }

    // const handelGoogleSignin = () => {
    //     handelGoogle()
    //         .then(res => {
    //             const email = res.user.email
    //             axiosAuth.post('/jwt', { email })
    //                 .then(() => {
    //                     swal("Sucess!", `User created sucessfully`, "success");
    //                     navigate(location?.state ? location.state : '/')
    //                 })
    //         })
    // }

    return (
        <div>
            <Helmet>
                <title>HomeExchanger-Registration</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <section className="">
                <div className="flex flex-col items-center justify-start h-fit py-5 mx-auto shadow lg:pt-20 dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full rounded-lg shadow-none lg:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 backdrop-blur-xl">
                        <div className="space-y-4 p-7 lg:p-6 md:space-y-6 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your Free Account
                            </h1>
                            {/* <a onClick={handelGoogleSignin} class="flex items-center justify-center cursor-pointer w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-[#f9fafb] hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                                <img class="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
                               
                            </a> */}
                            {/* <div class="flex items-center mb-3">
                                <hr class="h-0 border-b border-solid border-grey-500 grow" />
                                <p class="mx-4 text-grey-600">or</p>
                                <hr class="h-0 border-b border-solid border-grey-500 grow" />
                            </div> */}
                            <form onSubmit={handelRegistration} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required={true} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please select your profile image</label>
                                    <input onChange={handelFileData} type="file" name="file-input" id="file-input" className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" required={true} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required={true} />
                                </div>
                                <div className='relative'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye className='dark:text-white'></AiOutlineEye> : <AiOutlineEyeInvisible className='dark:text-white'></AiOutlineEyeInvisible>} </span>
                                </div>
                                <div className="inline-flex items-center " style={{ marginTop: '0px' }}>
                                    <label
                                        className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                                        data-ripple-dark="true"
                                    >
                                        <input
                                            type="checkbox"
                                            name='checkbox'
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-pink-500 hover:before:opacity-10"
                                            id="checkbox"
                                        />
                                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label
                                        className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                    >
                                        <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-white">
                                            I agree the
                                            <Link
                                                className="font-medium transition-colors hover:text-pink-500"
                                            >
                                                &nbsp;Terms and Conditions
                                            </Link>
                                        </p>
                                    </label>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-blue-600 hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Registration;