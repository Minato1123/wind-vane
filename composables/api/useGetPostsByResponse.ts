export function useGetPostsByResponse({
  token,
}: {
  token: string
}) {
  return useLazyFetch('/api/posts', {
    headers: [['access-token', token]],
    query: { type: 'responsedPost' },
    method: 'GET',
  })
}
