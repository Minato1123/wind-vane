import { tokenMap } from '../tokenMap'
import { createSuccessResponse } from '../utils/index'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const theToken = event.node.req.headers['access-token'] as string

  tokenMap.delete(theToken)

  return createSuccessResponse(null)
})
