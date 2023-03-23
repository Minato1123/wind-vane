<script setup lang="ts">
const postContent = {
  postId: '123455',
  postedTime: 1679465184244,
  userId: 1,
  content: '這裡是測風向主題的故事敘述。<br>沒有其他詳細要補充的話什麼都不寫也沒關係，最後會以測風向的問題作為基準，根據發文者的角度表示贊同或是反對，依據贊同與反對的數量顯示此篇匿名文章是順風還是逆風。<br>順風的意義為大部分人與發文者是相似價值觀，而逆風則相反。<br><br>補充：記得再次檢查內容再發文，文章發出後不提供編輯以影響風向結果。',
  mainQuestion: '測風向的主要問題，記得傳達到發文者自己的方向。',
  like: 10,
  dislike: 3,
  deleted: false,
}

const postedTime = computed(() => {
  const time = new Date(postContent.postedTime)
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
})

const tags = ['這裡是 Tags', '說明', '發文介紹']
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 sm:rounded-xl">
    <div class="bg-app-2 sm:rounded-tl-xl sm:rounded-tr-xl w-full h-10 flex items-center justify-between">
      <div class="sm:rounded-tl-xl sm:rounded-tr-xl sm:w-1/6 w-1/3 h-full bg-app-3 text-app-4 tracking-wider text-lg flex justify-center items-center">
        {{ postContent.postId }}
      </div>
      <div class="text-app-4 text-xs">
        {{ postedTime }}
      </div>
      <div class="flex items-center pr-2 text-lg">
        <div class="text-app-6 mr-4">
          <Icon name="clarity:flag-solid" class="mr-2" />順風
        </div>
        <VDropdown :distance="6" placement="right-start">
          <button><Icon class="text-app-4 cursor-pointer hover:text-app-4/80" name="ic:outline-more-vert" /></button>
          <template #popper>
            <div class="p-1 flex flex-col justify-center items-center text-app-3">
              <button class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300">
                儲存貼文
              </button>
              <button class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300">
                刪除貼文
              </button>
              <button class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300">
                檢舉
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
    </div>
    <div class="p-4 w-full">
      <div class="text-app-4 pb-4 min-h-[4rem]" v-html="postContent.content" />
      <div class="text-app-8/50 text-sm pb-2 flex items-center gap-2">
        <div v-for="(tag, i) in tags" :key="`tag-${i}`" class="cursor-pointer hover:text-app-8/70 transition-all duration-300">
          #{{ tag }}
        </div>
      </div>
      <div class="bg-app-4 text-app-3 rounded-xl min-h-[4rem] flex items-center py-2 px-4">
        {{ postContent.mainQuestion }}
      </div>
    </div>
    <div class="bg-app-4 mx-4 h-[0.1rem] m-auto" />
    <div class="flex text-app-4 py-2">
      <div class="hover:text-app-6 transition-all duration-200 w-2/6 flex justify-center items-center cursor-pointer">
        <Icon name="bx:bxs-like" size="1.5rem" />
      </div>
      <div class="hover:text-app-7 transition-all duration-200 w-2/6 flex justify-center items-center cursor-pointer">
        <Icon name="bx:bxs-dislike" size="1.5rem" />
      </div>
      <div class="hover:text-app-8 transition-all duration-200 w-2/6 flex justify-center items-center cursor-pointer">
        <Icon name="lucide:wind" size="1.5rem" />
      </div>
    </div>
  </div>
</template>
