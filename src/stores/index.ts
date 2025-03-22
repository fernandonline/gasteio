import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Category {
  id: string;
  name: string;
  totalDebts: number;
}

export interface DebtItem {
  id: string;
  categoryId: string;
  description: string;
  amount: number;
  date: string;
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}


export const useDebtStore = defineStore('debts', () => {
  const categories = ref<Category[]>([]);
  const debts = ref<DebtItem[]>([]);

  const initStore = () => {
    const savedCategories = localStorage.getItem('categories');
    const savedDebts = localStorage.getItem('debts');

    if (savedCategories) {
      categories.value = JSON.parse(savedCategories);
    }

    if (savedDebts) {
      debts.value = JSON.parse(savedDebts);
    }
  }

  const saveStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories.value));
    localStorage.setItem('debts', JSON.stringify(debts.value));
  }

  const totalDebts = computed(() => {
    return debts.value.reduce((total, debt) => total + debt.amount, 0);
  })

  const getCategoryById = computed(() => {
    return (id: string) => categories.value.find((category: Category) => category.id === id);
  })

  const getDebtsForCategory = (categoryId: string) => {
    return debts.value.filter((debt) => debt.categoryId === categoryId);
  };


  const getCategoryTotal = (categoryId: string) => computed(() =>
    getDebtsForCategory(categoryId).reduce((total, debt) => total + debt.amount, 0)
  )

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      totalDebts: 0
    }

    categories.value.push(newCategory);
    saveStorage();
    return newCategory;
  }

  const removeCategory = (id: string) => {
    categories.value = categories.value.filter(category => category.id !== id);
    debts.value = debts.value.filter(debt => debt.categoryId !== id);
    saveStorage();
  }

  const updateCategoryTotal = (categoryId: string) => {
    categories.value = categories.value.map(c =>
      c.id === categoryId ? { ...c, totalDebts: getCategoryTotal(categoryId).value } : c
    )
  }

  const addDebt = (categoryId: string, description: string, amount: number) => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      categoryId,
      description,
      amount,
      date: new Date().toISOString(),
    }

    debts.value.push(newDebt);
    updateCategoryTotal(categoryId);
    saveStorage();
    return newDebt;
  }

  const removeDebt = (debtId: string) => {
    const debt = debts.value.find(debt => debt.id === debtId);
    if (debt) {
      debts.value = debts.value.filter(debt => debt.id !== debtId);
      updateCategoryTotal(debt.categoryId);
      saveStorage();
    }
  }

  const updateDebts = (id: string, updates: Partial<DebtItem>) => {
    debts.value = debts.value.map(debt =>
      debt.id === id ? { ...debt, ...updates } : debt
    )

    const updatedDebt = debts.value.find(debt => debt.id === id);
    if (updatedDebt) {
      updateCategoryTotal(updatedDebt.categoryId)
    }

    saveStorage()
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
    initStore,
  }
});
