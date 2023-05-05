import React, { useState, useEffect } from 'react';

import axios from 'axios';

import ProductList from '../components/ProductList';

import Navbar from '../components/Navbar';

import '../styles/Home.css';
import Footer from '../components/Footer';
import Loader from '../components/Loader';


const Home = () => {


    const [products, setProducts] = useState([]);
    const [searchYear, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get('http://localhost:5000/api/products');
            console.log(response.data);
            setProducts(response.data);
        }

        fetchProducts();
    }, []);

    const searchByYear = async (e) => {
        e.preventDefault();

        const response = await axios.get(`http://localhost:5000/api/productsmodel?modelyear=${searchYear}`);
        console.log(response.data);
        setProducts(response.data);
    }
    console.log(searchYear);
    console.log(products);

    const searchByPrice = async (e) => {
        e.preventDefault();

        const response = await axios.get(`http://localhost:5000/api/productsprice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        setProducts(response.data);
    }

    const refresh = () => {
        window.location.reload();
    }

    return (
        <>
            <Navbar />

            <div className='hero-section'>
                <div className='hero-left'>
                    <h4>Search for Product</h4>
                    <form className='search-form'>
                        <div className='search-by-year'>

                            <div className="input__container input__container--variant">
                                <div className="shadow__input shadow__input--variant"></div>
                                <input type="number" name="text" className="input__search input__search--variant" onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Search by Year" />
                                <button className="input__button__shadow input__button__shadow--variant" onClick={searchByYear}>
                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.5em" width="13em">
                                        <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#FFF"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div className='search-by-price'>
                            <div class="input__container input__container--variant">
                                <div class="shadow__input shadow__input--variant"></div>
                                <div className='flex-input'>
                                    <input type="number" name="text" class="input__search input__search--variant " onChange={(e) => setMinPrice(e.currentTarget.value)} placeholder="Min Price" />
                                    <input type="number" name="text" class="input__search input__search--variant" onChange={(e) => setMaxPrice(e.currentTarget.value)} placeholder="Max Price" />
                                </div>
                                <button class="input__button__shadow input__button__shadow--variant" onClick={searchByPrice}>
                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.5em" width="13em">
                                        <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#FFF"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '1em',
                    }}>
                        <button className='btn btn-primary' onClick={refresh} style={{
                            color: 'white',
                        }}>Reset</button>
                    </div>

                </div>
                <div className='hero-right'>
                    <h4>Product List</h4>
                    {/* {products ? (
                        <ProductList products={products} />
                    ) : (
                        <div>
                            <p> no product </p>
                            <Loader />
                        </div>
                    )} */}

                    {
                        products.length > 0 ? (
                            <ProductList products={products} />
                        ) : (
                            <div>
                                <Loader />
                            </div>
                        )
                    }
                </div>



                {/* <ProductList productList={products} /> */}
            </div>

            <Footer />

        </>
    );
}

export default Home;