import type { MaybeRef } from '@vueuse/core'

export function useUpdateUserEmail({
  token,
  email,
  newEmail,
}: {
  token: string
  email: MaybeRef<string>
  newEmail: MaybeRef<string>
}) {
  return useLazyAsyncData(`update-user-email-${Date.now()}`, () => $fetch('/api/users', {
    headers: [['access-token', token]],
    body: {
      email: unref(email),
      newEmail: unref(newEmail),
    },
    method: 'patch',
  }), {
    immediate: false,
    server: false,
  })
}
