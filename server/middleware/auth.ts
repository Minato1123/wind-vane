import { tokenMap } from '../tokenMap'

export default defineEventHandler((event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = tokenMap.get(theToken)

  const url = event.node.req.url
  const method = event.node.req.method
  // eslint-disable-next-line no-console
  console.log(url, method, theToken, userId)
  event.context.auth = { userId }
})
