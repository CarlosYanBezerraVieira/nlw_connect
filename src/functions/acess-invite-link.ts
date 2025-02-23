import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface acessInviteLinkParams {
  subscriberId: string
}

export async function acessInviteLink({ subscriberId }: acessInviteLinkParams) {
  await redis.hincrby('referral:acess-count', subscriberId, 1)
}
