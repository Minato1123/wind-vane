import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }
  const body = await readBody<{
    email: string
    newEmail: string
  }>(event)

  const user = db.data.users.find(u => u.id === +userId && u.deleted === false)

  if (user == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  if (user.email !== body.email) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  user.email = body.email

  return createSuccessResponse(null)
})
