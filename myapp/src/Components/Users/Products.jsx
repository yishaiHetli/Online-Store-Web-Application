import React, { useEffect, useState } from 'react'
import CartComp from './Cart'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ProductComp from './Product';
import { useSelector } from 'react-redux';
import { Card, CardContent, Slider } from '@mui/material';



const ProductsComp = () => {

  const categories = useSelector((state) => state.categories)
  const allProducts = useSelector((state) => state.products)
  const allOrders = useSelector((state) => state.orders)
  const [isShowCart, setIsShowCart] = useState(false)
  const [productsFilter, setProductsFilter] = useState([])
  const [filter, setFilter] = useState({ title: '', limitPrice: 0, selectCategory: 'ALL' })
  const [makeOrder, setMakeOrder] = useState([])//מערך של הזמנות

  const initData = () => {
    setProductsFilter(allProducts)
    setMakeOrder(allProducts.map(product => { return { productId: product.id, quantity: 0 } }))
  }

  const clearFilter = () => {
    setFilter({ title: '', limitPrice: 0, selectCategory: 'ALL' })
  }

  useEffect(() => {
    initData();
  }, [])

  const useFilter = () => {
    const productWithFilter = allProducts.filter(product => {
      const category = categories.find(category => category.name == filter.selectCategory)


      if (product.name.includes(filter.title) && (filter.limitPrice == 0 || product.price <= filter.limitPrice) &&
        (category ? product.categoryId == category.id : false || filter.selectCategory == 'ALL'))
        return product
    })
    setProductsFilter(productWithFilter)
  }

  useEffect(() => {
    useFilter()
  }, [filter])

  return (
    <div style={{ position: 'relative' }}>
      <Card>
        <CardContent sx={{ 'display': 'flex', alignItems: 'center' }}>
          <label style={{ margin: '5px' }}>Filter By Category:</label>
          <select value={filter.selectCategory} style={{ margin: '5px' }} onChange={(e) => setFilter({ ...filter, selectCategory: e.target.value })}>
            <option>ALL</option>
            {
              categories.map(category => {
                return <option key={category.id}>{category.name}</option>
              })
            }
          </select>

          <label style={{ margin: '5px' }}>Price:</label>
          <Slider sx={{ margin: '5px' }} aria-label="Volume" value={filter.limitPrice} min={0} max={500}
            onChange={(e) => { setFilter({ ...filter, limitPrice: e.target.value }) }} />
          <label style={{ margin: '5px' }}>{filter.limitPrice}$</label>

          <label style={{ margin: '5px' }}>Title:</label>
          <input type='text' style={{ borderRadius: '30px', maxWidth: '10vh', textAlign: 'center', margin: '5px' }}
            onChange={(e) => setFilter({ ...filter, title: e.target.value })} value={filter.title} />
          <button style={{ margin: '5px' }} onClick={() => clearFilter()}>Clear</button>
        </CardContent>
      </Card>

      <EastOutlinedIcon style={{ position: 'fixed', left: 0, top: '50%', margin: '10px', cursor: 'pointer' }}
        onClick={() => setIsShowCart(true)} />

      <CartComp isShowCart={isShowCart} setIsShowCart={setIsShowCart} makeOrder={makeOrder} setMakeOrder={setMakeOrder} />

      {
        productsFilter.map(product => {
          const TotalBought = allOrders.filter(order => order.productId == product.id).map(order => order.quantity).reduce((a, b) => a + b)
          return <ProductComp product={product} key={product.id} makeOrder={makeOrder} setMakeOrder={setMakeOrder} TotalBought={TotalBought} />
        })
      }
    </div>
  )
}

export default ProductsComp