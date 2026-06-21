import { getMonthlySummary } from '../data/transactionStorage'

function formatMoney(amount) {
  return `${amount.toLocaleString()}円`
}

function Home() {
  // ホーム担当者は、表示内容をこのファイルの中で編集してください。
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const summary = getMonthlySummary(year, month)

  return (
    <section className="page">
      <div className="page-title">
        <p>{year}年{month}月</p>
        <h2>今月のまとめ</h2>
      </div>

      <div className="summary-grid">
        <div className="summary-card income">
          <span>収入</span>
          <strong>{formatMoney(summary.income)}</strong>
        </div>
        <div className="summary-card expense">
          <span>支出</span>
          <strong>{formatMoney(summary.expense)}</strong>
        </div>
        <div className="summary-card balance">
          <span>残高</span>
          <strong>{formatMoney(summary.balance)}</strong>
        </div>
      </div>
    </section>
  )
}

export default Home
