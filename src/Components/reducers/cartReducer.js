import Item1 from '../../images1/item1.jpg'
import Item2 from '../../images1/item2.jpg'
import Item3 from '../../images1/item3.jpg'
import Item4 from '../../images1/item4.jpg'
import Item5 from '../../images1/item5.png'
import Item6 from '../../images1/item6.png'
import Item7 from '../../images1/item7.jpg'

import {ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from '../actions/actionTypes/cart-actions'


const initState = {
    items: [
        {id:1,title:'Air Disc Brake', desc: "The most demanding heavy-duty truck, bus and off-highway applications require air brake components with superior stopping credentials.", price:5000,img:Item1},
        {id:2,title:'Disc Brake', desc: "Brake uses the calipers to squeeze pairs of pads against a disc or a 'rotor' to create friction.", price:3600,img:Item2},
        {id:3,title:'Magnetic Disc Brake', desc: "Increase the life span and reliability of brakes since no friction leads to less wearing out of brakes.", price:4000,img:Item3},
        {id:4,title:'Parking Brake', desc: "Also known as a handbrake or emergency brake (e-brake), is a mechanism used to keep the vehicle securely motionless.", price:5400,img:Item4},
        {id:5,title:'Pneumatic Brake', desc: "Compressed air brake system, a friction brake for vehicles in which compressed air pressing on a piston is used to apply the pressure to the brake pad needed to stop the vehicle.", price:4500,img:Item5},
        {id:6,title:'Hydraulic Brake', desc: "Transfer pressure from the controlling mechanism to the braking mechanism.", price:3100,img:Item6},
        {id:7,title:'Spring Brake', desc: "Air pressure leaves the brake chamber and release when air pressure builds up in the chamber.", price:2800,img:Item7},
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{

    if(action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item=> item.id === action.id)
        let existed_item= state.addedItems.find(item=> action.id === item.id)
        if(existed_item) {
            addedItem.quantity += 1;
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price;
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],total : newTotal
            }
        }
    }

    if(action.type === REMOVE_ITEM) {
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }

    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id)
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    return state
}
export default cartReducer;