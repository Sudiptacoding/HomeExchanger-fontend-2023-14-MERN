import React from 'react';

import Footer from '../../../components/Footer/Footer';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useCatagoryServices from '../../../hooks/useCatagoryServices';
import Loader from '../../../common/Loader';

const PopularSection = () => {
    const { isLoading, error, data } = useCatagoryServices();
    if (isLoading) return <Loader></Loader>
    if (error) return 'An error has occurred: ' + error.message
    return (
        <div id='popular' class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto dark:bg-gray-900">
            <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">There is a home for all your desires</h2>
                <p class="mt-1 text-gray-600 dark:text-gray-400">A selection of houses based on your favorite criteria, to live an unforgettable experience.</p>
            </div>
            <div class="grid lg:grid-cols-2 gap-6">
                {
                    data?.map(item => {
                        return <Link key={item?._id} to={`/services/${item._id}`} class="group relative block" href="#">
                            <div class="flex-shrink-0 relative w-full rounded-xl overflow-hidden  h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                                <img class="w-full h-full absolute top-0 left-0 object-cover" src={item?.serviceImage} alt="Image Description" />
                            </div>
                            <div class="absolute top-0 inset-x-0 z-10">
                                <div class="p-4 flex flex-col h-full sm:p-6 ">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0">
                                            <img class="h-[2.875rem] w-[2.875rem] border-2 border-white rounded-full" src={item?.userPhoto} alt="Image Description" />
                                        </div>
                                        <div class="ml-2.5 sm:ml-4">
                                            <h4 class="font-semibold text-white">
                                                {item?.userName}
                                            </h4>
                                            <p class="text-xs text-white/[.8]">
                                                {item?.userEmail}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="absolute bottom-0 inset-x-0 z-10">
                                <div class="flex flex-col h-full p-4 sm:p-6 bg-[#0000007d] hover:bg-[#000000ba] transition-all duration-500 cursor-pointer backdrop-blur-sm" >
                                    <h3 class=" sm:text-xl text-lg font-bold text-white group-hover:text-white/[.8]">
                                        {item?.category}
                                    </h3>
                                    <h3 class="text-sm sm:text-lg font-semibold text-white group-hover:text-white/[.8]">
                                        {item?.serviceName}
                                    </h3>
                                    <h3 class="text-sm sm:text-md pt-1 font-semibold text-white group-hover:text-white/[.8]">
                                        Service Price: {item?.price}$
                                    </h3>
                                    <p class="mt-1 text-white/[.8] lg:text-base text-sm">
                                        {item?.textarea?.substring(0, 100) + ' ' + "....."}
                                    </p>
                                    <a class=" font-bold inline-flex items-center gap-2  text-lg  text-blue-500 hover:text-blue-700" href="#">
                                        View Details
                                        <svg class="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </Link>
                    })
                }
            </div>
            <div className='pt-10 text-center'>
                <Link to='/allservices' className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-7 py-3.5 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90">
                    <AiOutlineEye></AiOutlineEye>
                    <span>Show All</span>
                </Link>
            </div>
        </div >
    )
};

export default PopularSection;