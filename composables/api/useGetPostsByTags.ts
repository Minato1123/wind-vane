import type { MaybeRef } from '@vueuse/core'

export function useGetPostsByTags({
  tags,
}: {
  tags: MaybeRef<string>
}) {
  return useLazyFetch(
    () => '/api/posts/',
    {
      query: {
        type: 'tagsPost',
        tags: computed(() => unref(tags)),
      },
      method: 'GET',
    },
  )
}
