import { createErrorResponse, createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  const body = await readBody<{
    email: string
    password: string
  }>(event)

  if (db.users.findIndex(u => u.email === body.email) !== -1)
    return createErrorResponse({ message: 'Duplicated email' })

  const lastUser = db.users[db.users.length - 1]
  const newUserId = lastUser == null ? 1 : lastUser.id + 1
  const createdTime = `${Date.now()}`

  db.users.push({
    id: newUserId,
    email: body.email,
    password: body.password,
    createdTime,
    deleted: false,
  })
  await setData(db)

  return createSuccessResponse(null)
})
