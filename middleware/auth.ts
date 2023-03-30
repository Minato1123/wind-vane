import { useUserStore } from '../stores/user'
import { useModalStore } from '../stores/modal'
import { useGetTokenValid } from '~~/composables/api/useGetTokenValid'

export default defineNuxtRouteMiddleware(async () => {
  const { userToken } = storeToRefs(useUserStore())
  const { userLogout } = useUserStore()
  const { openWarnLogoutDialog } = useModalStore()
  const { data } = await useGetTokenValid({
    token: userToken,
  })

  await until(data).not.toBeNull()

  if (!data.value?.data.isTokenValid) {
    userLogout()
    openWarnLogoutDialog()
    return navigateTo({
      name: 'index',
    })
  }
})
