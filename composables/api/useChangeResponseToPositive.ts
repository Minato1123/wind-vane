import type { MaybeRef } from '@vueuse/core'

export function useChangeResponseToPositive({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `change-response-to-positive-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', unref(token)]],
      body: {
        response: 'positive',
      },
      method: 'PATCH',
    }), {
      server: false,
      immediate: false,
    })
}
