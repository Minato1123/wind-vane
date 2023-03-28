export function useGetPostPositiveCount({
  postId,
  response,
}: {
  postId: string
  response: Ref<'positive' | 'negative' | null>
}) {
  return useLazyFetch(`/api/numOfResponses/${postId}`, {
    query: {
      response: 'positive',
    },
    method: 'GET',
    watch: [response],
  })
}
