import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";

//Initial State

const initialState = {
    //creating dummy transactions
    transactions: [] 
}

//Create Context

export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer,initialState);

    //Actions(that will call the Reducer)
    //To delete the particular transaction and to update the balance, Income and Expenses
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value= {{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}        
    </GlobalContext.Provider>)
}