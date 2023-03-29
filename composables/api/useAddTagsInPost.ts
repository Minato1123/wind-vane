import type { MaybeRef } from '@vueuse/core'

export function useAddTagsInPost({
  token,
  tagIdList,
  postId,
}: {
  token: MaybeRef<string>
  tagIdList: MaybeRef<number[]>
  postId: MaybeRef<string>
}) {
  return useLazyAsyncData(
    `add-tag-in-${unref(postId)}`,
    () => $fetch('/api/tagsInPosts', {
      headers: [['access-token', unref(token)]],
      body: {
        tagIdList: unref(tagIdList),
        postId: unref(postId),
      },
      method: 'POST',
    }), {
      server: false,
      immediate: false,
    })
}
