import {
  getMonthlySummary,
  getRecentTransactions,
} from '../data/transactionStorage'

function formatMoney(amount) {
  return `${amount.toLocaleString()} 円`
}

function formatSignedMoney(transaction) {
  const sign = transaction.type === 'income' ? '+' : '-'
  return `${sign}${formatMoney(transaction.amount)}`
}

function Home() {
  // ホーム担当者は、集計表示や最近の取引表示をこのファイルで編集してください。
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const summary = getMonthlySummary(year, month)
  const recentTransactions = getRecentTransactions(5)
  const hasExpense = summary.expense > 0

  return (
    <section className="page home-page">
      <div className="page-title">
        <p>{year}年{month}月</p>
        <h2>今月のまとめ</h2>
      </div>

      <div className="balance-panel">
        <span>今月の残高</span>
        <strong>{formatMoney(summary.balance)}</strong>
        <p>収入から支出を引いた金額です</p>
      </div>

      <div className="summary-grid">
        <div className="summary-card income">
          <span>収入</span>
          <strong>+{formatMoney(summary.income)}</strong>
        </div>
        <div className="summary-card expense">
          <span>支出</span>
          <strong>-{formatMoney(summary.expense)}</strong>
        </div>
        <div className="summary-card balance">
          <span>残高</span>
          <strong>{formatMoney(summary.balance)}</strong>
        </div>
      </div>

      {!hasExpense && (
        <p className="notice-text">まだ支出が登録されていません</p>
      )}

      <section className="recent-section">
        <div className="section-heading">
          <h3>最近の取引</h3>
          <a href="/list">すべて見る</a>
        </div>

        {recentTransactions.length === 0 ? (
          <p className="empty-card">まだ取引がありません</p>
        ) : (
          <div className="recent-list">
            {recentTransactions.map((transaction) => (
              <article className="recent-item" key={transaction.id}>
                <div>
                  <span className={`type-label ${transaction.type}`}>
                    {transaction.type === 'income' ? '収入' : '支出'}
                  </span>
                  <h4>{transaction.category}</h4>
                  <p>
                    {transaction.date}
                    {transaction.memo ? ` / ${transaction.memo}` : ''}
                  </p>
                </div>
                <strong className={transaction.type}>
                  {formatSignedMoney(transaction)}
                </strong>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default Home
