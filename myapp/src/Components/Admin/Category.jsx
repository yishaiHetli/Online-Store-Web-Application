import { Button, Card, CardContent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { removeDocFromCollection, editDocInCollection } from '../../FireBase/firebaseUtils';

const CategoryComp = ({ category }) => {

    const [isUpdate, setIsUpdate] = useState(false)
    const [categoryUpdateName, setCategoryUpdateName] = useState({})

    const removeCategory = () => {
        removeDocFromCollection('categories', category.id)
    }
    const updateCategory = () => {
        setIsUpdate(true)
        setCategoryUpdateName(category.name)
    }

    const saveUpdate = () => {
        setIsUpdate(false)

        const obj = { name: categoryUpdateName }
        editDocInCollection('categories', category.id, obj)
    }

    return (
        <Card sx={{ margin: '5px', bgcolor: '#f4f4f4' }}>
            <CardContent>
                {!isUpdate && <label style={{ margin: '10px', fontSize: '20px' }}>{category.name}</label>}
                {!isUpdate && <Button variant="outlined" style={{ margin: '10px' }} onClick={updateCategory}>Update</Button>}
                {
                    isUpdate && <TextField sx={{ margin: '10px' }} defaultValue={category.name} onChange={(e) => setCategoryUpdateName(e.target.value)} >wfwf</TextField>
                }
                {
                    isUpdate && <Button variant="outlined" style={{ margin: '10px' }} onClick={saveUpdate}>Save</Button>
                }



                <Button variant="outlined" style={{ margin: '10px' }} onClick={removeCategory}>Remove</Button>
            </CardContent>
        </Card>
    )
}

export default CategoryComp