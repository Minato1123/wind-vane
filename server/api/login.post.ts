import { db } from '../plugins/dataController'
import { tokenMap } from '../tokenMap'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string | null
    password: string
  }>(event)

  const user = db.data.users.find(u => u.email === body.email && u.password === body.password && u.deleted === false)
  if (user == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  for (const [token, userId] of tokenMap) {
    if (userId === user.id) {
      tokenMap.delete(token)
      break
    }
  }

  const theToken = `${Date.now()}`
  tokenMap.set(theToken, user.id)

  return createSuccessResponse({ token: theToken, userId: user.id })
})
