import React from 'react';
import 'animate.css'
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <div>

            <div className="relative overflow-hidden bg-white dark:text-gray-100 dark:bg-gray-900">




                <div className="container relative flex flex-col px-4 py-16 mx-auto space-y-16 text-center lg:flex-row lg:space-y-0 lg:text-left xl:max-w-7xl lg:px-8 lg:py-32">
                    <div className="lg:w-1/2 lg:flex lg:items-center">
                        <div>
                            <div className="inline-flex px-2 py-1 mb-2 text-sm font-medium leading-4 text-gray-800 bg-gray-100 border border-gray-200 rounded dark:text-gray-200 dark:bg-gray-700/50 dark:border-gray-600/50">
                                Welcome to the HomeExchange community!
                            </div>
                            <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
                                There is a home for all <span className="text-blue-600 dark:text-blue-500">your desires</span>
                            </h1>
                            <h2 className="text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                                A selection of houses based on your favorite criteria, to live an unforgettable experience.
                            </h2>
                            <div className="flex flex-col justify-center pt-10 pb-16 space-y-2 sm:flex-row sm:items-center lg:justify-start sm:space-y-0 sm:space-x-2">
                                <Link to='/allservices' className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-7 py-3.5 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90">
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    <span>See All Services</span>
                                </Link>
                                <a onClick={() => document.getElementById('newApp').scrollIntoView({ behavior: 'smooth' })} className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-7 py-3.5 leading-6 border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                    <span>New Appartment</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 lg:ml-16 lg:flex lg:justify-center lg:items-center">
                        <div className="relative mx-5 lg:w-96">
                            <div className="absolute top-0 left-0 w-40 h-40 -mt-16 -ml-20 border border-blue-200 rounded-full lg:w-72 lg:h-72 bg-tranparent dark:border-blue-900"></div>
                            <div className="absolute top-0 left-0 w-40 h-40 -mt-20 border border-blue-100 rounded-full lg:w-72 lg:h-72 bg-tranparent -ml-14 dark:border-blue-950"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 -mb-16 -mr-20 border border-blue-200 rounded-full lg:w-72 lg:h-72 bg-tranparent dark:border-blue-900"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 -mb-20 border border-blue-100 rounded-full lg:w-72 lg:h-72 bg-tranparent -mr-14 dark:border-blue-950"></div>
                            <div className="absolute inset-0 -m-6 bg-gray-200 rounded-xl -rotate-2 dark:bg-gray-800 animate__animated animate__wobble animate__infinite infinite my-element1 animate__delay-5s 5s"></div>
                            <div className="absolute inset-0 -m-6 bg-blue-800 bg-opacity-75 shadow-inner animate__animated animate__wobble animate__infinite infinite my-element2 rounded-xl rotate-1 dark:bg-blue-900 dark:bg-opacity-75 animate__delay-5s 5s"></div>
                            <img src="https://cdn.tailkit.com/media/placeholders/photo-RSCirJ70NDM-800x1000.jpg" className="relative mx-auto rounded-lg shadow-lg animate__animated animate__wobble animate__infinite infinite my-element3 animate__delay-5s 5s" alt="Hero Image" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Slider;