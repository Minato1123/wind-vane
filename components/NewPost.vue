<script setup lang="ts">
const { textarea, input } = useTextareaAutosize()
const mainQuestion = ref('')
watch(mainQuestion, () => mainQuestion.value = mainQuestion.value.replaceAll('\n', ''))
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 sm:rounded-xl">
    <div class="bg-app-2 sm:rounded-tl-xl sm:rounded-tr-xl w-full h-10 flex items-center justify-between">
      <div class="sm:rounded-tl-xl sm:rounded-tr-xl w-2/5 sm:w-1/4 h-full bg-app-3 text-app-4 tracking-wider text-lg flex justify-center items-center gap-2">
        <Icon class="flex justify-center items-center" name="material-symbols:edit-square-outline-rounded" size="1.5rem" />新增貼文
      </div>
    </div>
    <div class="p-4 w-full">
      <textarea ref="textarea" v-model="input" placeholder="大風吹～ 吹什麼？" spellcheck="false" class="text-app-4 placeholder:text-app-4/50 mb-2 min-h-[5rem] w-full outline-none border-none bg-app-3 resize-none" />
      <div class="pb-2 flex items-center gap-2">
        <Tag />
        <Tag tag-name="The Tag" />
      </div>
      <textarea v-model="mainQuestion" rows="1" placeholder="主要問題" spellcheck="false" class="bg-app-4 text-app-3 placeholder:text-app-3/50 rounded-xl w-full flex items-center py-4 px-4 outline-none resize-none leading-normal" />
    </div>
    <div class="flex items-center justify-center rounded-xl cursor-pointer bg-app-5 text-app-8 py-1 mx-4 mb-4 hover:bg-app-5/75 transition-all duration-300">
      測風向
    </div>
    <!-- <div v-if="input" v-html="input.replaceAll('\n', '<br>')" /> -->
  </div>
</template>
