import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Register } from './Pages/Register';
import { useDispatch } from "react-redux"
import { useEffect } from 'react';
import { query, collection, onSnapshot } from "firebase/firestore"
import db from './FireBase/firebase';
import { AdminComp } from './Pages/Admin';
import { UserComp } from './Pages/User';


function App() {

  const dispatch = useDispatch()

  const LoadData = async (collectionName) => {
    const q = query(collection(db, collectionName))

    onSnapshot(q, (snapshot) => {
      const ourCollection = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      const action = {
        type: "LOAD", payload: { type: collectionName, [collectionName]: ourCollection }
      }
      dispatch(action)
    })
  }

  useEffect(() => {
    LoadData('users')
    LoadData('categories')
    LoadData('products')
    LoadData('orders')
  }, [])


  return (
    <>
      <Routes>
        {/* Dynamic Routing - Params */}
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Admin' element={<AdminComp />} />
        <Route path='/user' element={<UserComp />} />
      </Routes>
    </>
  )
}

export default App
