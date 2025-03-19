import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Person {
  id: string;
  name: string;
  totalDebts: number;
}

export interface DebtItem {
  id: string;
  personId: string;
  description: string;
  amount: number;
  date: string;
}

export const formatCurrency = (amount: number): string => {
  const fixedAmount = amount.toFixed(2);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(fixedAmount))
}

export const useDebtStore = defineStore('debts', () => {
  const persons = ref<Person[]>([]);
  const debts = ref<DebtItem[]>([]);

  const initStore = () => {
    const savedPersons = localStorage.getItem('persons');
    const savedDebts = localStorage.getItem('debts');

    if (savedPersons) {
      persons.value = JSON.parse(savedPersons);
    }

    if (savedDebts) {
      debts.value = JSON.parse(savedDebts);
    }
  }

  const saveStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons.value));
    localStorage.setItem('debts', JSON.stringify(debts.value));
  }

  const totalDebts = computed(() => {
    return debts.value.reduce((total, debt) => total + debt.amount, 0);
  })

  const getPersonById = computed(() => {
    return (id: string) => persons.value.find((person: Person) => person.id === id);
  })

  const getDebtsForPerson = (personId: string) => {
    return debts.value.filter((debt) => debt.personId === personId);
  };


  const getPersonTotal = (personId: string) => computed(() =>
    getDebtsForPerson(personId).reduce((total, debt) => total + debt.amount, 0)
  )

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name,
      totalDebts: 0
    }

    persons.value.push(newPerson);
    saveStorage();
    return newPerson;
  }

  const removePerson = (id: string) => {
    persons.value = persons.value.filter(person => person.id !== id);
    debts.value = debts.value.filter(debt => debt.personId !== id);
    saveStorage();
  }

  const updatePersonTotal = (personId: string) => {
    persons.value = persons.value.map(p =>
      p.id === personId ? { ...p, totalDebts: getPersonTotal(personId).value } : p
    )
  }

  const addDebt = (personId: string, description: string, amount: number) => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      personId,
      description,
      amount,
      date: new Date().toISOString(),
    }

    debts.value.push(newDebt);
    updatePersonTotal(personId);
    saveStorage();
    return newDebt;
  }

  const removeDebt = (debtId: string) => {
    const debt = debts.value.find(debt => debt.id === debtId);
    if (debt) {
      debts.value = debts.value.filter(debt => debt.id !== debtId);
      updatePersonTotal(debt.personId);
      saveStorage();
    }
  }

  const updateDebts = (id: string, updates: Partial<DebtItem>) => {
    debts.value = debts.value.map(debt =>
      debt.id === id ? { ...debt, ...updates } : debt
    )

    const updatedDebt = debts.value.find(debt => debt.id === id);
    if (updatedDebt) {
      updatePersonTotal(updatedDebt.personId)
    }

    saveStorage()
  }

  return {
    persons,
    debts,
    getPersonById,
    getDebtsForPerson,
    getPersonTotal,
    totalDebts,
    addPerson,
    removePerson,
    updatePersonTotal,
    addDebt,
    removeDebt,
    updateDebts,
    saveStorage,
    initStore,
  }
});
