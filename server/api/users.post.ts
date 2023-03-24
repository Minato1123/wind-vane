import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
    password: string
  }>(event)

  if (db.data.users.findIndex(u => u.email === body.email) !== -1)
    return createErrorResponse({ message: 'Duplicated email' })

  const newUserId = db.data.users[db.data.users.length - 1].id + 1 ?? 1
  const createdTime = `${Date.now()}`

  db.data.users.push({
    id: newUserId,
    email: body.email,
    password: body.password,
    createdTime,
    deleted: false,
  })

  return createSuccessResponse(null)
})
