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
    tagId: number
    postId: string
  }>(event)

  const association = db.data.tags_posts_association.find(a => a.postId === body.postId && a.tagId === body.tagId)
  if (association != null) {
    return createErrorResponse({
      message: 'Duplicated',
    })
  }

  db.data.tags_posts_association.push({
    tagId: body.tagId,
    postId: body.postId,
  })

  return createSuccessResponse(null)
})
