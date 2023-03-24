import { db } from '../plugins/dataController'
import { createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    postId: string
    response: 'positive' | 'negative'
  }>(event)
  const userId = getUserId()

  db.data.responses.push({
    userId,
    postId: body.postId,
    response: body.response,
  })

  return createSuccessResponse(null)
})
