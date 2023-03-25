export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref('')

    const isLoggedin = computed<boolean>(() => userToken.value !== '')

    function userLogin(token: string) {
      userToken.value = token
    }

    function userLogout() {
      userToken.value = ''
    }

    return {
      userToken,
      isLoggedin,
      userLogin,
      userLogout,
    }
  },
  {
    persist: true,
  },
)
