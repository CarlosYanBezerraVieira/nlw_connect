import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes a someone to the event',
        tags: ['subscription'],
        description: 'Descrição',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (resquest, reply) => {
      const { name, email } = resquest.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
