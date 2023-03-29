import { createSuccessResponse } from '../utils/index'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null)
    return createSuccessResponse({ isTokenValid: false })

  return createSuccessResponse({ isTokenValid: true })
})
