import type { MaybeRef } from '@vueuse/core'

export function useLogin({
  userData,
}: {
  userData: MaybeRef<{
    email: string
    password: string
  }>
}) {
  return useLazyAsyncData(() => $fetch('/api/login', {
    body: unref(userData),
    method: 'post',
  }), {
    immediate: false,
    server: false,
  })
}
