import type { VercelRequest, VercelResponse } from '@vercel/node'
import { privateEncrypt } from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { data, privateKey } = req.body
  
  return res.json({
    signature: privateEncrypt(privateKey, Buffer.from(data)).toString("hex"),
  })
}
