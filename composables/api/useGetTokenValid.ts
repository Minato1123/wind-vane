import type { MaybeRef } from '@vueuse/core'

export function useGetTokenValid({
  token,
}: {
  token: MaybeRef<string>
}) {
  return useFetch('/api/tokenValid', {
    headers: [['access-token', unref(token)]],
    method: 'get',
  })
}
