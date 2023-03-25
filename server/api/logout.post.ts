import { tokenMap } from '../tokenMap'
import { createSuccessResponse } from '../utils/index'

export default defineEventHandler((event) => {
  const theToken = event.node.req.headers['access-token'] as string

  tokenMap.delete(theToken)

  return createSuccessResponse(null)
})
