import React, { useContext, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserProvider } from '../../context/AuthContext';
import axios from 'axios';
import 'animate.css';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';

const AddService = () => {
    const { user } = useContext(UserProvider)
    const axiosData = useAxios();
    const [imgUplode, setImageUplode] = useState('')
    const [showImgLode, setShowImageLode] = useState(false)
    const navigate = useNavigate()
    const uploadImageToImgBB = () => {
        setShowImageLode(false)
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0';
        const fileInput = document.getElementById('fileInput');
        const selectedFile = fileInput.files[0];
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
                setImageUplode(imageUrl)
                setShowImageLode(true)
                toast.success('Image upload sucessfylly !')
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        const serviceName = e.target.serviceName.value;
        const serviceArea = e.target.serviceArea.value;
        const serviceImage = imgUplode;
        const category = e.target.category.value;
        const price = e.target.price.value;
        const textarea = e.target.textarea.value;
        const userName = user?.displayName || null
        const userEmail = user?.email || null
        const userPhoto = user?.photoURL || null
        const data = { serviceName, serviceArea, serviceImage, category, price, textarea, userEmail, userName, userPhoto }
        axiosData.post('/addservice', data)
            .then(res => {
                swal("Good job!", "You service sucessfully added!", "success");
                navigate('/')
            })
    }

    return (

        <div className='dark:bg-slate-800'>
            <Helmet>
                <title>HomeExchanger-Add services</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
                <form onSubmit={handelSubmit}>
                    <div className="bg-white shadow rounded-xl dark:bg-slate-900">
                        <div className="relative h-40 rounded-t-xl bg-[url('https://images.pexels.com/photos/1022928/pexels-photo-1022928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-cover bg-center  ">
                            <div className="absolute top-0 right-0 p-4">
                            </div>
                        </div>
                        <div className="p-4 pt-0 sm:pt-0 sm:p-7">
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="sr-only">
                                        Product photo
                                    </label>
                                    <div className="grid sm:flex sm:items-center sm:gap-x-5">
                                        <img className="relative z-10 inline-block w-24 h-24 mx-auto -mt-8 rounded-full sm:mx-0 ring-4 ring-white dark:ring-gray-800" src={user?.photoURL} alt="Image Description" />

                                        <div className="mt-4 sm:mt-auto sm:mb-1.5 flex justify-center sm:justify-start gap-2">
                                            <button data-hs-overlay="#hs-bg-gray-on-hover-cards" type="button" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                <AiOutlineEye></AiOutlineEye>
                                                View Profile
                                            </button>
                                            <Link to='/'><button type="button" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-red-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                Go Home
                                            </button></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Service Name
                                    </label>
                                    <input name='serviceName' id="af-submit-app-project-name" type="text" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter Service Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Service Area
                                    </label>
                                    <input name='serviceArea' id="af-submit-project-url" type="text" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter Service Area" />
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Service image
                                    </label>
                                    {
                                        imgUplode ? <div ><img className='h-[150px] w-full object-cover bg-center' src={imgUplode} alt="" /></div> :
                                            <label className="block p-4 text-center border-2 border-gray-200 border-dashed rounded-lg cursor-pointer group sm:p-7 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
                                                <input onChange={uploadImageToImgBB} id="fileInput" name="af-submit-app-upload-images" type="file" className="sr-only" />

                                                {
                                                    showImgLode ? <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600 animate__swing animate__animated animate__infinite infinite" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                                    </svg> : <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600 " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                                    </svg>
                                                }
                                                <span className="block mt-2 text-sm text-gray-800 dark:text-gray-200">
                                                    Browse your device
                                                </span>
                                                <span className="block mt-1 text-xs text-gray-500">
                                                    Please input jpeg/png
                                                </span>
                                            </label>
                                    }
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Category
                                    </label>
                                    <select name='category' id="af-submit-app-category" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-9 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                        <option selected>Select a category</option>
                                        <option value='Homes with swimming pool'>Homes with swimming pool</option>
                                        <option value='Pet friendly homes'>Pet friendly homes</option>
                                        <option value='Home with outdoor space'>Home with outdoor space</option>
                                        <option value='Remote friendly homes'>Remote friendly homes</option>
                                        <option value='kid friendly homes'>kid friendly homes</option>
                                        <option value='Homes with BBQ'>Homes with BBQ</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Price
                                    </label>
                                    <input name='price' id="af-submit-app-project-name" type="number" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter Service Price" />
                                </div>
                                <div className="space-y-2">
                                    <label className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                        Description
                                    </label>
                                    <textarea name='textarea' id="af-submit-app-description" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="write your service description .."></textarea>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5 gap-x-2">
                                <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                    Add Service
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div id="hs-bg-gray-on-hover-cards" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="m-3 mt-0 transition-all ease-out opacity-0 hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:max-w-lg sm:w-full sm:mx-auto">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
                        <div className="relative overflow-hidden min-h-[8rem] bg-gray-900 text-center rounded-t-xl">
                            <div className="absolute top-2 right-2">
                                <button type="button" className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm text-gray-500 transition-all rounded-md hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-bg-gray-on-hover-cards">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                            <figure className="absolute inset-x-0 bottom-0">
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 100.1">
                                    <path fill="currentColor" className="fill-white dark:fill-gray-800" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
                                </svg>
                            </figure>
                        </div>
                        <div className="relative z-10 -mt-12">
                            <span className="mx-auto flex justify-center items-center w-[62px] h-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                <img className="rounded-full" src={user?.photoURL} alt="" />
                            </span>
                        </div>
                        <div className="p-4 overflow-y-auto sm:p-7">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {user?.email}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {user?.displayName}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5 sm:mt-10 sm:grid-cols-3">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase">Email Status:</span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{user?.emailVerified ? "Valid" : "Invalid"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase">Create Date </span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{user?.metadata?.creationTime}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase">Last signin:</span>
                                    <div className="flex items-center gap-x-2">
                                        <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">{user?.metadata?.lastSignInTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-10">
                                <h4 className="text-xs font-semibold text-gray-800 uppercase dark:text-gray-200">Summary</h4>
                                <ul className="flex flex-col mt-3">
                                    <li className="inline-flex items-center px-4 py-3 -mt-px text-sm text-gray-800 border gap-x-2 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>lastLoginAt</span>
                                            <span>{user?.reloadUserInfo?.lastLoginAt}</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center px-4 py-3 -mt-px text-sm text-gray-800 border gap-x-2 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>lastRefreshAt</span>
                                            <span>{user?.reloadUserInfo?.lastRefreshAt}</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center px-4 py-3 -mt-px text-sm font-semibold text-gray-800 border gap-x-2 bg-gray-50 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-800 dark:border-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>validSince</span>
                                            <span>{user?.reloadUserInfo?.validSince}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;