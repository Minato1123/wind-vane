export function createSuccessResponse<T>(data: T) {
  return {
    data,
    error: null,
    success: true,
  }
}

export function createErrorResponse(error: {
  message: string
}) {
  return {
    data: null,
    error,
    success: false,
  }
}

export function generatePostId() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
}

export async function getUserId(theToken: string) {
  const tokenData = await useStorage('db').getItem(`token:${theToken}`) as { userId: number } | null
  return tokenData?.userId
}
