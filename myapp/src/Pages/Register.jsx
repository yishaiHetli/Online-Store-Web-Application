import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Checkbox, Input } from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocToCollection } from './../FireBase/firebaseUtils';



export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [allowOthersToSeeMyOrders, setallowOthersToSeeMyOrders] = useState(false)

    const navigate = useNavigate();

    const createNewUser = (e) => {
        e.preventDefault();
        const obj = { firstName, lastName, userName, password, allowOthersToSeeMyOrders, type: 'user', date: new Date().toLocaleDateString() }
        addDocToCollection("users", obj)
        navigate('/user')
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Card sx={{ width: 320, margin: 'auto' }}>
                {/* <Typography level="title-lg" sx={{ display: 'flex', justifyContent: 'center' }}>Next Generation E-Commerce</Typography> */}
                <Typography sx={{ color: '#0d0b0b', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    New User
                </Typography>
                <Typography sx={{ color: '#0d0b0b', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    Registration
                </Typography>

                <CardContent orientation="horizontal">
                    <form onSubmit={createNewUser}>
                        First Name: <br />
                        <Input placeholder="" onChange={(e) => setFirstName(e.target.value)} /> <br />
                        Last Name: <br />
                        <Input placeholder="" onChange={(e) => setLastName(e.target.value)} /> <br />
                        User Name: <br />
                        <Input placeholder="" onChange={(e) => setUserName(e.target.value)} /> <br />
                        Password: <br />
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} /> <br />

                        <Checkbox label="Allow others to see my orders" onChange={(e) => setallowOthersToSeeMyOrders(e.target.checked)} />


                        <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                            Create
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </Box>
    )
}
