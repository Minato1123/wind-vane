<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useRegister } from '~~/composables/api/useRegister'
const emit = defineEmits<{
  (e: 'closeRegisterDialog'): void
  (e: 'switchToLoginDialog'): void
}>()

const email = ref('')
const password = ref('')

const { pending, data, execute: handleRegister } = useRegister({
  email,
  password,
})
const isRegisterSuccess = ref(false)
const isRegisterFail = ref(false)

watch(pending, () => {
  if (pending.value === true)
    return

  if (data.value == null)
    return

  if (data.value.success === false) {
    isRegisterFail.value = true
    return
  }

  isRegisterSuccess.value = true
})

function handleRegisterConfirm() {
  isRegisterSuccess.value = false
  emit('switchToLoginDialog')
}

function handleClickOutside() {
  if (isRegisterSuccess.value === true)
    return

  emit('closeRegisterDialog')
}
</script>

<template>
  <div class="w-full h-full bg-black/50 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
    <OnClickOutside @trigger="handleClickOutside">
      <FormKit
        form-class="$reset"
        type="form"
        :actions="false"
        incomplete-message=" "
        @submit="handleRegister"
        @submit-invalid="() => { return }"
      >
        <div class="w-11/12 sm:w-[30rem] pt-5 pb-8 px-6 h-1/2 rounded-xl bg-app-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
          <div class="w-full flex justify-end items-center text-app-4">
            <Icon class="hover:text-app-8 transition-all duration-200 cursor-pointer" name="akar-icons:cross" size="1.5rem" @click="$emit('closeRegisterDialog')" />
          </div>
          <div class="text-app-8 text-2xl">
            註冊
          </div>
          <div
            v-if="isRegisterFail"
            class="text-app-7"
          >
            此信箱已被使用過喔！
          </div>
          <div class="w-5/6">
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
                  電子信箱
                </div>
                <input v-model="email" type="text" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
              </template>
            </FormKit>
          </div>
          <div class="w-5/6">
            <FormKit
              v-model="password"
              type="password"
              name="password"
              validation="required:trim|length:8"
              validation-visibility="live"
              :validation-messages="{
                required: '請輸入密碼',
                length: '密碼需至少 8 碼以上',
              }"
              message-class="mt-1 text-app-7 text-sm text-right"
            >
              <template #wrapper>
                <div class="text-app-8 mb-2">
                  密碼
                </div>
                <input v-model="password" type="password" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
              </template>
            </FormKit>
          </div>
          <button type="button" class="underline text-app-4" @click="$emit('switchToLoginDialog')">
            登入
          </button>
          <button type="submit" class="bg-app-5 text-app-8 rounded-lg outline-none px-4 py-1 hover:bg-app-5/70 hover:text-app-8/70 transition-all duration-200">
            註冊
          </button>
        </div>
      </FormKit>
      <DialogWrapper>
        <InfoDialog v-if="isRegisterSuccess" info-content="註冊成功！趕快登入後開始跟風吧～" :only-read="true" @handle-confirm="handleRegisterConfirm" />
      </DialogWrapper>
    </OnClickOutside>
  </div>
</template>
