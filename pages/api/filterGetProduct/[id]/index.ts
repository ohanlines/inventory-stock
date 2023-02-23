import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // const router = useRouter()

    console.log("COBA COBA")

    // console.log("ROUTER: ", router.pathname)
    // const pathname = usePathname()
    // console.log("PATH: ", pathname)
    console.log("============================")
    console.log("REQ: ", req.url)
    console.log("REQ: ", req.query)
    console.log("REQ: ", Object.keys(req))
    console.log("============================")
  try {
    const data = await prisma.stock.findMany({
        where: {
            'id' : req.query.id
        }
    })
    return res.status(200).json(data)
  } catch(error) {
    return res.status(500).json(error)
  }
}
