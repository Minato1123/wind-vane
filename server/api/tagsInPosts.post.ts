import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    tagIdList: number[]
    postId: string
  }>(event)

  body.tagIdList.forEach((tagId) => {
    const association = db.data.tags_posts_association.find(a => a.postId === body.postId && a.tagId === tagId)
    if (association != null)
      return

    db.data.tags_posts_association.push({
      tagId,
      postId: body.postId,
    })
  })

  return createSuccessResponse(null)
})
