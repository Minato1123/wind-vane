import type { MaybeRef } from '@vueuse/core'

export function useDeleteSavedPost({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `delete-saved-post-${postId}`,
    () => $fetch(`/api/savedPosts/${postId}`, {
      headers: [['access-token', unref(token)]],
      method: 'DELETE',
    }), {
      server: false,
      immediate: false,
    })
}
