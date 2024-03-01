import type { VercelRequest, VercelResponse } from '@vercel/node'
import { privateEncrypt } from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { data = '', privateKey = '' } = req.body

  let resp;
  try {
    resp = privateEncrypt(privateKey, Buffer.from(data)).toString("hex")
  } catch (error) {
    return res.json({
      error,
    })
  }
  
  return res.json({
    signature: resp,
  })
}
