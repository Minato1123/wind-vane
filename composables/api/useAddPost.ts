import type { MaybeRef } from '@vueuse/core'

export function useAddPost({
  token,
  content,
  question,
}: {
  token: MaybeRef<string>
  content: MaybeRef<string>
  question: MaybeRef<string>
}) {
  return useLazyAsyncData(() => $fetch('/api/posts', {
    body: {
      content: unref(content),
      question: unref(question),
    },
    method: 'post',
    headers: [['access-token', unref(token)]],
  }))
}
