<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import '@fortawesome/fontawesome-free/css/all.css';

interface CheckItem {
  id: number;
  description: string;
  completed: boolean;
}

const route = useRoute();
const router = useRouter();
const checklistId = route.params.id;
const checklistTitle = ref(route.query.title as string || ''); 
const auth = useAuthStore();
const token = auth.token;
const checkItems = ref<CheckItem[]>([]);
const searchQuery = ref('');
const newItemText = ref('');

const newTitle = ref(checklistTitle.value); 

function updateTitle() {
  console.log('Updating title:', newTitle.value);
}

async function fetchCheckItems() {
  try {
    const response = await fetch(`http://localhost:8080/api/check/getAllCheckItemsByTodoId?todoId=${checklistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    checkItems.value = data;
  } catch (error) {
    console.error('Failed to fetch check items:', error);
  }
}

onMounted(fetchCheckItems);

const filteredCheckItems = computed(() => {
  return checkItems.value.filter(item =>
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function addCheckItem() {
  const description = 'New Check Item';

  try {
    const response = await fetch(`http://localhost:8080/api/check/create?todoId=${checklistId}&description=${encodeURIComponent(description)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await fetchCheckItems();
  } catch (error) {
    console.error('Failed to add check item:', error);
  }
}

async function updateCheckItem(id: number, description: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/check/updateCheckItemTitle?id=${id}&title=${encodeURIComponent(description)}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await fetchCheckItems();
  } catch (error) {
    console.error('Failed to update check item:', error);
  }
}

async function deleteCheckItem(id: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/check/delete?checkItemId=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await fetchCheckItems();
  } catch (error) {
    console.error('Failed to delete check item:', error);
  }
}

function goBack() {
  router.push({ name: 'Todo' });
}
</script>

<template>
  <div class="w-full max-md p-6 bg-white rounded-2xl shadow-lg">
    <div class="flex items-center justify-between">
      <i @click="goBack" class="fas fa-arrow-left text-gray-900 cursor-pointer hover:text-gray-700"></i>
      <!-- <input 
        type="text"
        v-model="newTitle"
        @blur="updateTitle"
        class="border p-2 rounded w-full"
      > -->
      <!-- <h2 class="text-2xl font-bold text-center text-gray-900">Item Details</h2> -->
      <i @click="addCheckItem" class="fas fa-plus text-gray-900 cursor-pointer hover:text-gray-700"></i>
    </div>
    <div class="mt-4">
      <div class="relative">
        <input type="text" v-model="searchQuery" placeholder="Search for a Task"
          class="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring focus:ring-indigo-300">
      </div>
    </div>
    <div class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      <div 
        v-for="item in filteredCheckItems"
        :key="item.id"
        class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <input
          type="checkbox"
          v-model="item.completed"
          class="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
        >
        <input
          type="text"
          v-model="item.description"
          @blur="updateCheckItem(item.id, item.description)"
          class="flex-1 bg-transparent focus:outline-none focus:ring-0 border-none"
          :class="{ 'line-through text-gray-400': item.completed }"
        >
        <button
          @click="deleteCheckItem(item.id)"
          class="text-red-500 hover:text-red-600 transition-colors"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>