import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import CustomBarChartComp from './CustomBarChart';
import { MenuItem, Select, Typography } from '@mui/material'


const StatisticsComp = () => {
  const products = useSelector((state) => state.products)
  const orders = useSelector((state) => state.orders)
  const users = useSelector((state) => state.users)

  const [selectUser, setSelectUser] = useState('')


  const dataChartPie =
    [["Product", "Sold by product"]].concat(
      products.map(product => {
        const allOrders = orders.filter(order => order.productId == product.id)
        const quantityOfAllOrders = allOrders.map(order => order.quantity)
        const sold = quantityOfAllOrders.reduce((a, b) => a + Number(b), 0)
        return [product.name, sold]
      })
    );

  const options = {
    title: "Total Sold Products",
    is3D: true,
  };


  return (
    <div>
      <div>
        <div style={{ textAlign: 'center', fontSize: '' }}>
          <b><label style={{ fontSize: '25px' }}>Statistics</label></b>
        </div> <br />
      </div>

      <Chart
        chartType="PieChart"
        data={dataChartPie}
        options={options}
        width={"100%"}
        height={"400px"}
      />
      <br />
      <div>

        <div>
          <div style={{ textAlign: 'center', fontSize: '' }}>
            <b><label style={{ fontSize: '25px' }}>Products Quantity Per Customer</label></b>
            <br />
            <br />


            SortByCustomer:
            <Select
              value={selectUser}
              style={{ borderRadius: '30px', minWidth: '100px', margin: '10px' }}
              onChange={(e) => setSelectUser(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                users.filter(user => user.type == 'user').map((user, index) => {
                  return <MenuItem key={index} value={user}>{user.firstName}</MenuItem>
                })
              }
            </Select>
            <CustomBarChartComp products={products} user={selectUser} ordersUser={orders.filter(o => o.userId == selectUser.id)} />
          </div>
        </div> <br />
      </div>


    </div >
  )
}

export default StatisticsComp