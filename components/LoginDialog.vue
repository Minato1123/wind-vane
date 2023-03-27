<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useUserStore } from '../stores/user'

const emit = defineEmits<{
  (e: 'closeLoginDialog'): void
  (e: 'switchRegisterDialog'): void
}>()

const { userLogin } = useUserStore()

const userData = ref({
  email: '',
  password: '',
})
const isLoginFail = ref(false)

const { pending, data, execute: handleLogin } = useLazyAsyncData(() => $fetch('/api/login', {
  body: userData.value,
  method: 'POST',
}), {
  immediate: false,
  server: false,
})

watch(pending, () => {
  if (pending.value === true)
    return

  if (data.value == null)
    return

  if (data.value.success === false) {
    isLoginFail.value = true
    return
  }

  if (data.value.data == null)
    return

  userLogin(data.value.data.token, data.value.data.userId)
  emit('closeLoginDialog')
})
</script>

<template>
  <div class="w-full h-full bg-black/50 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
    <OnClickOutside @trigger="$emit('closeLoginDialog')">
      <FormKit
        form-class="$reset"
        type="form"
        :actions="false"
        incomplete-message=" "
        @submit="handleLogin"
        @submit-invalid="() => { return }"
      >
        <div class="w-11/12 sm:w-[30rem] pt-5 pb-8 px-6 h-1/2 rounded-xl bg-app-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
          <div class="w-full flex justify-end items-center text-app-4">
            <Icon class="hover:text-app-8 transition-all duration-200 cursor-pointer" name="akar-icons:cross" size="1.5rem" @click="$emit('closeLoginDialog')" />
          </div>
          <div class="text-app-8 text-2xl">
            登入
          </div>
          <div
            v-if="isLoginFail"
            class="text-app-7"
          >
            帳號密碼有誤喔！
          </div>
          <div class="w-5/6">
            <FormKit
              v-model="userData.email"
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
                  電子信箱
                </div>
                <input v-model="userData.email" type="text" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
              </template>
            </FormKit>
          </div>
          <div class="w-5/6">
            <FormKit
              v-model="userData.password"
              type="password"
              name="password"
              validation="required:trim"
              validation-visibility="live"
              :validation-messages="{
                required: '請輸入密碼',
              }"
              message-class="mt-1 text-app-7 text-sm text-right"
            >
              <template #wrapper>
                <div class="text-app-8 mb-2">
                  密碼
                </div>
                <input v-model="userData.password" type="password" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
              </template>
            </FormKit>
          </div>
          <button type="button" class="underline text-app-4" @click="$emit('switchRegisterDialog')">
            註冊
          </button>
          <button type="submit" class="bg-app-5 text-app-8 rounded-lg outline-none px-4 py-1 hover:bg-app-5/70 hover:text-app-8/70 transition-all duration-200">
            跟風
          </button>
        </div>
      </FormKit>
    </OnClickOutside>
  </div>
</template>
