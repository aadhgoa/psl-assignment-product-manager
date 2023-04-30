import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/ProductDetails.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const ProductDetails = () => {
    const id = useParams().productID;

    const [ProductDetails, setProductDetails] = useState();

    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProductDetails(response.data);
        }

        fetchProducts();
    }, [id]);

    console.log(ProductDetails)

    //go back to the homepage

    const goBack = () => {
        window.history.back();
    }

    return (
        <>
            <Navbar />
            <div class="hero-section">
                <h1>Product Details</h1>
                <div class="container">
                    {ProductDetails ? (


                        // <div class="box">
                        //     <span class="title"></span>
                        //     <div>
                        //         <strong>Year: {ProductDetails.modelyear}</strong>
                        //         <p>Price: {ProductDetails.price}</p>
                        //         <span>Description</span> <span>{ProductDetails.description}</span>
                        //     </div>
                        // </div>

                        <div class="box">
                            <span></span>
                            <div class="content">
                                <h2>{ProductDetails.productname}</h2>
                                <strong>Year: {ProductDetails.modelyear}</strong>
                                <p>Price: {ProductDetails.price}</p>
                                <p>Description: {ProductDetails.description}</p>
                                <button className='btn-back' onClick={goBack}>Back</button>
                            </div>
                        </div>



                    ) : (
                        <Loader />
                    )}

                </div>

            </div>

            <Footer />
        </>
    );
}

export default ProductDetails;