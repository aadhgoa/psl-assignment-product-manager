//Modal to add item to the product list

import React from "react";
import { useState } from "react";

const CreateNewProductModal = (props) => {

    const closeModal = props.closeModal;

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setIsLoading(true);

            const response = await fetch(`http://localhost:5000/api/products/`, {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(product),

            });

            const updatedProduct = await response.json();

            console.log(updatedProduct);

            setIsLoading(false);

            closeModal();

            window.location.reload();

        } catch (error) {

            console.error(error);

            setIsLoading(false);

        }

    };

    return (

        <div className="modal">
            <div className="modal-content">
                {isLoading ? (<h2>Loading...</h2>) : (
                    <>
                        <h2>Add Product</h2>
                        <form>

                            <div>
                                <label htmlFor="productid">Product ID:</label>
                                <input
                                    type="number"
                                    id="productid"
                                    name="productid"
                                    value={product.productid || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="productname">Product Name:</label>
                                <input
                                    type="text"
                                    id="productname"
                                    name="productname"
                                    value={product.productname || ''}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div>
                                <label htmlFor="modelyear">Model Year:</label>
                                <input
                                    type="number"
                                    id="modelyear"
                                    name="modelyear"
                                    value={product.modelyear || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={product.price || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={product.description || ''}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" onClick={handleSubmit}>Add</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </>
                )}


            </div>
        </div>



    );

}

export default CreateNewProductModal;