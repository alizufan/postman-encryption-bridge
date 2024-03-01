import type { VercelRequest, VercelResponse } from '@vercel/node'
import { privateEncrypt } from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  let { data, privateKey } = req.query
  
  if (Array.isArray(data)) {
    data = data[0]
  }

  if (Array.isArray(privateKey)) {
    privateKey = privateKey[0]
  }
  console.log("DATA: ", data, privateKey)

  let hash = '';
  try {
    hash = privateEncrypt(privateKey.split(String.raw`\n`).join('\n'), Buffer.from(data)).toString("hex")
  } catch (error) {
    return res.json({
      error,
    })
  }
  console.log("HASH-DATA: ", hash)
  
  return res.json({
    signature: hash,
  })
}
