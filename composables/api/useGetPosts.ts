import type { MaybeRef } from '@vueuse/core'

export function useGetPosts({
  partNumber,
  postPerPart,
}: {
  partNumber: MaybeRef<number>
  postPerPart: MaybeRef<number>
}) {
  return useFetch('/api/posts', {
    method: 'get',
    query: (computed(() => ({
      partNumber: unref(partNumber),
      postPerPart: unref(postPerPart),
    }))),
  })
}
