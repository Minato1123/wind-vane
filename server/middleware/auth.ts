import { tokenMap } from '../tokenMap'

export default defineEventHandler((event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = tokenMap.get(theToken)
  event.context.auth = { userId }
})
