import type { MaybeRef } from '@vueuse/core'

export function useRegister({
  email,
  password,
}: {
  email: MaybeRef<string>
  password: MaybeRef<string>
}) {
  return useLazyAsyncData(
    `register-${Date.now()}`,
    () => $fetch('/api/users', {
      body: {
        email: unref(email),
        password: unref(password),
      },
      method: 'post',
    }), {
      server: false,
      immediate: false,
    })
}
