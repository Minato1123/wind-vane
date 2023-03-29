import type { MaybeRef } from '@vueuse/core'

export function useDeleteResponse({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `delete-response-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', unref(token)]],
      method: 'delete',
    }), {
      server: false,
      immediate: false,
    })
}
