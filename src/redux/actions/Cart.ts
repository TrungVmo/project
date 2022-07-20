import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export const actionsCart = Object.freeze({
    ADD_CART: 'ADD_CART',
    ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
    ADD_CART_FAIL: 'ADD_CART_FAIL',

    GET_CART: 'GET_CART',
    GET_CART_SUCCESS: 'GET_CART_SUCCESS',
    GET_CART_FAIL: 'GET_CART_FAIL',

    GET_ORDER: 'GET_ORDER',
    GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',
    GET_ORDER_FAIL: 'GET_ORDER_FAIL',

    GET_ORDERLIST: 'GET_ORDERLIST',
    GET_ORDERLIST_SUCCESS: 'GET_ORDERLIST_SUCCESS',
    GET_ORDERLIST_FAIL: 'GET_ORDERLIST_FAIL',

    GET_FILTERORDER: 'GET_FILTERORDER',
    GET_FILTERORDER_SUCCESS: 'GET_FILTERORDER_SUCCESS',
    GET_FILTERORDER_FAIL: 'GET_FILTERORDER_FAIL',

})


const addCart = (idUser: string, totalOrder: number) => async (dispatch: any) => {

    const newCart = {}
    try {
        const ca = localStorage.getItem('cart');
        const cart = JSON.parse(ca? ca : "");

        dispatch({ type: actionsCart.ADD_CART});
        
        const docRef = await addDoc(collection(db, "carts"), {
            total: totalOrder,
            idUser: idUser,
            status: false
        })
        
        cart && cart.map((item: any) => {
            addDoc(collection(db, "cartItem"), {
                idCart: docRef?.id,
                name: item.name,
                des: item.des,
                price: item.price,
                type: item.type,
                image: item.image,
                count: item.count,
                payment: item.payment,
                
            })
        })
        

        dispatch({type: actionsCart.ADD_CART_SUCCESS, payload: newCart})
    } catch (error) {
        dispatch({type: actionsCart.ADD_CART_FAIL, payload: error })
    }
} 

const getCartItem = (idOrder: string) => async (dispatch: any) => {
    let cartData: any = [];
    const getCarts = async () => {
        const data = query(collection(db, 'cartItem'), where("idCart", "==", idOrder));
        const querySnapshot = await getDocs(data);
        const orderList = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        return orderList
    }

    try{
        cartData = await getCarts()

        dispatch({type: actionsCart.GET_CART})

        dispatch({type: actionsCart.GET_CART_SUCCESS, payload: cartData})
    }catch(err){
        dispatch({
            type: actionsCart.GET_CART_FAIL, payload: err
        })
    }
}

// get an Order with id
const getOrder = (idOrder: string) => async (dispatch: any) => {
    let orderData: any = [];
    const getOders = async () => {
        const data = await getDoc(doc(db, 'carts', idOrder));
        let order = {}
        if(data.exists()){
            order = data.data();
            return order
        }
    }

    try{
        orderData = await getOders()

        dispatch({type: actionsCart.GET_ORDER})

        dispatch({type: actionsCart.GET_ORDER_SUCCESS, payload: orderData})
    }catch(err){
        dispatch({
            type: actionsCart.GET_ORDER_FAIL, payload: err
        })
    }
}

// get all Order 
const getListOrder = () => async (dispatch: any) => {
    let orderData: any = [];
    const getOders = async () => {
        const data = await getDocs(collection(db, 'carts'));
        const orderList = data.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        return orderList
    }

    try{
        orderData = await getOders()

        dispatch({type: actionsCart.GET_ORDERLIST})

        dispatch({type: actionsCart.GET_ORDERLIST_SUCCESS, payload: orderData})
    }catch(err){
        dispatch({
            type: actionsCart.GET_ORDERLIST_FAIL, payload: err
        })
    }
}

// filter id Carts of user current
const getFilterOrder = (idUser: any) => async (dispatch: any) => {
    let filterData: any = [];

    const getOrders = async () => {
        const q = query(collection(db, "carts"),where("idUser", "==", idUser));
        const querySnapshot = await getDocs(q);
        const listData = querySnapshot.docs.map((doc: any) => ({...doc.data(), id: doc.id}));
        return listData;
    }

    try{
        filterData = await getOrders()

        dispatch({type: actionsCart.GET_FILTERORDER})

        dispatch({type: actionsCart.GET_FILTERORDER_SUCCESS, payload: filterData})
    }catch(err){
        dispatch({
            type: actionsCart.GET_FILTERORDER_FAIL, payload: err
        })
    }
}

// get 

export {addCart, getCartItem, getOrder, getListOrder, getFilterOrder};