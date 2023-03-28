export function useGetPostsByTags({
  tags,
}: {
  tags: string[]
}) {
  return useLazyFetch(() => '/api/posts/', {
    query: {
      type: 'tagsPost',
      tags,
    },
    method: 'GET',
  })
}
