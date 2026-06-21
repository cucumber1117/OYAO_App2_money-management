function Settings() {
  // 設定画面担当者は、あとで必要な設定項目をこのファイルに追加してください。
  return (
    <section className="page">
      <div className="page-title">
        <p>アプリ設定</p>
        <h2>設定画面</h2>
      </div>

      <div className="settings-list">
        <label className="setting-row">
          <span>通知</span>
          <input type="checkbox" />
        </label>
        <label className="setting-row">
          <span>ダークモード</span>
          <input type="checkbox" />
        </label>
        <label className="setting-row">
          <span>月初日</span>
          <select defaultValue="1">
            <option value="1">1日</option>
            <option value="25">25日</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export default Settings
