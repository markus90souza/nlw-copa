import { FastifyInstance } from "fastify"

import { prisma } from "../lib/prisma"


const userRoutes = async (route: FastifyInstance) => {
  route.get('/users/count',async () => {
    const count = await prisma.user.count()
    return { count }
  })
}

export { userRoutes }