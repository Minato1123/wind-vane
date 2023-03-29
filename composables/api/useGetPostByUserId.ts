import type { MaybeRef } from '@vueuse/core'

export function useGetPostByUserId({
  token,
}: {
  token: MaybeRef<string>
}) {
  return useLazyFetch('/api/posts', {
    headers: [['access-token', unref(token)]],
    query: {
      type: 'myPost',
    },
    method: 'get',
  })
}
