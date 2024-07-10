import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryComp from './Category'
import { useSelector } from 'react-redux';
import { addDocToCollection } from '../../FireBase/firebaseUtils';

const CategoriesComp = () => {
    const categories = useSelector((state) => state.categories);
    const [categires, setCategires] = useState([])
    const [newCategoryName, setNewCategoryName] = useState('')

    useEffect(() => {
        const initData = () => {
            setCategires(categories);
        }
        initData()
    }, [categories])

    const addCategory = () => {
        addDocToCollection('categories', { name: newCategoryName })
    }

    return (
        <div>
            <div style={{ textAlign: 'center', fontSize: '' }}>
                <b><label style={{ fontSize: '25px' }}>Categories</label></b>
            </div> <br />
            <Card sx={{ minWidth: 275, margin: '20px', bgcolor: '#ececec' }}>
                <CardContent>
                    {
                        categires.map((category, index) => {
                            return < CategoryComp category={category} key={index} />
                        })
                    }
                    <Box sx={{ display: 'flex' }}>
                        <TextField sx={{ margin: '5px', width: 'auto', flex: '4' }} label="Add new category"
                            variant="outlined" onChange={(e) => setNewCategoryName(e.target.value)} />
                        <Button sx={{ margin: '5px', flex: '1' }} variant="contained" onClick={addCategory}>Add</Button>
                    </Box>

                </CardContent>
            </Card>

        </div>
    )
}

export default CategoriesComp