import { createErrorResponse, createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  const body = await readBody<{
    email: string
    newEmail: string
  }>(event)

  const user = db.users.find(u => u.id === +userId && u.deleted === false)

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

  user.email = body.newEmail
  await setData(db)

  return createSuccessResponse(null)
})
