import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const params = useParams();
    // console.log(params.id);
    const navigate = useNavigate();

    // const userId = JSON.parse(localStorage.getItem("user"))._id;
    const [errors, setErrors] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCatagory, setProductCatagory] = useState('');
    const [productCompany, setProductCompany] = useState('');
    useEffect(() => {
        getProductData();
    }, []);


    const getProductData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        // console.log(result.productName);

        setProductName(result.productName);
        setProductPrice(result.productPrice);
        setProductCatagory(result.productCatagory);
        setProductCompany(result.productCompany);
    }


    const updateProductFun = async () => {
        // if (!productCatagory || !productName || productCompany || productPrice) {
        //     setErrors(true);
        //     return false;
        // }else{

        let result = await axios.patch(`http://localhost:5000/product/${params.id}`,
            { productName: productName, productPrice: productPrice, productCatagory: productCatagory, productCompany: productCompany },
            {
                headers: {
                    'Content-type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            }
        )
        result = await result.data;
        // console.log(result);

        // let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({ productName, productPrice, productCatagory, productCompany }),
        //     headers: {
        //         "Content-type": "application/json",
        //     }
        // })
        // result = await result.json();
        // console.log(result);
        navigate("/");
        // }

    }

    return (
        <div className='register'>
            <h1 className='headings'>Update Product</h1>


            <div className='flexBox'>
                <label >
                    Product Name:
                    <input
                        className='inputBox'
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder='Enter Product Name' />
                </label>
                <div className='errorsArea'>
                    {errors && !productName && <p>**Product Name is required**</p>}
                </div>
            </div>

            <div className='flexBox'>
                <label >
                    Product Price:
                    <input
                        className='inputBox'
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder='Enter Product Price' />
                </label>
                <div className='errorsArea'>
                    {errors && !productPrice && <p>**Product Price is required</p>}
                </div>

            </div>

            <div className='flexBox'>
                <label >
                    Product Catagory:
                    <input
                        type="text"
                        className='inputBox'
                        value={productCatagory}
                        onChange={(e) => setProductCatagory(e.target.value)}
                        placeholder='Enter Product Catagory Eg: Mobile, Laptop Etc' />
                </label>
                <div className='errorsArea'>
                    {errors && !productCatagory && <p>**Product Catagory is required</p>}
                </div>
            </div>

            <div className='flexBox'>

                <label >
                    Product Company:
                    <input
                        type="text"
                        className='inputBox'
                        value={productCompany}
                        onChange={(e) => setProductCompany(e.target.value)}
                        placeholder='Enter Product Company' />
                </label>
                <div className='errorsArea'>
                    {errors && !productCompany && <p>**Product Company is required</p>}
                </div>
            </div>

            <button onClick={updateProductFun} className='btnStyle'>Update Product</button>


        </div>
    )
}

export default UpdateProduct;