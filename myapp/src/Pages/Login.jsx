import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Input, Link } from '@mui/joy';
import { useState } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();

    const CheckLogin = () => {
        const user = users.find(user => user.userName === userName && user.password === password)
        if (user) {
            {
                sessionStorage['firstNameUser'] = user.firstName;
                sessionStorage['userId'] = user.id;
                if (user.type === 'Manager')
                    navigate('/admin')
                else
                    navigate('/user')
            }
        }
        else {
            alert('the userName or password does not exist!')
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>

            <Card sx={{ width: 320, margin: 'auto' }}>
                {/* <Typography level="title-lg" sx={{ display: 'flex', justifyContent: 'center' }}>Next Generation E-Commerce</Typography> */}
                <Typography sx={{ color: '#0d0b0b', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    Next Generation E-Commerce
                </Typography>
                <CardContent orientation="horizontal">
                    User name: <br />
                    <Input placeholder="" onChange={(e) => { setUserName(e.target.value) }} /> <br />
                    Password: <br />
                    <Input placeholder="" onChange={(e) => { setPassword(e.target.value) }} /> <br />

                    <Button type="submit" onClick={CheckLogin} variant="contained" color="primary" sx={{ width: '100%' }}>
                        Login
                    </Button>

                    <Typography sx={{ display: 'flex', justifyContent: 'center' }}>New user?
                        <Link href="./Register">Register</Link>
                    </Typography>

                </CardContent>
            </Card>
        </Box>
    )
}
