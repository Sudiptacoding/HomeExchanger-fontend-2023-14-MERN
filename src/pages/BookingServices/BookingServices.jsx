import React, { useContext } from 'react';
import { UserProvider } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import swal from 'sweetalert';

const BookingServices = (props) => {
    const { serviceName, serviceArea, serviceImage, category, price, textarea, userEmail, userName, userPhoto } = props.data;
    const { user } = useContext(UserProvider);

    const axiosData = useAxios()

    const handelPurchaseServices = (e) => {
        e.preventDefault();
        const address = e.target.address.value;
        const area = e.target.area.value;
        const date = e.target.date.value;
        const splan = e.target.splan.value;
        const buyUserImg = user.photoURL
        const buyUserName = user.displayName
        const buyUserEmail = user.email
        const status = 'pending'
        const data = { address, area, date, splan, serviceImage, serviceArea, serviceName, category, price, textarea, userEmail, userName, userPhoto, buyUserImg, buyUserName, buyUserEmail, status }
        axiosData.post('/booking', data)
            .then(res => {
                swal("Good job!", "You bookings sucessfully added!", "success");
                document.getElementById('my_modal_10').close()
            })
    }


    return (
        <div>

            <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">

                <div className="p-4 bg-white shadow rounded-xl sm:p-7 dark:bg-slate-900">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Preview
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Are you sure to purchase this service
                        </p>
                    </div>
                    <form onSubmit={handelPurchaseServices}>
                        <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
                            <div className="sm:col-span-3">
                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Service Provider
                                </label>
                            </div>
                            <div className="sm:col-span-9">
                                <div className="flex items-center gap-5">
                                    <img className="inline-block w-16 h-16 rounded-full ring-2 ring-white dark:ring-gray-800" src={userPhoto} alt="Image Description" />
                                    <div className="flex gap-x-2">
                                        <div>
                                            <button type="button" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                {userName}
                                            </button>
                                            <button type="button" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                {userEmail}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="sm:col-span-3">
                                    <div className="inline-block">
                                        <label for="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                            Service Name
                                        </label>
                                        <span className="text-sm text-gray-400 dark:text-gray-600">
                                            (Not editable)
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input defaultValue={serviceName} disabled id="af-account-full-name" type="text" className="relative block w-full px-3 py-2 -mt-px -ml-px text-sm border-gray-200 shadow-sm pr-11 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Maria" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label for="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                        Price
                                    </label>
                                    <span className="text-sm text-gray-400 dark:text-gray-600">
                                        (Not editable)
                                    </span>
                                </div>
                            </div>
                            <div className="sm:col-span-9">
                                <input disabled defaultValue={price} id="af-account-email" type="email" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                            </div>


                            <div className="sm:col-span-3">
                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Special instruction
                                </label>
                            </div>
                            <div className="sm:col-span-9">
                                <div className="space-y-2">
                                    <input name='address' required id="af-account-password" type="text" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter present address" />
                                    <input name='area' required type="text" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter your area" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label for="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                        Service Image
                                    </label>
                                    <span className="text-sm text-gray-400 dark:text-gray-600">
                                        (Not editable)
                                    </span>
                                </div>
                            </div>
                            <div className="sm:col-span-9">
                                <div className="rounded-md sm:flex">
                                    <img className='h-[200px] w-full object-cover rounded-lg' src={serviceImage} alt="" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Date
                                </label>
                            </div>
                            <div className="sm:col-span-9">
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input name='date' required datePicker type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label for="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Service plan
                                </label>
                            </div>
                            <div className="sm:col-span-9">
                                <textarea name='splan' required id="af-account-bio" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="Type your message..."></textarea>
                            </div>

                        </div>


                        <div className="flex justify-end mt-5 gap-x-2">
                            <button onClick={() => document.getElementById('my_modal_10').close()} type="button" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                Cancel
                            </button>
                            <button type="submit" className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                Purchase services
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    );
};

export default BookingServices;