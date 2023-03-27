export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref('')
    const userId = ref<number | null>()

    const isLoggedin = computed<boolean>(() => userToken.value !== '')

    function userLogin(_token: string, _userId: number) {
      userToken.value = _token
      userId.value = _userId
    }

    function userLogout() {
      userToken.value = ''
      userId.value = null
    }

    return {
      userToken,
      userId,
      isLoggedin,
      userLogin,
      userLogout,
    }
  },
  {
    persist: true,
  },
)
