import type { MaybeRef } from '@vueuse/core'

export function useChangeResponseToNegative({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `change-response-to-negative-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', unref(token)]],
      body: {
        response: 'negative',
      },
      method: 'PATCH',
    }), {
      server: false,
      immediate: false,
    })
}
