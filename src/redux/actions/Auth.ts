import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const actionsUser = Object.freeze({
    REGISTER: 'REGISTER',
    REGSTER_SUCCES: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',

    GET_USER: 'GET_USER',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',

})

// get user
const listUsers = () => async (dispatch: any) => {
    let userData = [];
    const getUsers = async () => {
        const data = await getDocs(collection(db, 'users'));
        const userList = data.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        return userList
    }

    try{
        userData = await getUsers()

        dispatch({type: actionsUser.GET_USER})

        dispatch({type: actionsUser.GET_USER_SUCCESS, payload: userData})
    }catch(err){
        dispatch({
            type: actionsUser.GET_USER_FAIL, payload: err
        })
    }
}

// const registerUser = () => ({
//     type: actionsAuth.REGISTER
// })

// const getUser = () => ({
//     type: actionsAuth.GET_USER
// })

export default listUsers;