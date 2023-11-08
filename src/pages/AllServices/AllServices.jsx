import React, { useContext } from 'react';
import useAllServices from '../../hooks/useAllServices';
import Loader from '../../common/Loader';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserProvider } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';




const AllServices = () => {
    const { isPending, error, data } = useAllServices();
    const { user } = useContext(UserProvider)
    const cemail = user.email;
    const [search, setSearch] = useState('');
    const [seeMore, setSeeMore] = useState(false)
    if (isPending) return <Loader></Loader>

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='dark:bg-gray-900'>
            <Helmet>
                <title>All services</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <div className='py-8'> <input className='block w-1/2 px-5 py-3 mx-auto text-sm border border-gray-200 rounded-full focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' onChange={(e) => setSearch(e.target.value)} type="search" placeholder='Search Your services name' /></div>

            {
                seeMore ? <div className='gap-5'>
                    {
                        data.filter((user) => {
                            return search.toLowerCase() === '' ? user : (user.serviceName.toLowerCase().includes(search) || user.userName.toLowerCase().includes(search))
                        }).map((user, i) => {
                            return <Link to={`/services/${user._id}`} key={i} class="relative overflow-hidden">
                                <div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
                                    <div aria-hidden="true" class="flex absolute left-0 -z-[1]">
                                        <div class="bg-purple-200 opacity-20 blur-3xl w-[1036px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
                                    </div>
                                    <div class="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
                                        <div class=" lg:block lg:col-span-2">
                                            <img class="rounded-xl lg:w-[410px] w-full h-[273px]" src={user?.serviceImage} alt="Image Description" />
                                        </div>
                                        <div class="lg:col-span-4">
                                            <blockquote>
                                                <div class="relative">
                                                    <p class="text-xl italic font-bold text-gray-800 dark:text-white">
                                                        {user?.serviceName}
                                                    </p>
                                                </div>
                                                <div class="relative ">
                                                    <p class="text-md italic pt-2 font-semibold text-gray-500 dark:text-white">
                                                        Service price≻ {user?.price} $
                                                    </p>
                                                </div>
                                                <p class="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                                                    {user?.textarea?.substring(0, 100) + `${user?.textarea?.length > 100 ? '.....' : ''}`}
                                                </p>
                                                <footer class="mt-3">
                                                    <div class="flex items-center">

                                                        <blockquote class="relative">
                                                            <svg class="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200 dark:text-gray-800" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                                                            </svg>

                                                            <div class="relative z-10">
                                                                <p class="text-xl italic text-gray-800 dark:text-white">
                                                                    {user?.category}
                                                                </p>
                                                            </div>
                                                            <div class="relative z-10 cursor-pointer">
                                                                <Link to={`/services/${user._id}`} class="text-md pt-3 italic  dark:text-white font-semibold  hover:text-blue-500 text-gray-800">
                                                                    View Details ⋙
                                                                </Link>
                                                            </div>

                                                            <footer class="mt-6">
                                                                <div class="flex items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img class="h-8 w-8 rounded-full" src={user?.userPhoto} alt="Image Description" />

                                                                    </div>
                                                                    <div class="grow ml-4">
                                                                        <div class="font-semibold text-gray-800 dark:text-gray-200">{user?.userName} {cemail == user?.userEmail ? <span className="text-white bg-gray-500 badge">You</span> : ''}</div>
                                                                        <div class="text-xs text-gray-500">{user?.userEmail} | {user?.serviceArea}</div>

                                                                    </div>
                                                                </div>
                                                            </footer>
                                                        </blockquote>


                                                    </div>
                                                </footer>
                                            </blockquote>

                                        </div>

                                    </div>

                                </div>
                            </Link>
                        })
                    }
                </div> : <div className='gap-5'>
                    {
                        data.slice(0, 6).filter((user) => {
                            return search.toLowerCase() === '' ? user : (user.serviceName.toLowerCase().includes(search) || user.userName.toLowerCase().includes(search))
                        }).map((user, i) => {
                            return <Link to={`/services/${user._id}`} key={i} class="relative overflow-hidden">
                                <div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
                                    <div aria-hidden="true" class="flex absolute left-0 -z-[1]">
                                        <div class="bg-purple-200 opacity-20 blur-3xl w-[1036px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
                                    </div>
                                    <div class="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
                                        <div class=" lg:block lg:col-span-2">
                                            <img class="rounded-xl lg:w-[410px] w-full h-[273px]" src={user?.serviceImage} alt="Image Description" />
                                        </div>
                                        <div class="lg:col-span-4">
                                            <blockquote>
                                                <div class="relative">
                                                    <p class="text-xl italic font-bold text-gray-800 dark:text-white">
                                                        {user?.serviceName}
                                                    </p>
                                                </div>
                                                <div class="relative ">
                                                    <p class="text-md italic pt-2 font-semibold text-gray-500 dark:text-white">
                                                        Service price≻ {user?.price} $
                                                    </p>
                                                </div>
                                                <p class="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                                                    {user?.textarea?.substring(0, 100) + `${user?.textarea?.length > 100 ? '.....' : ''}`}
                                                </p>
                                                <footer class="mt-3">
                                                    <div class="flex items-center">

                                                        <blockquote class="relative">
                                                            <svg class="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200 dark:text-gray-800" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                                                            </svg>

                                                            <div class="relative z-10">
                                                                <p class="text-xl italic text-gray-800 dark:text-white">
                                                                    {user?.category}
                                                                </p>
                                                            </div>
                                                            <div class="relative z-10 cursor-pointer">
                                                                <Link to={`/services/${user._id}`} class="text-md pt-3 italic  dark:text-white font-semibold  hover:text-blue-500 text-gray-800">
                                                                    View Details ⋙
                                                                </Link>
                                                            </div>

                                                            <footer class="mt-6">
                                                                <div class="flex items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img class="h-8 w-8 rounded-full" src={user?.userPhoto} alt="Image Description" />

                                                                    </div>
                                                                    <div class="grow ml-4">
                                                                        <div class="font-semibold text-gray-800 dark:text-gray-200">{user?.userName} {cemail == user?.userEmail ? <span className="text-white bg-gray-500 badge">You</span> : ''}</div>
                                                                        <div class="text-xs text-gray-500">{user?.userEmail} | {user?.serviceArea}</div>

                                                                    </div>
                                                                </div>
                                                            </footer>
                                                        </blockquote>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            }



            {
                !seeMore && <div className='text-center py-10'>
                    <button onClick={() => setSeeMore(true)} type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Show All
                        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>
                </div>
            }


        </div>
    )

};

export default AllServices;