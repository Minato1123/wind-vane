import { tokenMap } from '../tokenMap'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const theToken = event.node.req.headers['access-token'] as string
  const userId = tokenMap.get(theToken)
  event.context.auth = { userId }
})
