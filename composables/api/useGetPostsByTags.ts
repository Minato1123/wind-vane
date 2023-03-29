import type { MaybeRef } from '@vueuse/core'

export function useGetPostsByTags({
  tags,
}: {
  tags: MaybeRef<string>
}) {
  return useLazyFetch(
    '/api/posts/',
    {
      query: (computed(() => ({
        type: 'tagsPost',
        tags: unref(tags),
      }))),
      method: 'get',
    },
  )
}
