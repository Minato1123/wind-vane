import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
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
