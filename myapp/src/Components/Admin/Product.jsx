import { Input } from '@mui/joy'
import { Box, Button, Card, CardContent, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTableComp from '../Table'
import { addDocToCollection, editDocInCollection } from '../../FireBase/firebaseUtils'

const ProductComp = ({ product, categories, getBoughtProduct = [], isNewProduct, setIsNewProduct }) => {

    const [selectCategory, setSelectCategory] = useState('')
    const [ourProduct, setOurProduct] = useState({ name: '', description: '', price: '', linkToPic: '' });

    const InitData = () => {
        if (product) {
            setSelectCategory(categories.find(category => category.id == product.categoryId).name)
            setOurProduct(product)
        }
    }

    useEffect(() => {
        InitData()
    }, [])

    const submitProduct = () => {
        const categoryId = categories.find(category => category.name == selectCategory).id
        if (isNewProduct) {
            addDocToCollection('products', { ...ourProduct, categoryId: categoryId })
            setIsNewProduct(false)
        }
        else {
            editDocInCollection('products', ourProduct.id, { ...ourProduct })
        }

    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ width: '100%', margin: '20px', bgcolor: '#ececec', border: '1px solid grey' }}>
                    <CardContent sx={{ display: 'flex' }}>
                        <div>
                            {/* Title: */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '30px', fontSize: '20px' }}>
                                    <b> Title:</b>
                                </div>
                                <Input sx={{ maxWidth: '200px' }} placeholder="" value={ourProduct.name} onChange={e => setOurProduct({ ...ourProduct, name: e.target.value })} /> <br />
                            </div> <br />
                            {/* Category: */}
                            <div style={{ verticalAlign: 'middle', lineHeight: '30px', fontSize: '20px' }}>
                                <b> Category:</b>
                                <select value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)}>
                                    {
                                        categories.map((category, index) => {
                                            return <option key={index}>{category.name}</option>
                                        })
                                    }
                                </select>

                            </div> <br />
                            {/* Description: */}
                            <b>Description:</b>
                            <div >
                                <textarea rows="5" cols="25" style={{ resize: 'both' }} placeholder='' value={ourProduct.description}
                                    onChange={e => setOurProduct({ ...ourProduct, description: e.target.value })} />
                            </div>
                            {/* Save: */}
                            <Button variant="contained" color="success" onClick={submitProduct}>{isNewProduct ? 'Add' : 'Save'}</Button>
                        </div>

                        <div style={{ margin: '0px 0px 0px 40px' }}>
                            {/* Price: */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '30px', fontSize: '20px' }}>
                                    <b> Price:</b>
                                </div>
                                <Input sx={{ maxWidth: '100px' }} placeholder="" value={ourProduct.price}
                                    onChange={e => setOurProduct({ ...ourProduct, price: e.target.value })} /> <br />
                            </div> <br />
                            {/* Link To Pic: */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ fontSize: '20px' }}>
                                    <b> Link To Pic:</b>
                                    <Input sx={{ maxWidth: '200px' }} placeholder="" value={ourProduct.linkToPic}
                                        onChange={e => setOurProduct({ ...ourProduct, linkToPic: e.target.value })} /> <br />
                                </div>
                            </div> <br />

                            {/* Bought By: */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ fontSize: '20px' }}>
                                    <b> Bought By:</b>
                                    <CustomTableComp titles={['name', 'qty', 'date']} dataRows={getBoughtProduct} />
                                </div>
                            </div> <br />
                        </div>


                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ProductComp