import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format';

const IncomeExpenses = () => {
  const {transactions} = useContext(GlobalContext);

  const amounts = transactions.map(transactions => transactions.amount);

  //Calculating income that will be greater than 0
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc,item) => (acc += item),0)
    .toFixed(2)

  //Calculating Expense that will be less than 0
  const expense = (
    amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)*-1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p className="money plus">₹{numberWithCommas(income)}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p className="money minus">₹{numberWithCommas(expense)}</p>
        </div>
    </div>
  )
}

export default IncomeExpenses