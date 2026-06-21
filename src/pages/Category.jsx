import { useState } from 'react'

// 最初に画面へ表示するカテゴリ一覧です。
// type が "expense" のものは支出、"income" のものは収入として扱います。
const initialCategories = [
  { id: 1, name: '食費', type: 'expense' },
  { id: 2, name: '交通費', type: 'expense' },
  { id: 3, name: '娯楽', type: 'expense' },
  { id: 4, name: '日用品', type: 'expense' },
  { id: 5, name: '給料', type: 'income' },
  { id: 6, name: '副業', type: 'income' },
]

function Category() {
  // categories は画面に表示するカテゴリ一覧です。
  // setCategories を使うと、カテゴリを追加したあとに画面が自動で更新されます。
  const [categories, setCategories] = useState(initialCategories)

  // フォームに入力されたカテゴリ名と種類を保存します。
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryType, setNewCategoryType] = useState('expense')

  // 支出カテゴリだけを取り出して、支出エリアに表示します。
  const expenseCategories = categories.filter((category) => category.type === 'expense')

  // 収入カテゴリだけを取り出して、収入エリアに表示します。
  const incomeCategories = categories.filter((category) => category.type === 'income')

  function handleAddCategory(event) {
    // フォーム送信時にページが再読み込みされないようにします。
    event.preventDefault()

    // 前後の空白を消して、空欄のカテゴリが追加されないようにします。
    const trimmedName = newCategoryName.trim()
    if (trimmedName === '') {
      return
    }

    // 入力内容から、新しいカテゴリデータを作ります。
    const nextCategory = {
      id: Date.now(),
      name: trimmedName,
      type: newCategoryType,
    }

    // 既存のカテゴリ一覧の最後に、新しいカテゴリを追加します。
    setCategories([...categories, nextCategory])

    // 追加後はフォームを初期状態に戻します。
    setNewCategoryName('')
    setNewCategoryType('expense')
  }

  return (
    <section className="page">
      <div className="page-title">
        <p>収入と支出のカテゴリを確認できます</p>
        <h2>カテゴリ</h2>
      </div>

      <div className="category-section">
        <h3>支出カテゴリ</h3>
        <div className="category-list">
          {expenseCategories.map((category) => (
            <div className="category-item" key={category.id}>
              <strong>{category.name}</strong>
              <span className="type-label expense">支出</span>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h3>収入カテゴリ</h3>
        <div className="category-list">
          {incomeCategories.map((category) => (
            <div className="category-item" key={category.id}>
              <strong>{category.name}</strong>
              <span className="type-label income">収入</span>
            </div>
          ))}
        </div>
      </div>

      <form className="form" onSubmit={handleAddCategory}>
        <label>
          カテゴリ名
          <input
            type="text"
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
            placeholder="例：医療費"
          />
        </label>

        <label>
          カテゴリの種類
          <select value={newCategoryType} onChange={(event) => setNewCategoryType(event.target.value)}>
            <option value="expense">支出</option>
            <option value="income">収入</option>
          </select>
        </label>

        <button type="submit">カテゴリを追加</button>
      </form>
    </section>
  )
}

export default Category
