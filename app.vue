<script setup lang="ts">
const isOpenMobileMenu = ref(false)
const isOpenLoginDialog = ref(false)
const isOpenRegisterDialog = ref(false)

function toggleDialog() {
  isOpenLoginDialog.value = !isOpenLoginDialog.value
  isOpenRegisterDialog.value = !isOpenRegisterDialog.value
}
</script>

<template>
  <div class="bg-app-1 h-screen flex flex-col font-Noto">
    <NavBar class="w-full" @toggle-mobile-menu="isOpenMobileMenu = !isOpenMobileMenu" />
    <Menu class="absolute top-16 right-4 z-10" @open-login-dialog="isOpenLoginDialog = true" />
    <Transition name="slide-in">
      <MobileMenu v-if="isOpenMobileMenu" :is-open-mobile-menu="isOpenMobileMenu" class="absolute block lg:hidden top-0 left-0 h-full" @close-mobile-menu="isOpenMobileMenu = false" @open-login-dialog="isOpenLoginDialog = true" />
    </Transition>
    <DialogWrapper>
      <LoginDialog v-if="isOpenLoginDialog" @close-login-dialog="isOpenLoginDialog = false" @switch-register-dialog="toggleDialog" />
    </DialogWrapper>
    <DialogWrapper>
      <RegisterDialog v-if="isOpenRegisterDialog" @close-register-dialog="isOpenRegisterDialog = false" @switch-to-login-dialog="toggleDialog" />
    </DialogWrapper>
    <div class="bg-app-1 grow min-h-0">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-in-enter-active {
  transition: all 0.3s ease-out;
}

.slide-in-leave-active {
  transition: all 0.5s ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
