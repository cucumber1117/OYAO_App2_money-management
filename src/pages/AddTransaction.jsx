import React, { useState } from "react";
import { addTransaction } from "../data/transactionStorage";

function AddTransaction() {
  // 収入・支出の状態管理
  const [type, setType] = useState("expense");

  // 金額の状態管理
  const [amount, setAmount] = useState("");

  // カテゴリの状態管理
  const [category, setCategory] = useState("");

  // 日付の状態管理
  const [date, setDate] = useState("");

  // メモの状態管理
  const [memo, setMemo] = useState("");

  // 追加ボタンが押されたときの処理
  const handleSubmit = () => {
    // 金額が入力されていない場合
    if (!amount) {
      alert("金額を入力してください");
      return;
    }

    // 登録するデータを作成
    const transaction = {
      // 一意のIDを作成
      id: Date.now().toString(),

      // 収入 or 支出
      type,

      // 金額を数値に変換
      amount: Number(amount),

      // カテゴリ
      category,

      // 日付
      date,

      // メモ
      memo,
    };

    // transactionStorage.js の addTransaction を実行
    addTransaction(transaction);

    // 登録完了メッセージ
    alert("登録しました");

    // 入力欄をリセット
    setType("expense");
    setAmount("");
    setCategory("");
    setDate("");
    setMemo("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>取引追加</h2>

      {/* 収入・支出選択 */}
      <div>
        <label>種別：</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
      </div>

      <br />

      {/* 金額入力 */}
      <div>
        <label>金額：</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="金額を入力"
        />
      </div>

      <br />

      {/* カテゴリ選択 */}
      <div>
        <label>カテゴリ：</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="食費">食費</option>
          <option value="交通費">交通費</option>
          <option value="娯楽">娯楽</option>
          <option value="給料">給料</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <br />

      {/* 日付入力 */}
      <div>
        <label>日付：</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <br />

      {/* メモ入力 */}
      <div>
        <label>メモ：</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="メモを入力"
          rows={4}
        />
      </div>

      <br />

      {/* 追加ボタン */}
      <button onClick={handleSubmit}>
        追加
      </button>
    </div>
  );
}

export default AddTransaction;