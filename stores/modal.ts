export const useModalStore = defineStore(
  'modal',
  () => {
    const isOpenWarnLogoutDialog = ref(false)

    function openWarnLogoutDialog() {
      isOpenWarnLogoutDialog.value = true
    }

    function closeWarnLogoutDialog() {
      isOpenWarnLogoutDialog.value = false
    }

    return {
      isOpenWarnLogoutDialog,
      openWarnLogoutDialog,
      closeWarnLogoutDialog,
    }
  },
)
