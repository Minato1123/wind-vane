import type { MaybeRef } from '@vueuse/core'
export function useGetUserResponseByPostId({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `user-response-by-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', unref(token)]],
      method: 'GET',
    }),
    {
      server: false,
      immediate: false,
    })
}
