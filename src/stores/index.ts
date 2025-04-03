import { defineStore } from 'pinia'
import type { Category, DebtItem } from './storeTypes'
import { ref, computed } from 'vue'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export const useDebtStore = defineStore('debts', () => {
  const categories = ref<Category[]>([])
  const debts = ref<DebtItem[]>([])

  const initStore = async () => {
    await loadStorage()
  }

  const saveStorage = async () => {
    try {
      await Filesystem.writeFile({
        path: 'debts.json',
        data: JSON.stringify({ categories: categories.value, debts: debts.value }),
        directory: Directory.Data,
        encoding: Encoding.UTF8
      })
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const loadStorage = async () => {
    try {
      const result = await Filesystem.readFile({
        path: 'debts.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8
      })
      const parsedData = JSON.parse(result.data as string)
      categories.value = parsedData.categories || []
      debts.value = parsedData.debts || []
    } catch {
      console.warn('Nenhum dado salvo encontrado ou erro ao carregar.')
    }
  }

  const totalDebts = computed(() => debts.value.reduce((total, debt) => total + debt.amount, 0))

  const getCategoryById = computed(() => (id: string) => categories.value.find(category => category.id === id))

  const getDebtsForCategory = (categoryId: string) => debts.value.filter(debt => debt.categoryId === categoryId)

  const getCategoryTotal = (categoryId: string) => computed(() =>
    getDebtsForCategory(categoryId).reduce((total, debt) => total + debt.amount, 0)
  )

  const addCategory = async (name: string) => {
    const newCategory: Category = { id: Date.now().toString(), name, totalDebts: 0 }
    categories.value.push(newCategory)
    await saveStorage()
    return newCategory
  }

  const removeCategory = async (id: string) => {
    categories.value = categories.value.filter(category => category.id !== id)
    debts.value = debts.value.filter(debt => debt.categoryId !== id)
    await saveStorage()
  }

  const updateCategoryTotal = (categoryId: string) => {
    categories.value = categories.value.map(c =>
      c.id === categoryId ? { ...c, totalDebts: getCategoryTotal(categoryId).value } : c
    )
  }

  const addDebt = async (categoryId: string, description: string, amount: number) => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      categoryId,
      description,
      amount,
      date: new Date().toISOString()
    }
    debts.value.push(newDebt)
    updateCategoryTotal(categoryId)
    await saveStorage()
    return newDebt
  }

  const removeDebt = async (debtId: string) => {
    const debt = debts.value.find(debt => debt.id === debtId)
    if (debt) {
      debts.value = debts.value.filter(debt => debt.id !== debtId)
      updateCategoryTotal(debt.categoryId)
      await saveStorage()
    }
  }

  const updateDebts = async (id: string, updates: Partial<DebtItem>) => {
    debts.value = debts.value.map(debt =>
      debt.id === id ? { ...debt, ...updates } : debt
    )
    const updatedDebt = debts.value.find(debt => debt.id === id)
    if (updatedDebt) {
      updateCategoryTotal(updatedDebt.categoryId)
    }
    await saveStorage()
  }

  return {
    categories,
    debts,
    getCategoryById,
    getDebtsForCategory,
    getCategoryTotal,
    totalDebts,
    addCategory,
    removeCategory,
    updateCategoryTotal,
    addDebt,
    removeDebt,
    updateDebts,
    saveStorage,
    initStore
  }
})
