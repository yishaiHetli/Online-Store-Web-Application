import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const ProductComp = ({ product, makeOrder, setMakeOrder, TotalBought }) => {

    const increaseQuantity = (e) => {
        setMakeOrder(makeOrder.map(order => order.productId != product.id ? order :
            { ...order, quantity: order.quantity + 1 }))
    }
    const decreaseQuantity = (e) => {
        setMakeOrder(makeOrder.map(order => order.productId != product.id ? order :
            { ...order, quantity: (order.quantity == 0 ? 0 : order.quantity - 1) }))
    }

    const showQuantityOrder = () => {
        return makeOrder.find(o => o.productId == product.id).quantity
    }

    return (
        <Card sx={{ margin: '20px', bgcolor: '#ececec', borderRadius: '25px' }}>
            <CardContent>
                <div style={{ display: 'flex' }}>
                    <div>
                        {/* Left Side */}
                        <b><label style={{ fontSize: '25px' }}>{product.name}</label></b> <br />
                        <label style={{ fontSize: '20px' }}>{product.description}</label> <br />
                        <label style={{ fontSize: '20px' }}>{`${product.price}$`}</label> <br />
                        <label style={{ fontSize: '20px' }}>In stock: {product.inStock}</label> <br />
                       
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button style={{ color: 'gray', backgroundColor: '#d9d9d9', borderRadius: '30%' }}
                                onClick={decreaseQuantity}>-</button>
                            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '30px', width: '40px', height: '30px', margin: '5px', textAlign: 'center' }}>
                                <label>{showQuantityOrder()} </label></Card>
                            <button style={{ color: 'gray', backgroundColor: '#d9d9d9', borderRadius: '30%' }}
                                onClick={increaseQuantity} >+</button>

                        </div>
                    </div>
                    <div style={{ margin: '0px 50px', display: 'flex', alignItems: 'center' }}>
                        {/* Center Side */}
                        <img src={product.linkToPic}
                            style={{ width: '100px', height: 'auto' }}></img>
                    </div>
                    <div style={{ margin: '0px 20px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        {/* Right Side */}
                        <label>Bought: {TotalBought}</label>
                    </div>

                </div>
            </CardContent>
        </Card>

    )
}

export default ProductComp