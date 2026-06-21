const STORAGE_KEY = 'money-app-transactions'

// localStorageから登録データを読み込みます。
export function getTransactions() {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (!savedData) {
    return []
  }

  try {
    return JSON.parse(savedData)
  } catch {
    return []
  }
}

function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

// 新しい収入・支出データを追加します。
export function addTransaction(transaction) {
  const transactions = getTransactions()
  const newTransaction = {
    ...transaction,
    id: transaction.id || crypto.randomUUID(),
    amount: Number(transaction.amount),
  }

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

    return {
      ...transaction,
      ...updatedTransaction,
      id,
      amount: Number(updatedTransaction.amount ?? transaction.amount),
    }
  })

  saveTransactions(updatedTransactions)
}

// 指定した年月の収入・支出・残高を計算します。monthは1月なら1、12月なら12です。
export function getMonthlySummary(year, month) {
  const transactions = getTransactions()
  const targetMonth = String(month).padStart(2, '0')
  const targetDateText = `${year}-${targetMonth}`

  return transactions
    .filter((transaction) => transaction.date.startsWith(targetDateText))
    .reduce(
      (summary, transaction) => {
        if (transaction.type === 'income') {
          summary.income += transaction.amount
        } else {
          summary.expense += transaction.amount
        }

        summary.balance = summary.income - summary.expense
        return summary
      },
      { income: 0, expense: 0, balance: 0 },
    )
}
