import React from "react";
import "./Settings.css";

/*
  Settings.jsx
  金銭管理アプリの設定画面
  ※見た目を分かりやすくするための画面です。
  ※実際の保存機能などはまだ入れていません。
*/

function Settings() {
  return (
    <div className="settings-page">
      {/* アプリ名 */}
      <section className="settings-card">
        <h1>金銭管理アプリ</h1>
        <p className="app-description">
          収入や支出を記録して、お金の使い方を分かりやすく管理するアプリです。
        </p>
      </section>

      {/* 使い方説明 */}
      <section className="settings-card">
        <h2>使い方</h2>
        <p>
          ホーム画面で収入・支出を登録し、一覧やグラフでお金の流れを確認できます。
        </p>
      </section>

      {/* テーマ切り替え風のUI */}
      <section className="settings-card">
        <h2>テーマ設定</h2>
        <div className="setting-row">
          <span>ダークモード</span>
          {/* 今は見た目だけのスイッチ */}
          <button className="toggle-button">OFF</button>
        </div>
      </section>

      {/* データ管理 */}
      <section className="settings-card">
        <h2>データ管理</h2>
        <button className="settings-button">データをエクスポート</button>
        <button className="settings-button danger">データをリセット</button>
      </section>

      {/* プロフィール設定風 */}
      <section className="settings-card">
        <h2>プロフィール</h2>

        <label className="input-label">
          ユーザー名
          <input type="text" placeholder="例：佐々木" />
        </label>

        <label className="input-label">
          月の予算
          <input type="number" placeholder="例：50000" />
        </label>

        <button className="settings-button">保存</button>
      </section>
    </div>
  );
}

export default Settings;