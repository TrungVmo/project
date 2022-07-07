import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';

export const actionsCategory = Object.freeze({
    ADD_CATEGORY: 'ADD_CATEGORY',
    ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
    ADD_CATEGORY_FAIL: 'ADD_CATEGORY_FAIL',

    GET_CATEGORY: 'GET_CATEGORY',
    GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
    GET_CATEGORY_FAIL: 'GET_CATEGORY_FAIL',

    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    UPDATE_CATEGORY_SUCCESS: 'UPDATE_CATEGORY_SUCCESS',
    UPDATE_CATEGORY_FAIL: 'UPDATE_CATEGORY_FAIL',

    REMOVE_CATEGORY: 'REMOVE_CATEGORY',
    REMOVE_CATEGORY_SUCCESS: 'REMOVE_CATEGORY_SUCCESS',
    REMOVE_CATEGORY_FAIL: 'REMOVE_CATEGORY_FAIL',
})


// get list food
const getCategorys = () => async (dispatch: any) => {
    let cateData = [];
    const getCates = async () => {
        const data = await getDocs(collection(db, 'category'));
        const cateList = data.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        return cateList
    }

    try{
        cateData = await getCates()

        dispatch({type: actionsCategory.GET_CATEGORY})

        dispatch({type: actionsCategory.GET_CATEGORY_SUCCESS, payload: cateData})
    }catch(err){
        dispatch({
            type: actionsCategory.GET_CATEGORY_FAIL, payload: err
        })
    }
}

// add food
const addCate = (typeFood: string) => async (dispatch: any) => {

    console.log(typeFood);
    
    const newType = {}
    try {
        dispatch({ type: actionsCategory.ADD_CATEGORY})

        addDoc(collection(db, "category"), {
            type: typeFood
        })

        dispatch({type: actionsCategory.ADD_CATEGORY_SUCCESS, payload: newType})
     }
     catch (error) {
        dispatch({type: actionsCategory.ADD_CATEGORY_FAIL, payload: error })
    }
} 

// update food

const updateCate = (itemCate: any, idCate: string) => async (dispatch: any) => {

    try {
        dispatch({ type: actionsCategory.UPDATE_CATEGORY})
        const cateDoc = doc(db,"category", idCate)
        await updateDoc(cateDoc, {
            type: itemCate.type,
        })
        dispatch({type: actionsCategory.UPDATE_CATEGORY_SUCCESS})
    } catch (error) {
        dispatch({type: actionsCategory.UPDATE_CATEGORY_FAIL, payload: error })
    }
} 

// delete

const removeCategory = (idCate: string) => async (dispatch: any) => {
    try {
        dispatch({ type: actionsCategory.REMOVE_CATEGORY})
        await deleteDoc(doc(db, "category", idCate))

        dispatch({type: actionsCategory.REMOVE_CATEGORY_SUCCESS})
    } catch (error) {
        dispatch({type: actionsCategory.REMOVE_CATEGORY_FAIL, payload: error })
    }
}

export {getCategorys, addCate, removeCategory, updateCate};