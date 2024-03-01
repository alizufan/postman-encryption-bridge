import type { VercelRequest, VercelResponse } from '@vercel/node'
import { privateEncrypt } from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { body } = req

  let hash = '';
  try {
    hash = privateEncrypt(body.privateKey, Buffer.from(body.data)).toString("hex")
  } catch (error) {
    return res.json({
      error,
    })
  }
  
  return res.json({
    signature: hash,
  })
}
