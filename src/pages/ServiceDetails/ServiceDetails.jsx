import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link, useParams } from 'react-router-dom';
import BookingServices from '../BookingServices/BookingServices';
import { UserProvider } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';
import ShowOtherCard from './components/ShowOtherCard';

const ServiceDetails = () => {
    const axiosData = useAxios()
    const { id } = useParams()
    const [data, setData] = useState({});
    const { user } = useContext(UserProvider)


    useEffect(() => {
        axiosData.get(`/servicesdetails/${id}`)
            .then(res => {
                setData(res.data)
            })
    }, [])





    const handelBookProduct = () => {
        document.getElementById('my_modal_10').showModal()
    }
    return (
        <div>
            <Helmet>
                <title>HomeExchanger-Service Details</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div class="bg-gray-100 dark:bg-gray-800 py-8">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row -mx-4">
                        <div class="md:flex-1 px-4">
                            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img class="w-full h-full object-cover" src={data?.serviceImage} alt="Product Image" />
                            </div>
                            <div class="flex -mx-2 mb-4">
                                {
                                    data?.userEmail === user.email ? <div class="w-1/2 px-2">
                                        <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Your Services</button>
                                    </div> : <div onClick={handelBookProduct} class="w-1/2 px-2">
                                        <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Book Now</button>
                                    </div>
                                }
                                <div class="w-1/2 px-2">
                                    <Link to='/'><button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Go to Home</button></Link>
                                </div>
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Service Name</h2>
                            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {data?.serviceName}
                            </p>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                    <span class="text-gray-600 dark:text-gray-300">${data?.price}</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Category: </span>
                                    <span class="text-gray-600 dark:text-gray-300"> {data?.category}</span>
                                </div>
                            </div>
                            <div class="mb-4">
                                <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Service Area</h2>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {data?.serviceArea}
                                </p>
                            </div>
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Service Description:</span>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {data?.textarea}
                                </p>
                            </div>
                            <div class="mt-6 sm:mt-10 flex items-center">
                                <div class="flex-shrink-0">
                                    <img class="h-10 w-10 sm:h-14 sm:w-14 rounded-full" src={data?.userPhoto} alt="Image Description" />
                                </div>

                                <div class="ml-3 sm:ml-4">
                                    <p class="sm:mb-1 font-semibold text-gray-800 dark:text-gray-200">
                                        {data?.userName}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        {data?.userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dark:bg-gray-900 py-10'>
                <ShowOtherCard data={data} setData={setData}></ShowOtherCard>
            </div>

            <dialog id="my_modal_10" className="modal">
                <div className="w-11/12 max-w-5xl modal-box dark:bg-gray-900">
                    <BookingServices data={data}></BookingServices>
                </div>
            </dialog>


        </div>
    );
};

export default ServiceDetails;