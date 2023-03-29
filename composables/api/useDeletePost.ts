import type { MaybeRef } from '@vueuse/core'

export function useDeletePost({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `delete-post-${postId}`,
    () => $fetch(`/api/posts/${postId}`, {
      headers: [['access-token', unref(token)]],
      method: 'delete',
    }), {
      server: false,
      immediate: false,
    })
}
