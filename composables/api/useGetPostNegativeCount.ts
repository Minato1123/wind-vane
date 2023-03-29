export function useGetPostNegativeCount({
  postId,
  response,
}: {
  postId: string
  response: Ref<'positive' | 'negative' | null>
}) {
  return useLazyFetch(`/api/numOfResponses/${postId}`, {
    query: {
      response: 'negative',
    },
    method: 'get',
    watch: [response],
  })
}
