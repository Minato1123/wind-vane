import type { MaybeRef } from '@vueuse/core'

export function useGetPostsByResponse({
  token,
}: {
  token: MaybeRef<string>
}) {
  return useLazyFetch('/api/posts', {
    headers: [['access-token', unref(token)]],
    query: { type: 'responsedPost' },
    method: 'GET',
  })
}
