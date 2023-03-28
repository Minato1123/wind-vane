import type { MaybeRef } from '@vueuse/core'

export function useAddPost({
  token,
  content,
  question,
}: {
  token: string
  content: MaybeRef<string>
  question: MaybeRef<string>
}) {
  return useLazyAsyncData(() => $fetch('/api/posts', {
    body: {
      content: unref(content),
      question: unref(question),
    },
    method: 'POST',
    headers: [['access-token', token]],
  }))
}
