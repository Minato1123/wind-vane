import { useUserStore } from '../stores/user'
import { useGetTokenValid } from '~~/composables/api/useGetTokenValid'

export default defineNuxtRouteMiddleware(async () => {
  const { userToken } = storeToRefs(useUserStore())
  const { userLogout } = useUserStore()
  const { data } = await useGetTokenValid({
    token: userToken,
  })

  await until(data).not.toBeNull()

  if (!data.value?.data.isTokenValid) {
    userLogout()
    return navigateTo({
      name: 'index',
    })
  }
})
