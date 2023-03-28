import type { MaybeRef } from '@vueuse/core'

export function useAddTag({
  token,
  tags,
}: {
  token: string
  tags: MaybeRef<string[]>
}) {
  return useLazyAsyncData(
    `add-tag-${Date.now()}`,
    () => $fetch('/api/tags', {
      headers: [['access-token', token]],
      body: {
        tags: unref(tags),
      },
      method: 'POST',
    }), {
      immediate: false,
      server: false,
    })
}
