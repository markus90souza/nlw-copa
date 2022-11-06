import { FastifyInstance } from "fastify"
import { string, z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"
import { googleApiServices } from "../services/google-service-api"

const authRoutes = async (route: FastifyInstance) =>{
  route.post('/auth', async (request) => {
    
    const IRequest = z.object({
      access_token: z.string()
    })

    const { access_token } = IRequest.parse(request.body)
   const response =  await googleApiServices('/oauth2/v2/userinfo',   {
  
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
   


    const IUserData = z.object({
      id: z.string(),
      name: z.string(),
      email: string().email(),
      picture: z.string().url()
    })


    console.log(response.data)
    
  const userInfo = IUserData.parse(response.data)

  let user = await prisma.user.findUnique({
    where: {
      googleId: userInfo.id
    }
  })

  if(!user){
    user = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        googleId: userInfo.id,
        avatarUrl: userInfo.picture
      }
    })
  }

  const token = route.jwt.sign({
    name: user.name,
    avatarUrl: user.avatarUrl,
  }, {sub: user.id, expiresIn: '7 days'})
  return { token }

  })

  route.get('/me',{ onRequest: [authenticate]}, async (request) => {
    return { user: request.user}
  })
} 

export { authRoutes }