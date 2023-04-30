import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ProductList.css'
import UpdateProductModal from './UpdateProductModal';
import { Link } from 'react-router-dom';

function ProductList({ products }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState('');


    console.log(products);

    const handleDelete = async (productId) => {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        window.location.reload();
    };

    const handleUpdate = async (productId) => {
        console.log(productId);
        setProductId(productId);
        setIsModalOpen(true);
    }



    return (
        <div>
            <ul className="product-list">
                {products.map((product) => (
                    <li className="product-card" key={product.productid}>
                        <Link to={`/${product.productid}`}>
                            <h2>{product.productname}</h2>
                        </Link>

                        <p>Model Year: {product.modelyear}</p>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <div className="buttons">
                            <button onClick={() => handleUpdate(product.productid)}>Update</button>
                            <button className='btn-Danger' onClick={() => handleDelete(product.productid)} >Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && <UpdateProductModal productId={productId} closeModal={() => setIsModalOpen(false)} />}

        </div >

    );
}

export default ProductList;
