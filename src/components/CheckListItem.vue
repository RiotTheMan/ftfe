<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number;
  title: string;
  checks: number;
}>();

const router = useRouter();

function navigateToChecklist() {
router.push({ name: 'CheckItemView', params: { id: String(props.id) } });

}
</script>

<template>
  <div 
    class="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
    @dblclick="navigateToChecklist"
  >
    <span class="text-gray-800">{{ title }}</span>
    <span class="text-gray-500">{{ checks }}</span>
  </div>
</template>