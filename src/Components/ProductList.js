import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
        // console.log(result);
    }

    const deleteProduct = async (id) => {
        // console.log(id);
        await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        });
        fetchProducts();
    }

    const searchProductFunction = async (e) => {
        const key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            setProducts(result)
            // console.log(result);

        } else {

            fetchProducts();
        }
    }

    return (
        <div className='product-list'>
            <h1 className='headings'>Product List</h1>

            <input
                type="text"
                className='inputBox inputSearch'
                placeholder='Search Product . . . '
                onChange={searchProductFunction}
            />

            <ul>
                <li>Sr No</li>
                <li>Product Name</li>
                <li>Product Price</li>
                <li>Product Catagory</li>
                <li>Product Company</li>
                <li>Action</li>
            </ul>
            {
                products.length > 0 ?
                    products.map((product, idx) => {
                        return (<ul key={idx + 1}>
                            <li>{idx + 1}.</li>
                            <li>{product.productName}</li>
                            <li>{product.productPrice}</li>
                            <li>{product.productCatagory}</li>
                            <li>{product.productCompany}</li>
                            <li>
                                <button className="actionLi btnDelete" onClick={() => deleteProduct(product._id)}>Delete</button>
                                <Link to={`/update/${product._id}`} className="actionLi updateLink">Update</Link>
                            </li>
                        </ul>
                        )
                    })
                    :
                    <h1>{products.result}</h1>

            }
        </div>
    )
}

export default ProductList;