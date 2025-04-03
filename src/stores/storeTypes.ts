export interface Category {
  id: string
  name: string
  totalDebts: number
}

export interface DebtItem {
  id: string
  categoryId: string
  description: string
  amount: number
  date: string
}
