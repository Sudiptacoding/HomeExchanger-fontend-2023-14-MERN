import React, { useEffect, useState } from 'react';
import usePaindingWork from '../../hooks/usePaindingWork';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loader from '../../common/Loader';
import { Helmet } from 'react-helmet';

const MyPaindingWork = () => {
    const { isPending, error, data, refetch } = usePaindingWork();
    const axiosData = useAxios()
    const handelUpded = (item, stats) => {
        axiosData.patch(`/status?id=${item._id}`, { stats })
            .then(res => {
                toast.success('Status Successfully Updated!')
                refetch()
            })
    }
    const handelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
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
                            text: "Services order delete sucessfully",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });
    }
    if (isPending) return <Loader></Loader>

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='dark:bg-gray-900'>
            <Helmet>
                <title>My Painding work</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <div>
                {
                    data?.length > 0 ?
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700">
                                            <div className="grid gap-3 px-6 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center dark:border-gray-700">
                                                <div className="sm:col-span-1">
                                                    <label for="hs-as-table-product-review-search" className="sr-only">Search</label>
                                                    <div className="relative">
                                                        <input type="text" id="hs-as-table-product-review-search" name="hs-as-table-product-review-search" className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg ps-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Search" />
                                                        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-4">
                                                            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-slate-800">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                                                    Product
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-start">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                                                    Reviewer
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-start">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                                                    Review
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-start">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                                                    Status
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-start">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                                                </span>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                    {
                                                        data?.map((item, i) => {
                                                            return <tr key={i} className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                                                                <td className="w-px h-px align-top whitespace-nowrap">
                                                                    <a className="block p-6" href="#">
                                                                        <div className="flex items-center gap-x-4">
                                                                            <img className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-lg" src={item?.serviceImage} alt="Image Description" />
                                                                            <div>
                                                                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{item?.serviceName}</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </td>
                                                                <td className="w-px h-px align-top whitespace-nowrap">
                                                                    <a className="block p-6" href="#">
                                                                        <div className="flex items-center gap-x-3">
                                                                            <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src={item?.buyUserImg} alt="Image Description" />
                                                                            <div className="grow">
                                                                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{item?.buyUserName}</span>
                                                                                <span className="block text-sm text-gray-500">{item?.buyUserEmail}</span>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </td>
                                                                <td className="h-px w-72 min-w-[18rem] align-top">
                                                                    <a className="block p-6" href="#">
                                                                        price:$ {item?.price}
                                                                        <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{item?.serviceArea} / {item?.area}</span>
                                                                        <span className="block text-sm text-gray-500">{item?.splan}</span>
                                                                    </a>
                                                                </td>
                                                                <td className="w-px h-px whitespace-nowrap">
                                                                    {
                                                                        item?.status === "pending" && <div className="px-6 py-3">
                                                                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                                </svg>
                                                                                Pending
                                                                            </span>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        item?.status === "inprogress" && <div className="px-6 py-3">
                                                                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                                </svg>
                                                                                inprogress
                                                                            </span>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        item?.status === "complete" && <div className="px-6 py-3">
                                                                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                                </svg>
                                                                                Successful
                                                                            </span>
                                                                        </div>
                                                                    }
                                                                </td>
                                                                <td className="w-px h-px whitespace-nowrap">
                                                                    <div className="px-6 py-1.5">
                                                                        <div className="hs-dropdown relative inline-block [--placement:bottom-right]">

                                                                            <button id="hs-table-dropdown-2" type="button" className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                                                            </button>
                                                                            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-table-dropdown-2">
                                                                                <div className="py-2 first:pt-0 last:pb-0">
                                                                                    <a onClick={() => handelUpded(item, 'pending')} className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                                                                        Pending
                                                                                    </a>
                                                                                    <a onClick={() => handelUpded(item, 'inprogress')} className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                                                                        In Progress
                                                                                    </a>
                                                                                    <a onClick={() => handelUpded(item, 'complete')} className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                                                                        Completed
                                                                                    </a>
                                                                                </div>
                                                                                <div className="py-2 first:pt-0 last:pb-0">
                                                                                    <a onClick={() => handelDelete(item?._id)} className="flex items-center px-3 py-2 text-sm text-red-600 rounded-lg gap-x-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700" href="#">
                                                                                        Delete
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> : <div className='flex items-center justify-center w-full min-h-[70vh]'><h1 className='text-2xl font-bold dark:text-white '>Your Painding work is empty</h1></div>
                }
            </div>



        </div>
    )
};

export default MyPaindingWork;