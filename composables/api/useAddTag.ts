import type { MaybeRef } from '@vueuse/core'

export function useAddTag({
  token,
  tags,
}: {
  token: MaybeRef<string>
  tags: MaybeRef<string[]>
}) {
  return useLazyAsyncData(
    `add-tag-${Date.now()}`,
    () => $fetch('/api/tags', {
      headers: [['access-token', unref(token)]],
      body: {
        tags: unref(tags),
      },
      method: 'post',
    }), {
      immediate: false,
      server: false,
    })
}
