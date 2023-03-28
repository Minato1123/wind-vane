<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useLogout } from '~~/composables/api/useLogout'

defineEmits<{
  (e: 'openLoginDialog'): void
}>()

const { userToken, isLoggedin } = storeToRefs(useUserStore())
const { userLogout } = useUserStore()

const isOpenLogoutCheckDialog = ref(false)

const { pending, data, execute: handleLogout } = useLogout({
  token: userToken.value,
})

watch(pending, async () => {
  if (pending.value === false) {
    if (data.value == null)
      return

    if (data.value.success === false)
      // eslint-disable-next-line no-console
      console.log('登出失敗！')

    userLogout()
    isOpenLogoutCheckDialog.value = false
    await navigateTo({
      name: 'index',
    })
  }
}, {
  immediate: true,
})
</script>

<template>
  <div class="bg-app-3 text-app-4 hidden lg:block rounded-xl p-3">
    <div v-if="isLoggedin" class="w-full flex flex-col gap-4">
      <NuxtLink
        class="w-full flex flex-col gap-2 items-center justify-center hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'profile',
        }"
      >
        <div class="bg-app-4 rounded-full h-12 w-12 text-app-8 flex items-center justify-center">
          <Icon name="ic:round-person" size="2rem" />
        </div>
        <div>個人資料</div>
      </NuxtLink>
      <NuxtLink
        class="hover:text-app-8 transition-all duration-200 flex justify-center"
        :to="{
          name: 'index',
        }"
      >
        首頁
      </NuxtLink>
      <NuxtLink
        class="hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'responsedPost',
        }"
      >
        已表態貼文
      </NuxtLink>
      <NuxtLink
        class="hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'savedPost',
        }"
      >
        已儲存貼文
      </NuxtLink>
      <button class="hover:text-app-8 transition-all duration-200" @click="isOpenLogoutCheckDialog = true">
        登出
      </button>
    </div>
    <button v-else class="w-full flex flex-col gap-2 items-center justify-center cursor-pointer hover:text-app-8 transition-all duration-200 outline-none" @click="$emit('openLoginDialog')">
      <div class="bg-app-4 rounded-full h-12 w-12 text-app-8 flex items-center justify-center">
        <Icon name="material-symbols:question-mark-rounded" size="2rem" />
      </div>
      <div>登入／註冊</div>
    </button>
    <DialogWrapper>
      <InfoDialog v-if="isOpenLogoutCheckDialog" info-content="確定要登出嗎？" :only-read="false" @handle-cancel="isOpenLogoutCheckDialog = false" @handle-confirm="handleLogout" />
    </DialogWrapper>
  </div>
</template>
