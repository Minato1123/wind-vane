import type { MaybeRef } from '@vueuse/core'

export function useRespondNegative({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(`respond-negative-${postId}`, () => $fetch('/api/responses', {
    headers: [['access-token', unref(token)]],
    body: {
      postId,
      response: 'negative',
    },
    method: 'post',
  }), {
    server: false,
    immediate: false,
  })
}
