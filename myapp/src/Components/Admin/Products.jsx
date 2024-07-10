import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductComp from './Product'
import { Button } from '@mui/material'

const ProductsComp = () => {
    const users = useSelector((state) => state.users)
    const products = useSelector((state) => state.products)
    const orders = useSelector((state) => state.orders)
    const categories = useSelector((state) => state.categories)

    const [isNewProduct, setIsNewProduct] = useState(false)

    const getBoughtProduct = (productId) => {
        const allOrdersProduct = orders.filter(order => order.productId == productId)

        return allOrdersProduct.map(order => {
            const userOrder = users.find(user => user.id == order.userId)
            return [
                userOrder.firstName + ' ' + userOrder.lastName,
                order.quantity,
                order.date
            ]
        })
    }

    return (
        <div>
            <div>
                <div style={{ textAlign: 'center', fontSize: '' }}>
                    <b><label style={{ fontSize: '25px' }}>Products</label></b>
                </div> <br />
            </div>

            {
                products.map((product) => {
                    return <ProductComp key={product.id} product={product} getBoughtProduct={getBoughtProduct(product.id)} categories={categories} />
                })
            }
            {/* Add New: */}
            {
                isNewProduct && <ProductComp categories={categories} isNewProduct={isNewProduct} setIsNewProduct={setIsNewProduct} />
            }
            <Button sx={{ margin: '0px 20px' }} variant="contained" onClick={() => setIsNewProduct(true)}>Add New</Button>

        </div>
    )
}

export default ProductsComp