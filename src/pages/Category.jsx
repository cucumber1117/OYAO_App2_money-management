const categories = [
  { name: '食費', type: '支出' },
  { name: '交通費', type: '支出' },
  { name: '日用品', type: '支出' },
  { name: '趣味', type: '支出' },
  { name: '給料', type: '収入' },
  { name: 'その他', type: '共通' },
]

function Category() {
  // カテゴリ画面担当者は、カテゴリの追加UIなどをこのファイルで編集してください。
  return (
    <section className="page">
      <div className="page-title">
        <p>分類を確認</p>
        <h2>カテゴリ画面</h2>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <div className="category-item" key={category.name}>
            <strong>{category.name}</strong>
            <span>{category.type}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Category
