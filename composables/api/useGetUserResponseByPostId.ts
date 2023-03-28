export function useGetUserResponseByPostId({
  token,
  postId,
}: {
  token: string
  postId: string
}) {
  return useLazyAsyncData(
    `user-response-by-${postId}`,
    () => $fetch(`/api/responses/${postId}`, {
      headers: [['access-token', token]],
      method: 'GET',
    }),
    {
      server: false,
      immediate: false,
    })
}
