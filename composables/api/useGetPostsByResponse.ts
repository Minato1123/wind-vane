import type { MaybeRef } from '@vueuse/core'

export function useGetPostsByResponse({
  token,
  partNumber,
  postPerPart,
}: {
  token: MaybeRef<string>
  partNumber: MaybeRef<number>
  postPerPart: MaybeRef<number>
}) {
  return useFetch('/api/posts', {
    headers: [['access-token', unref(token)]],
    query: (computed(() => ({
      type: 'responsedPost',
      partNumber: unref(partNumber),
      postPerPart: unref(postPerPart),
    }))),
    method: 'get',
  })
}
