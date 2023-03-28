import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((event.context.auth.userId) == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const { postId } = event.context.params!
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  const responsedIndex = db.data.responses.findIndex(p => p.postId === postId && p.userId === userId)

  if (responsedIndex === -1) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  db.data.responses.splice(responsedIndex, 1)

  return createSuccessResponse(null)
})
