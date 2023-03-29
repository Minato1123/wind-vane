import type { MaybeRef } from '@vueuse/core'

export function useRespondPositive({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `respond-positive-${postId}`,
    () => $fetch('/api/responses', {
      headers: [['access-token', unref(token)]],
      body: {
        postId,
        response: 'positive',
      },
      method: 'post',
    }), {
      server: false,
      immediate: false,
    })
}
