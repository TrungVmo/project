import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export const actionsCart = Object.freeze({
    ADD_CART: 'ADD_CART',
    ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
    ADD_CART_FAIL: 'ADD_CART_FAIL',

    GET_ORDER: 'GET_ORDER',
    GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',
    GET_ORDER_FAIL: 'GET_ORDER_FAIL',

    // GET_AUSER: 'GET_AUSER',
    // GET_AUSER_SUCCESS: 'GET_AUSER_SUCCESS',
    // GET_AUSER_FAIL: 'GET_AUSER_FAIL',

})


const addCart = (idUser: string, totalOrder: number) => async (dispatch: any) => {

    const newCart = {}
    try {
        const ca = localStorage.getItem('cart');
        const cart = JSON.parse(ca? ca : "");

        dispatch({ type: actionsCart.ADD_CART});
        
        const docRef = await addDoc(collection(db, "cartItem"), {
            total: totalOrder,
            idUser: idUser
        })
        
        cart && cart.map((item: any) => {
            addDoc(collection(db, "carts"), {
                idCart: docRef?.id,
                name: item.name,
                des: item.des,
                price: item.price,
                type: item.type,
                image: item.image,
                count: item.count,
                payment: item.payment,
                status: false
            })
        })
        

        dispatch({type: actionsCart.ADD_CART_SUCCESS, payload: newCart})
    } catch (error) {
        dispatch({type: actionsCart.ADD_CART_FAIL, payload: error })
    }
} 

const getOrders = (idUser: string) => async (dispatch: any) => {
    let orderData: any = [];
    const getCarts = async () => {
        const data = query(collection(db, 'carts'), where("idUser", "==", idUser));
        const querySnapshot = await getDocs(data);
        const orderList = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        return orderList
    }

    try{
        orderData = await getCarts()

        dispatch({type: actionsCart.GET_ORDER})

        dispatch({type: actionsCart.GET_ORDER_SUCCESS, payload: orderData})
    }catch(err){
        dispatch({
            type: actionsCart.GET_ORDER_FAIL, payload: err
        })
    }
}

export {addCart, getOrders};