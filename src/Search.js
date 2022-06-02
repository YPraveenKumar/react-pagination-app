import React, { useEffect, useState } from 'react'
import Pagination from './Pagination.js'
import './App.css';

export default function Search() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');
    const [perPage, setPerPage] = useState();

    const searchText = (e) => {
        setFilter(e.target.value)
        let dataSearch = perPage?.filter((item) => item?.title.toLowerCase().includes((e.target.value).toLowerCase()));
        setFilteredData(dataSearch)
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/').then((res) => res.json()).then(apiData => { setData(apiData); setPerPage(apiData.slice(0, 10)) });
    }, [])

    const pageHandler = (pageNumber) => {
        setPerPage(data.slice((pageNumber * 10) - 10, pageNumber * 10))
    }

    return (
        <div className="border border-secondary" style={{ margin: '35px' }}>
            <section className='py-4 container'>
                <div className='row justify-content-center'>
                    <h2>React Pagination App</h2>
                    <div className='col-12 mb-5'>
                        <div className='mb-3 col-x4 mx-auto text-center'>
                            <label className='form-label h4'></label>
                            <input type='text' className='form-control' placeholder='search name' value={filter} onChange={(e) => searchText(e)} />
                        </div>
                    </div>
                    <div>
                        {filteredData.length > 0 ?
                            filteredData.map((item, index) => {
                                return (
                                    <div>
                                        <div className='item-name' key={index}>{item.title}</div>
                                    </div>
                                )
                            }) :
                            perPage?.map((item, index) => {
                                return (
                                    <div>
                                        <div className='item-name' key={index}>{item.title}</div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <Pagination data={data} pageHandler={pageHandler} />
                    </div>
                </div>
            </section>
        </div>
    )
}
