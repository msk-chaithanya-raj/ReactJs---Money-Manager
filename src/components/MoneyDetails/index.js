// Write your code here
import React from 'react'
import './index.css'

const MoneyDetails = ({ balance, income, expenses }) => (
  <div className="money-details-container">
    <div className="money-details-card balance">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
        className="money-details-image"
      />
      <div className="money-details-info">
        <p className="money-details-title">Your Balance</p>
        <p className="money-details-amount" data-testid="balanceAmount">{`Rs ${balance}`}</p>
      </div>
    </div>
    <div className="money-details-card income">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
        className="money-details-image"
      />
      <div className="money-details-info">
        <p className="money-details-title">Your Income</p>
        <p className="money-details-amount" data-testid="incomeAmount">{`Rs ${income}`}</p>
      </div>
    </div>
    <div className="money-details-card expenses">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
        className="money-details-image"
      />
      <div className="money-details-info">
        <p className="money-details-title">Your Expenses</p>
        <p className="money-details-amount" data-testid="expensesAmount">{`Rs ${expenses}`}</p>
      </div>
    </div>
  </div>
)

export default MoneyDetails
