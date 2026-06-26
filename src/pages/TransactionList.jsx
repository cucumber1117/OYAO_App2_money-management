import { useMemo, useState } from 'react'
import {
  deleteTransaction,
  getTransactions,
} from '../data/transactionStorage'

function TransactionList() {
  const [transactions, setTransactions] = useState(() => getTransactions())

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const dateCompare = (b.date || '').localeCompare(a.date || '')

      if (dateCompare !== 0) {
        return dateCompare
      }

      return Number(b.amount || 0) - Number(a.amount || 0)
    })
  }, [transactions])

  function handleDelete(id) {
    if (window.confirm('このデータを削除してもよろしいですか？')) {
      deleteTransaction(id)
      setTransactions(getTransactions())
    }
  }

  return (
    <section className="page">
      <div className="page-title">
        <p>登録済みデータ</p>
        <h2>一覧画面</h2>
      </div>

      {sortedTransactions.length === 0 ? (
        <p className="empty-text">まだ登録データがありません。</p>
      ) : (
        <>
          <p className="empty-text">{sortedTransactions.length}件の記録があります。</p>
          <div className="transaction-list">
            {sortedTransactions.map((transaction) => {
              const isIncome = transaction.type === 'income'

              return (
                <article className="transaction-item" key={transaction.id}>
                  <div>
                    <div className="transaction-meta">
                      <span className={`type-label ${transaction.type}`}>
                        {isIncome ? '収入' : '支出'}
                      </span>
                      <span className="transaction-date">{transaction.date}</span>
                    </div>
                    <h3>{transaction.category || 'その他'}</h3>
                    <p className="transaction-memo">
                      {transaction.memo || 'メモはありません'}
                    </p>
                  </div>
                  <div className="transaction-actions">
                    <strong className={`amount ${transaction.type}`}>
                      {isIncome ? '+' : '-'}
                      {Math.abs(transaction.amount).toLocaleString()}円
                    </strong>
                    <button type="button" onClick={() => handleDelete(transaction.id)}>
                      削除
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default TransactionList