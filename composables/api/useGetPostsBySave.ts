import type { MaybeRef } from '@vueuse/core'

export function useGetPostsBySave({
  token,
}: {
  token: MaybeRef<string>
}) {
  return useLazyFetch('/api/posts', {
    headers: [['access-token', unref(token)]],
    query: { type: 'savedPost' },
    method: 'GET',
  })
}
