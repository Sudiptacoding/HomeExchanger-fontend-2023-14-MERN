import React from 'react';
import useMyBookings from '../../hooks/useMyBookings';
import Loader from '../../common/Loader';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const MyBookings = () => {
    const { isPending, error, data, refetch } = useMyBookings();
    console.log(data)
    const axiosData = useAxios()
    const handelBookDelet = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete this services!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosData.delete(`/booking/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your services has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }

    if (isPending) return <Loader></Loader>
    if (error) return 'An error has occurred: ' + error.message
    return (
        <div className='dark:bg-gray-900'>
            <Helmet>
                <title>HomeExchanger-My bookings</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="text-center">
                <h2 className="pt-10 mb-4 text-4xl font-black text-black dark:text-white">
                    Your all Booking services
                </h2>
                <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 lg:w-2/3 dark:text-gray-300">
                    You can delete your booking servise.When need new services you can add new services.
                </h3>
            </div>
            {
                data?.length > 0 ? <div className=''>
                    {
                        data?.map((user, i) => {
                            return <div key={i} className="relative overflow-hidden">
                                <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
                                    <div aria-hidden="true" className="flex absolute left-0 -z-[1]">
                                        <div className="bg-purple-200 opacity-20 blur-3xl lg:w-[1036px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
                                    </div>
                                    <div className="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
                                        <div className=" lg:block lg:col-span-2">
                                            <img className="rounded-xl lg:w-[410px] w-full h-[273px]" src={user?.serviceImage} alt="Image Description" />
                                        </div>
                                        <div className="lg:col-span-4">
                                            <blockquote>
                                                <div className="relative z-10">
                                                    <p className="text-xl italic text-gray-800 dark:text-white">
                                                        {user?.serviceName}
                                                    </p>
                                                </div>
                                                <div className="relative z-10">
                                                    <p className="pt-2 italic font-semibold text-gray-500 text-md dark:text-white">
                                                        Service price≻ $ {user?.price}
                                                    </p>
                                                </div>
                                                <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                                                    {user?.textarea?.substring(0, 100) + `${user?.textarea?.length > 100 ? '.....' : ''}`}
                                                </p>
                                                <footer className="mt-3">
                                                    <div className="flex items-center">
                                                        <blockquote className="relative">
                                                            <svg className="absolute top-0 left-0 w-16 h-16 text-gray-200 transform -translate-x-6 -translate-y-8 dark:text-gray-800" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                                                            </svg>

                                                            <div className="relative z-10">
                                                                <p className="text-xl italic text-gray-800 dark:text-white">
                                                                    Address: {user?.address} | Area : {user?.area}
                                                                </p>
                                                            </div>
                                                            <div className="relative z-10 cursor-pointer">
                                                                <div className="pt-3 italic font-semibold text-gray-800 text-md dark:text-white hover:text-blue-500">
                                                                    Date: {user?.date}
                                                                </div>
                                                            </div>

                                                            <footer className="flex flex-col items-start justify-between gap-5 mt-6 lg:flex-row">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="w-8 h-8 rounded-full" src={user?.userPhoto} alt="Image Description" />
                                                                    </div>
                                                                    <div className="ml-4 grow">
                                                                        <div className="font-semibold text-gray-800 dark:text-gray-200">{user?.userName}
                                                                            <div className='inline-block'>
                                                                                {
                                                                                    user?.status === "pending" && <div class="px-6 py-3">
                                                                                        <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                                                                            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                                            </svg>
                                                                                            Pending
                                                                                        </span>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    user?.status === "inprogress" && <div class="px-6 py-3">
                                                                                        <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                                                                                            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                                            </svg>
                                                                                            inprogress
                                                                                        </span>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    user?.status === "complete" && <div class="px-6 py-3">
                                                                                        <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                                                                            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                                            </svg>
                                                                                            Successful
                                                                                        </span>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">{user?.userEmail} | {user?.serviceArea}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="w-8 h-8 rounded-full" src={user?.buyUserImg} alt="Image Description" />
                                                                    </div>
                                                                    <div className="ml-4 grow">
                                                                        <div className="font-semibold text-gray-800 dark:text-gray-200">{user?.buyUserName}</div>
                                                                        <div className="text-xs text-gray-500">{user?.buyUserEmail} </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => handelBookDelet(user._id)} type="button" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-pink-500 transition-all border-2 border-pink-200 rounded-md hover:text-white hover:bg-pink-500 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                                                        Delete now
                                                                    </button>
                                                                </div>
                                                            </footer>
                                                        </blockquote>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div> : <div className='flex items-center justify-center w-full h-[60vh] text-2xl font-bold'><h1 className='dark:text-white'>No Booking Here</h1></div>
            }
        </div>
    )
};

export default MyBookings;