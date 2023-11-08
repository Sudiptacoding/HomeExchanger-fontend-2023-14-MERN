import React, { useState } from 'react';
import useMyServices from '../../hooks/useMyServices';
import Loader from '../../common/Loader';
import MyservicesUpded from './components/MyservicesUpded';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Myservices = () => {
    const { isPending, error, data, refetch } = useMyServices();
    const axiosData = useAxios()
    const [singleItemData, setSingleItemData] = useState({})

    const handelProductUplode = (id) => {
        axiosData.get(`/singleservices/${id}`)
            .then(res => {
                setSingleItemData(res.data)
                document.getElementById('my_modal_3').showModal()
            })

    }

    const handelDelete = (id) => {
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
                axiosData.delete(`/singleservicesdelete/${id}`)
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
                <title>My services</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="text-center">
                <h2 className="pt-10 mb-4 text-4xl font-black text-black dark:text-white">
                    Services you Offer
                </h2>
                <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 lg:w-2/3 dark:text-gray-300">
                    You can delete and update your servise.You can change image for everyone.
                </h3>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="">
                    {
                        data?.length > 0 ? <div className='grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full' >
                            {
                                data?.map(item => {
                                    return <div key={item._id} className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
                                        <img src={item?.serviceImage} className="object-cover w-full h-64" alt="" />
                                        <div className="px-5 pt-5 border border-t-0">
                                            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                                                <a href="/" className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700" aria-label="Category" title="traveling">traveling</a>
                                                <span className="text-gray-600">{item?.category}</span>
                                            </p>
                                            <p className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700">{item?.serviceName}</p>
                                            <p className="mb-2 text-gray-700">
                                                {item?.textarea?.substring(0, 50) + `${item?.textarea?.length > 50 ? '.....' : ''}`}
                                            </p>
                                            <p className="mb-2 italic font-semibold text-gray-700">
                                                Price: ${item?.price}
                                            </p>
                                            <div className="flex mt-auto border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                                                <a onClick={() => handelProductUplode(item._id)} className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 align-middle transition-all shadow-sm rounded-bl-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
                                                    Edit Now
                                                </a>
                                                <a onClick={() => handelDelete(item._id)} className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 align-middle transition-all bg-white shadow-sm rounded-br-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
                                                    Delete Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : <div className='flex items-center justify-center w-full h-screen'><h1 className='text-2xl font-bold dark:text-white '>No Services here</h1></div>
                    }

                    <dialog id="my_modal_3" className="modal">
                        <div className="w-11/12 max-w-5xl modal-box">
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                            </form>
                            <MyservicesUpded singleItemData={singleItemData} refetch={refetch}></MyservicesUpded>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    )
};

export default Myservices;