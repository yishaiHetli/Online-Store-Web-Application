import React from 'react'
import CustomTableComp from '../Table'
import { useSelector } from 'react-redux'

const CustomersComp = () => {
    const users = useSelector((state) => state.users)
    const products = useSelector((state) => state.products)
    const orders = useSelector((state) => state.orders)


    const buildDataRows = () => {
        return users.filter(user => user.type == 'user').map(user => {

            const allOrdersUser = orders.filter(order => order.userId == user.id)

            const InnerData = allOrdersUser.map(orderUser => {
                const productName = products.find(prod => prod.id == orderUser.productId).name
                const quanity = orderUser.quantity
                const orderDate = orderUser.date
                return [productName, quanity, orderDate]
            })

            return [
                user.firstName + ' ' + user.lastName,
                user.date,
                <CustomTableComp titles={['Product', 'Qty', 'Date']} dataRows={InnerData} customStyle={{ border: 'solid 1px black', margin: '5px' }} />
            ]
        })

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <div style={{ textAlign: 'center', fontSize: '' }}>
                    <b><label style={{ fontSize: '25px' }}>Customers</label></b>
                </div> <br />

                <CustomTableComp titles={['Full Name', 'Joined At', 'Products Bought']} dataRows={buildDataRows()} />
            </div>
        </div>
    )
}

export default CustomersComp