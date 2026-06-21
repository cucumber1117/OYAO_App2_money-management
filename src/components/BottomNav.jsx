const navItems = [
  { page: 'home', label: 'ホーム', href: '#home' },
  { page: 'add', label: '入力', href: '#add' },
  { page: 'list', label: '一覧', href: '#list' },
  { page: 'category', label: 'カテゴリ', href: '#category' },
  { page: 'settings', label: '設定', href: '#settings' },
]

function BottomNav({ currentPage }) {
  return (
    <nav className="bottom-nav" aria-label="メインメニュー">
      {navItems.map((item) => (
        <a
          key={item.page}
          className={currentPage === item.page ? 'active' : ''}
          href={item.href}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default BottomNav
