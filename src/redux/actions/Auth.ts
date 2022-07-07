import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const actionsUser = Object.freeze({
    REGISTER: 'REGISTER',
    REGSTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',

    GET_USER: 'GET_USER',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',

    GET_AUSER: 'GET_AUSER',
    GET_AUSER_SUCCESS: 'GET_AUSER_SUCCESS',
    GET_AUSER_FAIL: 'GET_AUSER_FAIL',

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

// get a user

const getAUser = (idUser: string) => async (dispatch: any) => {
    let userData:any = [];
    const getUser = async () => {
        const data = await getDoc(doc(db,'users', idUser));
        let user = {};
        if(data.exists()){
            user = data.data();
            return user;
        }  
    }

    try{
        userData = await getUser();

        dispatch({type: actionsUser.GET_AUSER})

        dispatch({type: actionsUser.GET_AUSER_SUCCESS, payload: userData})
    }catch(err){
        dispatch({
            type: actionsUser.GET_AUSER_FAIL, payload: err
        })
    }
}

export {listUsers, getAUser};