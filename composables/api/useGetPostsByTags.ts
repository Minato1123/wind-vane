import type { MaybeRef } from '@vueuse/core'

export function useGetPostsByTags({
  tags,
  partNumber,
  postPerPart,
}: {
  tags: MaybeRef<string>
  partNumber: MaybeRef<number>
  postPerPart: MaybeRef<number>
}) {
  return useFetch(
    '/api/posts/',
    {
      query: (computed(() => ({
        type: 'tagsPost',
        tags: unref(tags),
        partNumber: unref(partNumber),
        postPerPart: unref(postPerPart),
      }))),
      method: 'get',
    },
  )
}
