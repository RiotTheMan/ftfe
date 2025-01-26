<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ChecklistItem from '@/components/ChecklistItem.vue';
import { useAuthStore } from '@/stores/auth';
import '@fortawesome/fontawesome-free/css/all.css';

interface CheckItem {
  id: number;
  description: string;
  completed: boolean;
}

interface FluxUser {
  id: number;
  username: string;
}

interface Checklist {
  id: number;
  title: string;
  items: CheckItem[];
  user: FluxUser;
}

const auth = useAuthStore();
const token = auth.token;
const checklists = ref<Checklist[]>([]);
const searchQuery = ref('');

async function fetchChecklists() {
  try {
    const response = await fetch('http://localhost:8080/api/todo/getAllToDoByUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(JSON.stringify(response));

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    checklists.value = data;
  } catch (error) {
    console.error('Failed to fetch checklists:', error);
  }
}

onMounted(fetchChecklists);

const filteredChecklists = computed(() => {
  return checklists.value.filter(checklist =>
    checklist.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function addChecklist() {
  const title = 'Click here to Change Title';

  try {
    const response = await fetch(`http://localhost:8080/api/todo/createTodo?title=${title}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await fetchChecklists();
  } catch (error) {
    console.error('Failed to add checklist:', error);
  }
}

async function updateChecklistTitle(id: number, newTitle: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/todo/updateTodoTitle?id=${id}&title=${newTitle}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await fetchChecklists();
  } catch (error) {
    console.error('Failed to update checklist title:', error);
  }
}

function logout() {
  auth.logout();
}
</script>

<template>
  <div class="w-full max-md p-6 bg-white rounded-2xl shadow-lg">
    <div class="flex items-center justify-between">
      <i @click="logout" class="fas fa-sign-out-alt text-gray-900 cursor-pointer hover:text-gray-700"></i>
      <h2 class="text-2xl font-bold text-center text-gray-900">To Do</h2>
      <i @click="addChecklist" class="fas fa-plus text-gray-900 cursor-pointer hover:text-gray-700"></i>
    </div>
    <div class="mt-4">
      <div class="relative">
        <input type="text" v-model="searchQuery" placeholder="Search for a Task"
          class="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring focus:ring-indigo-300">
      </div>
    </div>
    <div class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      <ChecklistItem
        v-for="checklist in filteredChecklists"
        :key="checklist.id"
        :id="checklist.id"
        :title="checklist.title"
        :checks="checklist.items.length"
        :onUpdateTitle="updateChecklistTitle"
      />
    </div>
  </div>
</template>