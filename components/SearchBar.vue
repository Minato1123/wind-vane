<script setup lang="ts">
const searchString = ref<string>('')

function handleSearch() {
  navigateTo({
    name: 'tags',
    query: {
      tags: searchString.value,
    },
  })
}

function handleEnter(e: KeyboardEvent) {
  if (e.isComposing)
    return

  handleSearch()
}
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 text-app-4 flex justify-between items-center gap-4 px-4 py-2 sm:rounded-3xl">
    <input v-model="searchString" class="grow bg-app-3 outline-none" type="text" placeholder="想搜尋什麼 Tag 呢？" @keydown.enter="handleEnter">
    <button class="hover:text-app-8 transition-all duration-300" @click="handleSearch">
      <Icon name="material-symbols:search-rounded" size="1.5rem" />
    </button>
  </div>
</template>
