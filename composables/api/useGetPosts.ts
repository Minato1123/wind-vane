export function useGetPosts() {
  return useLazyFetch('/api/posts', {
    method: 'GET',
  })
}
