const STORAGE_KEY = 'money-manager-transactions'

function getTodayText() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const date = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${date}`
}

function normalizeTransaction(transaction) {
  // 保存する形をここでそろえると、各ページ側のコードがシンプルになります。
  return {
    id: transaction.id || Date.now().toString(),
    type: transaction.type === 'income' ? 'income' : 'expense',
    amount: Number(transaction.amount) || 0,
    category: transaction.category || 'その他',
    date: transaction.date || getTodayText(),
    memo: transaction.memo || '',
  }
}

// localStorageから取引データを読み込みます。
export function getTransactions() {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (!savedData) {
    return []
  }

  try {
    const transactions = JSON.parse(savedData)
    return Array.isArray(transactions) ? transactions : []
  } catch {
    // JSONが壊れていても、アプリが落ちないように空配列を返します。
    return []
  }
}

// 取引データ配列をlocalStorageに保存します。
export function saveTransactions(transactions) {
  const safeTransactions = Array.isArray(transactions) ? transactions : []
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safeTransactions))
}

// 新しい収入・支出データを追加します。
export function addTransaction(transaction) {
  const transactions = getTransactions()
  const newTransaction = normalizeTransaction(transaction)

  saveTransactions([newTransaction, ...transactions])
  return newTransaction
}

// idが一致するデータを削除します。
export function deleteTransaction(id) {
  const transactions = getTransactions()
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.id !== id,
  )

  saveTransactions(filteredTransactions)
}

// idが一致するデータの内容を更新します。
export function updateTransaction(id, updatedTransaction) {
  const transactions = getTransactions()
  const updatedTransactions = transactions.map((transaction) => {
    if (transaction.id !== id) {
      return transaction
    }

    return normalizeTransaction({
      ...transaction,
      ...updatedTransaction,
      id,
    })
  })

  saveTransactions(updatedTransactions)
}

// 指定した年月の収入・支出・残高を計算します。monthは1月なら1、12月なら12です。
export function getMonthlySummary(year, month) {
  const transactions = getTransactions()
  const targetMonth = String(month).padStart(2, '0')
  const targetDateText = `${year}-${targetMonth}`

  const summary = transactions
    .filter((transaction) => transaction.date?.startsWith(targetDateText))
    .reduce(
      (currentSummary, transaction) => {
        const amount = Number(transaction.amount) || 0

        if (transaction.type === 'income') {
          currentSummary.income += amount
        } else {
          currentSummary.expense += amount
        }

        return currentSummary
      },
      { income: 0, expense: 0, balance: 0 },
    )

  summary.balance = summary.income - summary.expense
  return summary
}

// 最近の取引を日付が新しい順に並べ、指定件数だけ返します。
export function getRecentTransactions(limit = 5) {
  return [...getTransactions()]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}
