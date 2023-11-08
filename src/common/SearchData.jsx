import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Tooltip } from 'react-tooltip'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'

function SearchData() {
    const axiosData = useAxios()
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axiosData.get('/allservicesSearch')
            .then(res => {
                setItems(res.data)
            })
    }, [])
    const handleOnSelect = (item) => {
        navigate(`/services/${item._id}`)

    }
    const formatResult = (item) => {
        return (
            <div className='cursor-pointer '>
                <div >
                    <a data-tooltip-id={item?._id}>{item?.serviceName}</a>
                    <Tooltip id={item?._id} place={'right'} className='dark:bg-gray-900'>
                        <img className='w-80 h-[200px]' src={item?.serviceImage} alt="" />
                    </Tooltip>
                </div >
            </div >
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className='relative lg:w-[450px] md:w-[350px] w-[270px]'>
                    <ReactSearchAutocomplete
                        items={items}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                        fuseOptions={{ keys: ["serviceName", "userName"] }}
                        resultStringKeyName="serviceName"
                        placeholder='Enter your Service name'
                    />
                </div>
            </header>
        </div>
    )
}

export default SearchData
