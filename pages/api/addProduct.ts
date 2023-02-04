// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'});
 }
 try {
     const product = JSON.parse(req.body);
     const saveProduct = await prisma.stock.create({data: product});
     res.status(200).json(saveProduct);
 }   catch(err) {
     res.status(400).json({message: 'Something Went Wrong Ohan'});
 }
};
