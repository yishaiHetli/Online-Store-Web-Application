import { Button, Card, CardContent, Typography } from '@mui/material'
import { Checkbox, Input } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { editDocInCollection } from '../../FireBase/firebaseUtils';
import { useSelector } from 'react-redux';

const MyAccountComp = () => {
    const users = useSelector((state) => state.users);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        allowOthersToSeeMyOrders: false,
      });

    const saveAccountUser = (e) => {
        e.preventDefault();
        editDocInCollection('users', user.id, { ...user })
    }

    const InitData = () => {
        setUser(users.find(user => user.id == sessionStorage['userId']))
    }

    useEffect(() => {
        InitData()
    }, [users])

    return (
        <div>
            <Card sx={{ width: 320, margin: 'auto' }}>
                <Typography sx={{ color: '#0d0b0b', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    New User
                </Typography>
                <Typography sx={{ color: '#0d0b0b', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                    Registration
                </Typography>

                <CardContent orientation="horizontal">
                    <form onSubmit={saveAccountUser}>
                        First Name: <br />
                        <Input placeholder="" value={user ? user.firstName : ''} onChange={(e) => setUser({ ...user, firstName: e.target.value })} /> <br />
                        Last Name: <br />
                        <Input placeholder="" value={user ? user.lastName : ''} onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} /> <br />
                        User Name: <br />
                        <Input placeholder="" value={user ? user.userName : ''} onChange={(e) => { setUser({ ...user, userName: e.target.value }) }} /> <br />
                        Password: <br />
                        <Input type="password" value={user? user.password : ''} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} /> <br />

                        <Checkbox label="Allow others to see my orders" checked={user? user.allowOthersToSeeMyOrders : false}
                            onChange={(e) => setUser({ ...user, allowOthersToSeeMyOrders: e.target.checked })} />

                        <Button type="submit" variant="contained" color="success">Save</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default MyAccountComp
