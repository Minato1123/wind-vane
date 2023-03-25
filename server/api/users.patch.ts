import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = await getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }
  const body = await readBody<{
    email: string
  }>(event)

  const user = db.data.users.find(u => u.id === +userId && u.deleted === false)

  if (user == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  user.email = body.email

  return createSuccessResponse(null)
})
