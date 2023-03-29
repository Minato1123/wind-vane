import type { MaybeRef } from '@vueuse/core'
export function useCheckPostSaved({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `check-${postId}-saved`,
    () => $fetch(`/api/savedPosts/${postId}`, {
      headers: [['access-token', unref(token)]],
      method: 'GET',
    }), {
      server: false,
      immediate: false,
    })
}
