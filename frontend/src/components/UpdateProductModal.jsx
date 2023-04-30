import React, { useState, useEffect } from 'react';
import '../styles/UpdateProductModal.css';

const UpdateProductModal = (props) => {
    console.log(props);
    const productId = props.productId;
    const closeModal = props.closeModal;
    console.log(productId);


    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch the product data from the server using the productId prop
        // and set it to the product state
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/products/${productId}`);
                const productData = await response.json();
                setProduct(productData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'PUT',
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
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <h2>Update Product</h2>
                        <form onSubmit={handleSubmit}>
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
                                <button type="submit">Update</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default UpdateProductModal;
