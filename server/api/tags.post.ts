import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((event.context.auth.userId) == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    name: string
  }>(event)

  const tag = db.data.tags.find(t => t.name === body.name)
  if (tag != null) {
    return createErrorResponse({
      message: 'Duplicated',
    })
  }

  const newTagId = db.data.tags[db.data.tags.length - 1]?.id ?? 0

  db.data.tags.push({
    id: newTagId + 1,
    name: body.name,
  })

  return createSuccessResponse(null)
})
