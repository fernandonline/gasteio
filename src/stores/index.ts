import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Capacitor } from '@capacitor/core'
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite'

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
  let db: SQLiteDBConnection | null = null;

  const isMobile = Capacitor.getPlatform() !== 'web'; // Detecta se está no mobile

  const initStore = async () => {
    if (isMobile) {
      await initSQLiteStore();
    } else {
      initLocalStorageStore();
    }
  }

  // Inicializa usando o SQLite
  const initSQLiteStore = async () => {
    try {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      db = await sqlite.createConnection("debts.db", false, "no-encryption", 1, false); // Criação da conexão com o SQLite
      await db.open();

      // Criar tabelas se não existirem
      await db.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT,
          totalDebts REAL
        );
        CREATE TABLE IF NOT EXISTS debts (
          id TEXT PRIMARY KEY,
          categoryId TEXT,
          description TEXT,
          amount REAL,
          date TEXT
        );
      `);

      // Carregar dados do SQLite
      await loadSQLiteData();
    } catch (error) {
      console.error("Erro ao inicializar SQLite:", error);
    }
  }

  // Carrega dados do SQLite para o estado da store
  const loadSQLiteData = async () => {
    if (db) {
      const categoryResult = await db.query('SELECT * FROM categories');
      categories.value = categoryResult.values || [];

      const debtResult = await db.query('SELECT * FROM debts');
      debts.value = debtResult.values || [];
    }
  }

  // Inicializa usando o localStorage (web)
  const initLocalStorageStore = () => {
    categories.value = JSON.parse(localStorage.getItem('categories') || '[]');
    debts.value = JSON.parse(localStorage.getItem('debts') || '[]');
  }

  // Salva dados na store (SQLite ou LocalStorage)
  const saveStorage = async () => {
    if (isMobile && db) {
      // Se for mobile, salva no SQLite
      await db.execute('DELETE FROM categories');
      categories.value.forEach(async (category) => {
        await db!.run('INSERT INTO categories (id, name, totalDebts) VALUES (?, ?, ?)',
          [category.id, category.name, category.totalDebts]);
      });

      await db.execute('DELETE FROM debts');
      debts.value.forEach(async (debt) => {
        await db!.run('INSERT INTO debts (id, categoryId, description, amount, date) VALUES (?, ?, ?, ?, ?)',
          [debt.id, debt.categoryId, debt.description, debt.amount, debt.date]);
      });
    } else {
      // Se for desktop (web), salva no localStorage
      localStorage.setItem('categories', JSON.stringify(categories.value));
      localStorage.setItem('debts', JSON.stringify(debts.value));
    }
  }

  // Cálculo do total de dívidas
  const totalDebts = computed(() => debts.value.reduce((total, debt) => total + debt.amount, 0));

  // Função para obter categoria por id
  const getCategoryById = computed(() => (id: string) => categories.value.find(category => category.id === id));

  // Função para obter as dívidas de uma categoria
  const getDebtsForCategory = (categoryId: string) => debts.value.filter(debt => debt.categoryId === categoryId);

  // Cálculo do total de uma categoria
  const getCategoryTotal = (categoryId: string) => computed(() =>
    getDebtsForCategory(categoryId).reduce((total, debt) => total + debt.amount, 0)
  );

  // Adiciona uma nova categoria
  const addCategory = async (name: string) => {
    const newCategory: Category = { id: Date.now().toString(), name, totalDebts: 0 };
    categories.value.push(newCategory);
    await saveStorage();
    return newCategory;
  }

  // Remove uma categoria
  const removeCategory = async (id: string) => {
    categories.value = categories.value.filter(category => category.id !== id);
    debts.value = debts.value.filter(debt => debt.categoryId !== id);
    await saveStorage();
  }

  // Atualiza o total de uma categoria
  const updateCategoryTotal = (categoryId: string) => {
    categories.value = categories.value.map(c =>
      c.id === categoryId ? { ...c, totalDebts: getCategoryTotal(categoryId).value } : c
    );
  }

  // Adiciona uma nova dívida
  const addDebt = async (categoryId: string, description: string, amount: number) => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      categoryId,
      description,
      amount,
      date: new Date().toISOString(),
    };

    debts.value.push(newDebt);
    updateCategoryTotal(categoryId);
    await saveStorage();
    return newDebt;
  }

  // Remove uma dívida
  const removeDebt = async (debtId: string) => {
    const debt = debts.value.find(debt => debt.id === debtId);
    if (debt) {
      debts.value = debts.value.filter(debt => debt.id !== debtId);
      updateCategoryTotal(debt.categoryId);
      await saveStorage();
    }
  }

  // Atualiza os dados de uma dívida
  const updateDebts = async (id: string, updates: Partial<DebtItem>) => {
    debts.value = debts.value.map(debt =>
      debt.id === id ? { ...debt, ...updates } : debt
    );
    const updatedDebt = debts.value.find(debt => debt.id === id);
    if (updatedDebt) {
      updateCategoryTotal(updatedDebt.categoryId);
    }
    await saveStorage();
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
