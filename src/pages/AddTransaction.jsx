import { useState } from 'react'
import { addTransaction } from '../data/transactionStorage'

const defaultForm = {
  type: 'expense',
  amount: '',
  category: '食費',
  date: new Date().toISOString().slice(0, 10),
  memo: '',
}

const categories = ['食費', '交通費', '日用品', '給料', '趣味', 'その他']

function AddTransaction() {
  // 入力画面担当者は、フォームの見た目や項目をこのファイルで編集してください。
  const [form, setForm] = useState(defaultForm)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.amount || Number(form.amount) <= 0) {
      setMessage('金額を入力してください。')
      return
    }

    addTransaction({
      type: form.type,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      memo: form.memo,
    })

    setForm({ ...defaultForm, date: new Date().toISOString().slice(0, 10) })
    setMessage('登録しました。')
  }

  return (
    <section className="page">
      <div className="page-title">
        <p>収入・支出を追加</p>
        <h2>入力画面</h2>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          種類
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">支出</option>
            <option value="income">収入</option>
          </select>
        </label>

        <label>
          金額
          <input
            name="amount"
            type="number"
            min="1"
            inputMode="numeric"
            value={form.amount}
            onChange={handleChange}
            placeholder="例: 1200"
          />
        </label>

        <label>
          カテゴリ
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          日付
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        <label>
          メモ
          <textarea
            name="memo"
            value={form.memo}
            onChange={handleChange}
            placeholder="任意でメモを入力"
          />
        </label>

        <button type="submit">登録する</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  )
}

export default AddTransaction
