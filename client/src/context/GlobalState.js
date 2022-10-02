import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial State

const initialState = {
    //creating dummy transactions
    transactions: [],
    error: null,
    loading: true 
}

//Create Context

export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer,initialState);

    //Actions(that will call the Reducer)
    //To delete the particular transaction and to update the balance, Income and Expenses

    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data 
            })
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
           await axios.delete(`/api/v1/transactions/${id}`);

           dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            })
        }
        
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction,config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            })
        }

        
    }

    return (<GlobalContext.Provider value= {{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}        
    </GlobalContext.Provider>)
}
