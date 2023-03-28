export function useRespondPositive({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(`respond-positive-${postId}`, () => $fetch('/api/responses', {
    headers: [['access-token', token]],
    body: {
      postId,
      response: 'positive',
    },
    method: 'POST',
  }), {
    server: false,
    immediate: false,
  })
}
