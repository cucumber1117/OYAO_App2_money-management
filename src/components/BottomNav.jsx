const navItems = [
  { path: '/', label: 'ホーム' },
  { path: '/add', label: '入力' },
  { path: '/list', label: '一覧' },
  { path: '/category', label: 'カテゴリ' },
  { path: '/settings', label: '設定' },
]

function BottomNav({ currentPath, onNavigate }) {
  function handleClick(event, path) {
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <nav className="bottom-nav" aria-label="メインメニュー">
      {navItems.map((item) => (
        <a
          key={item.path}
          className={currentPath === item.path ? 'active' : ''}
          href={item.path}
          onClick={(event) => handleClick(event, item.path)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default BottomNav
