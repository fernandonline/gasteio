<script setup lang="ts">
import AddCategory from '../components/containers/CategoryForm.vue';
import CategoryList from '../components/layout/CategoriesList.vue';
import { useDebtStore } from '@/stores';

const debtStore = useDebtStore()

const removeCategory = (categoryId: string) => {
  debtStore.removeCategory(categoryId)
}
</script>

<template>
  <div class="category-title">
    <h2>categorias</h2>
  </div>

    <AddCategory/>
    <CategoryList :categories="debtStore.categories" @remove-category="removeCategory" />
</template>
