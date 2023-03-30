import { createErrorResponse, createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    postId: string
    response: 'positive' | 'negative'
  }>(event)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  db.responses.push({
    userId,
    postId: body.postId,
    response: body.response,
  })
  await setData(db)

  return createSuccessResponse(null)
})
