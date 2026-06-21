import { useState } from 'react'
import {
  deleteTransaction,
  getTransactions,
} from '../data/transactionStorage'

function TransactionList() {
  // 一覧画面担当者は、リストの表示方法をこのファイルで編集してください。
  const [transactions, setTransactions] = useState(getTransactions)

  function handleDelete(id) {
    deleteTransaction(id)
    setTransactions(getTransactions())
  }

  return (
    <section className="page">
      <div className="page-title">
        <p>登録済みデータ</p>
        <h2>一覧画面</h2>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-text">まだ登録データがありません。</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <article className="transaction-item" key={transaction.id}>
              <div>
                <span className={`type-label ${transaction.type}`}>
                  {transaction.type === 'income' ? '収入' : '支出'}
                </span>
                <h3>{transaction.category}</h3>
                <p>{transaction.date} {transaction.memo}</p>
              </div>
              <div className="transaction-actions">
                <strong>
                  {transaction.amount.toLocaleString()}円
                </strong>
                <button type="button" onClick={() => handleDelete(transaction.id)}>
                  削除
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default TransactionList
