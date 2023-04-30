import React from "react";

const Loader = () => {

    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
                <p>loading</p>
                <div className="words">
                    <span className="word">Products</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;