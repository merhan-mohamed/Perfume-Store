import {createSlice} from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const initialState =  Cookies.get("cart")
?{...JSON.parse(Cookies.get("cart")) , loading:true}
:{
    loading:true,
    CartItems:[],
    showSidebar:false,
    qty: 1,
    shippingAddress:{},
    paymentMethod:""
};


const addDecimals = (num:number) => {
    return(Math.round(num * 100)/ 100).toFixed(2)
}

const CartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers: {
        addToCart:(state:any, action:any) => {
            const item = action.payload
            const existItem = state.CartItems.find((x:any) => x.id === item.id)
            if(existItem){
                state.CartItems = state.CartItems.map((x:any) => 
                x.id === existItem.id ? item : x)
            }else{
                state.CartItems = [...state.CartItems, item]
            }
            state.itemsPrice = addDecimals(state.CartItems.reduce((acc:number, item:number) => acc + (item.Price) * (item.qty), 0))

            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            )
            Cookies.set("cart", JSON.stringify(state))

           
            
        }, 
        removeFromCart:(state:any, action:any) => {
            state.CartItems = state.CartItems.filter((x:any) => x.id !== action.payload)
             state.itemsPrice = addDecimals(state.CartItems.reduce((acc:any, item:any) => acc + (item.Price) * (item.qty), 0))

            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            )
            Cookies.set("cart", JSON.stringify(state))

            
        },

        saveShippingAddress:(state:any, action:any) => {
                state.shippingAddress = action.payload
                Cookies.set("cart" , JSON.stringify(state))
            },
             savePaymentMethod:(state:any, action:any) => {
                state.paymentMethod = action.payload
                Cookies.set("cart" , JSON.stringify(state))
            },
        hideloading:(state:any) => {
            state.loading = false
        }
    }
})

export const {addToCart, removeFromCart, hideloading, saveShippingAddress, savePaymentMethod} = CartSlice.actions
export default CartSlice.reducer