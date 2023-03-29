import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const { tagId } = event.context.params!

  const tagIndex = db.data.tags.findIndex(t => t.id === +tagId)

  if (tagIndex === -1) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  db.data.tags.splice(tagIndex, 1)

  return createSuccessResponse(null)
})
