import { getData } from '../utils/'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const theToken = event.node.req.headers['access-token'] as string
  const userId = db.token_map.find(t => t.token === theToken)?.userId
  event.context.auth = { userId }
})
