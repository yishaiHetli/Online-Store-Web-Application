import React from 'react'
import CustomTableComp from '../Table'
import { useSelector } from 'react-redux'

const OrdersComp = () => {
    const orders = useSelector((state) => state.orders)
    const products = useSelector((state) => state.products)

    const dataRows = () => {
        return orders.filter(order => order.userId == sessionStorage['userId']).map(order => {
            const product = products.find(product => product.id == order.productId)
            const total = order.quantity * product.price
            return [
                product.name,
                order.quantity,
                `${total}$`,
                order.date
            ]
        })
    }

    return (
        <div>
            <div>
                <div style={{ textAlign: 'center', fontSize: '' }}>
                    <b><label style={{ fontSize: '25px' }}>Orders</label></b>
                </div> <br />

                {/* Table */}
                <CustomTableComp titles={['Title', 'Qty', 'Total', 'Date']}
                    dataRows={dataRows()} customStyle={{ border: 'solid 1px black', margin: '5px', width:'100%' }} />
            </div>
        </div>
    )
}

export default OrdersComp