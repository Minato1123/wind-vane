<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useUpdateUserEmail } from '~~/composables/api/useUpdateUserEmail'

useHead({
  title: '個人資料｜風向，疑？',
})

const { userToken } = storeToRefs(useUserStore())
const { userLogout } = useUserStore()
const email = ref('')
const newEmail = ref('')

const { pending, data, execute } = useUpdateUserEmail({
  token: userToken.value,
  email,
  newEmail,
})

const { execute: deleteUser } = useLazyAsyncData(() => $fetch('/api/users', {
  headers: [['access-token', userToken.value]],
  method: 'DELETE',
}), {
  immediate: false,
  server: false,
})

const isOpenEmailCheckDialog = ref(false)
const isOpenDeleteUserDialog = ref(false)
const isOpenInfoUpdateEmailSuccessDialog = ref(false)
const isOpenInfoUpdateEmailFailDialog = ref(false)

function handleSubmit() {
  if (email.value === newEmail.value)
    isOpenEmailCheckDialog.value = true

  else
    execute()
}

watch(pending, () => {
  if (pending.value === false) {
    if (data.value?.success === true)
      isOpenInfoUpdateEmailSuccessDialog.value = true

    else if (data.value?.success === false)
      isOpenInfoUpdateEmailFailDialog.value = true
  }
})

async function handleDeleteUser() {
  deleteUser()
  isOpenDeleteUserDialog.value = false
  userLogout()
  await navigateTo({
    name: 'index',
  })
}
</script>

<template>
  <div>
    <FormKit
      form-class="$reset"
      type="form"
      :actions="false"
      incomplete-message=" "
      @submit="handleSubmit"
      @submit-invalid="() => { return }"
    >
      <div class="bg-app-3 w-full sm:w-[30rem] min-h-[26rem] flex flex-col items-center justify-between py-8 sm:rounded-xl m-auto mt-8">
        <div class="text-app-8 text-xl">
          個人資料修改
        </div>

        <div class="w-3/5">
          <FormKit
            v-model="email"
            type="email"
            name="email"
            validation="required:trim|email"
            validation-visibility="live"
            :validation-messages="{
              required: '請輸入電子信箱',
              email: '請輸入正確的電子信箱',
            }"
            message-class="mt-1 text-app-7 text-sm text-right"
          >
            <template #wrapper>
              <div class="text-app-8 mb-2">
                *原電子信箱
              </div>
              <input v-model="email" type="text" class="w-full h-8 bg-app-4 text-app-3 rounded-lg outline-none pl-2">
            </template>
          </FormKit>
        </div>
        <div class="w-3/5">
          <FormKit
            v-model="newEmail"
            type="email"
            name="email"
            validation="required:trim|email"
            validation-visibility="live"
            :validation-messages="{
              required: '請輸入新的電子信箱',
              email: '請輸入正確的電子信箱',
            }"
            message-class="mt-1 text-app-7 text-sm text-right"
          >
            <template #wrapper>
              <div class="text-app-8 mb-2">
                *新電子信箱
              </div>
              <input v-model="newEmail" type="text" class="w-full h-8 bg-app-4 text-app-3 rounded-lg outline-none pl-2">
            </template>
          </FormKit>
        </div>
        <button type="submit" class="bg-app-5 text-app-8 rounded-lg py-1 px-4 outline-none hover:bg-app-5/70 hover:text-app-8/70 transition-all duration-200">
          儲存修改
        </button>
        <button type="button" class="mt-4 text-app-4/60 underline" @click="isOpenDeleteUserDialog = true">
          刪除帳號
        </button>
      </div>
    </FormKit>
    <DialogWrapper>
      <InfoDialog v-if="isOpenEmailCheckDialog" info-content="新舊信箱不能一樣喔！" :only-read="true" @handle-confirm="isOpenEmailCheckDialog = false" />
    </DialogWrapper>
    <DialogWrapper>
      <InfoDialog v-if="isOpenInfoUpdateEmailSuccessDialog" info-content="更改信箱成功！" :only-read="true" @handle-confirm="isOpenInfoUpdateEmailSuccessDialog = false" />
    </DialogWrapper>
    <DialogWrapper>
      <InfoDialog v-if="isOpenInfoUpdateEmailFailDialog" info-content="更改信箱失敗！" :only-read="true" @handle-confirm="isOpenInfoUpdateEmailFailDialog = false" />
    </DialogWrapper>
    <DialogWrapper>
      <InfoDialog v-if="isOpenDeleteUserDialog" info-content="確定要刪除帳號嗎？" @handle-confirm="handleDeleteUser" @handle-cancel="isOpenDeleteUserDialog = false" />
    </DialogWrapper>
  </div>
</template>
