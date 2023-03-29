import type { MaybeRef } from '@vueuse/core'

export function useLogout({
  token,
}: {
  token: MaybeRef<string>
}) {
  return useLazyAsyncData(
    'logout',
    () => $fetch('/api/logout', {
      method: 'post',
      headers: [['access-token', unref(token)]],
    }), {
      immediate: false,
      server: false,
    })
}
