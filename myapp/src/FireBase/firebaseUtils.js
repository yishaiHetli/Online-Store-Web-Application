// Import the functions you need from the SDKs you need
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import db from "./firebase"

const addDocToCollection = (collectionName, obj) => {
    addDoc(collection(db, collectionName), obj)
}

const removeDocFromCollection = (collectionName, id) => {
    deleteDoc(doc(db, collectionName, id))
}

const editDocInCollection = (collectionName, id, obj) => {
    updateDoc(doc(db, collectionName, id), obj)
}

export { addDocToCollection, removeDocFromCollection, editDocInCollection }