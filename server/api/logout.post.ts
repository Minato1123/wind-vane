import { createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }
  const tokenMap = db.token_map
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const theToken = event.node.req.headers['access-token'] as string

  const tokenIndex = tokenMap.findIndex(t => t.token === theToken)
  tokenMap.splice(tokenIndex, 1)
  await setData(db)

  return createSuccessResponse(null)
})
