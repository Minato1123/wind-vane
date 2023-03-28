export function useGetPostsBySave({
  token,
}: {
  token: string
}) {
  return useLazyFetch('/api/posts', {
    headers: [['access-token', token]],
    query: { type: 'savedPost' },
    method: 'GET',
  })
}
