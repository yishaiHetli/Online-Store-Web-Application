import { useEffect, useState } from "react"
import WelcomeBarComp from "../Components/WelcomeBar"
import HeaderMenuComp from "../Components/HeaderMenu"
import { Box, Button } from "@mui/material";
import CategoriesComp from "../Components/Admin/Categories";
import CustomersComp from "../Components/Admin/Customers";
import StatisticsComp from "../Components/Admin/Statistics";
import ProductsComp from "../Components/Admin/Products";
import { useNavigate } from "react-router-dom";




export const AdminComp = () => {
    const [firstNameUser, setFirstNameUser] = useState('')
    const [selectedComponent, setSelectedComponent] = useState('Categories')

    const navigate = useNavigate();


    useEffect(() => {
        const initData = () => {
            setFirstNameUser(sessionStorage['firstNameUser'])
        }
        initData();
    }, [])

    const renderComponent = () => {
        switch (selectedComponent) {
            case "Categories":
                return <CategoriesComp />;
            case "Products":
                return <ProductsComp />;
            case "Customers":
                return <CustomersComp />;
            case "Statistics":
                return <StatisticsComp />;
            case "Log Out":
                sessionStorage.clear();
                navigate('/login')
                break;
            default:
                return null;
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <WelcomeBarComp name={firstNameUser} /> <br />

                        <HeaderMenuComp titles={['Categories', 'Products', 'Customers', 'Statistics', 'Log Out']} setSelectedComponent={setSelectedComponent} /><br /><br />

                        <Box sx={{ height: 5, borderRadius: 1, backgroundColor: '#dedede' }} />
                    </div> <br /><br />

                    <Box sx={{ borderRadius: 1, backgroundColor: '#dedede', display: 'inline-block', minWidth: '600px', width: 'fit-content', height: 'fit-content', padding: '10px' }}>
                        {renderComponent()}
                    </Box>



                </div>


            </div>


        </div>
    )
}
