import type { MaybeRef } from '@vueuse/core'

export function useSavePost({
  token,
  postId,
}: {
  token: MaybeRef<string>
  postId: string
}) {
  return useLazyAsyncData(
    `save-post-${postId}`,
    () => $fetch('/api/savedPosts', {
      headers: [['access-token', unref(token)]],
      body: {
        postId,
      },
      method: 'POST',
    }), {
      server: false,
      immediate: false,
    })
}
