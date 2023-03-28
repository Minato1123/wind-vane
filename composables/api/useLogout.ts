export function useLogout({
  token,
}: {
  token: string
}) {
  return useLazyAsyncData(() => $fetch('/api/logout', {
    method: 'POST',
    headers: [['access-token', token]],
  }), {
    immediate: false,
    server: false,
  })
}
