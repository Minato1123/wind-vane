import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler((event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = getUserId(theToken)

  if (userId == null)
    return createErrorResponse({ message: 'Not found' })

  const user = db.data.users.find(u => u.id === +userId && u.deleted === false)

  if (user == null)
    return createErrorResponse({ message: 'Not found' })

  return createSuccessResponse(user)
})
