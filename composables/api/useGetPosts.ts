export function useGetPosts() {
  return useFetch('/api/posts', {
    method: 'get',
  })
}
