// Write your code here
import React from 'react'
import './index.css'

const getTransactionTypeDisplayText = (type, transactionTypeOptions) => {
  const option = transactionTypeOptions.find(option => option.optionId === type)
  return option ? option.displayText : ''
}

const TransactionItem = ({ transaction, onDelete, transactionTypeOptions }) => (
  <li className="history-item">
    <p className="history-item-title">{transaction.title}</p>
    <p className="history-item-amount">{`Rs ${transaction.amount}`}</p>
    <p className="history-item-type">
      {getTransactionTypeDisplayText(transaction.type, transactionTypeOptions)}
    </p>
    <button
      type="button"
      className="delete-button"
      onClick={() => onDelete(transaction.id)}
      data-testid="delete"
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        alt="delete"
        className="delete-icon"
      />
    </button>
  </li>
)

export default TransactionItem
