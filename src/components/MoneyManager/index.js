const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
import React, { Component } from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import { v4 as uuidv4 } from 'uuid'
import './index.css'



class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactions: [],
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleAmountChange = event => {
    this.setState({ amount: event.target.value })
  }

  handleTypeChange = event => {
    this.setState({ type: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { title, amount, type, transactions, income, expenses } = this.state

    if (title.trim() === '' || amount.trim() === '') {
      return
    }

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      type,
    }

    const updatedTransactions = [...transactions, newTransaction]
    let updatedIncome = income
    let updatedExpenses = expenses

    if (type === 'INCOME') {
      updatedIncome += newTransaction.amount
    } else {
      updatedExpenses += newTransaction.amount
    }

    const updatedBalance = updatedIncome - updatedExpenses

    this.setState({
      transactions: updatedTransactions,
      balance: updatedBalance,
      income: updatedIncome,
      expenses: updatedExpenses,
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    })
  }

  handleDelete = id => {
    const { transactions } = this.state
    const transactionToDelete = transactions.find(
      transaction => transaction.id === id,
    )
    const updatedTransactions = transactions.filter(
      transaction => transaction.id !== id,
    )

    let { income, expenses } = this.state
    if (transactionToDelete.type === 'INCOME') {
      income -= transactionToDelete.amount
    } else {
      expenses -= transactionToDelete.amount
    }

    const balance = income - expenses

    this.setState({
      transactions: updatedTransactions,
      income,
      expenses,
      balance,
    })
  }

  render() {
    const { balance, income, expenses, title, amount, type, transactions } = this.state

    return (
      <div className="money-manager-container">
        <div className="greetings-container">
          <h1 className="greeting-title">Hi, Richard</h1>
          <p className="greeting-subtitle">
            Welcome back to your Money Manager
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="transactions-container">
          <div className="add-transaction-container">
            <h1 className="section-title">Add Transaction</h1>
            <form className="transaction-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  TITLE
                </label>
                <input
                  placeholder="TITLE"
                  id="title"
                  className="form-input"
                  value={title}
                  onChange={this.handleTitleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount" className="form-label">
                  AMOUNT
                </label>
                <input
                  placeholder="AMOUNT"
                  id="amount"
                  className="form-input"
                  type="number"
                  value={amount}
                  onChange={this.handleAmountChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type" className="form-label">
                  TYPE
                </label>
                <select
                  id="type"
                  className="form-select"
                  value={type}
                  onChange={this.handleTypeChange}
                >
                  {transactionTypeOptions.map(option => (
                    <option key={option.optionId} value={option.optionId}>
                      {option.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="section-title">History</h1>
            <div className="history-list">
              <div className="history-header">
                <p className="history-header-item">Title</p>
                <p className="history-header-item">Amount</p>
                <p className="history-header-item">Type</p>
                <p className="history-header-item">Remove</p>
              </div>
              <ul>
                {transactions.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={this.handleDelete}
                    transactionTypeOptions={transactionTypeOptions}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
