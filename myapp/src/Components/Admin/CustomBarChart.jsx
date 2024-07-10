import React, { useEffect, useState } from 'react'
import 'charts.css';
import './CustomPropertyBarChart.css'

const CustomBarChartComp = ({ products, user, ordersUser }) => {

    const [sumOfQuantityOrder, setSumOfQuantityOrder] = useState(0)


    const calculatePercentQuantity = (quantity) => {
        var result = 1 / 100;
        if (sumOfQuantityOrder != 0)
            result = (100 * quantity) / sumOfQuantityOrder

        return result
    }

    useEffect(() => {
        setSumOfQuantityOrder(ordersUser.map(order => order.quantity).reduce((a, b) => a + Number(b), 0))
        console.log('ordersUser')
        console.log(ordersUser)
        console.log(calculteDuplicateOrder(ordersUser))
    }, [user])

    const calculteDuplicateOrder = (orders) => {
        var newOrders = []
        orders.map(order => {
            if (newOrders.map(ord => ord.productId).includes(order.productId)) {
                //if already exist:
                newOrders = newOrders.map(ord => {
                    return ord.productId != order.productId ? ord : { ...ord, quantity: ord.quantity + order.quantity }
                })
            }
            else {
                newOrders = [...newOrders, order]
            }
        });
        return newOrders;
    }

    return (
        <div>
            <div id="datasets-example-2">
                <table className="charts-css column multiple show-labels data-spacing-10 datasets-spacing-1">
                    <caption> Front End Developer Salary </caption>
                    <tbody>
                        <tr>
                            {
                                products.map((product, index) => {
                                    if (ordersUser.map(o => o.productId).includes(product.id)) {
                                        return calculteDuplicateOrder(ordersUser).map((order) => {
                                            if (order.productId == product.id) {
                                                return <td key={index} style={{ "--size": `calc(${calculatePercentQuantity(order.quantity)} / 100)` }}>
                                                    <span className="data"> {product.name}<br /> {order.quantity} </span></td>
                                            }
                                        })
                                    }
                                    else {
                                        return <td key={index} style={{ "--size": "calc(0 / 100)" }}>
                                            <span className="data"> {product.name} </span></td>
                                    }
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomBarChartComp