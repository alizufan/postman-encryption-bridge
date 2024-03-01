import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createPrivateKey, privateEncrypt } from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  function unescape(str) {
    return (str + '==='.slice((str.length + 3) % 4))
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  }
  
  function escape(str) {
    return str.replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }
  
  const encode = (str: string) => {
    return escape(Buffer.from(str, 'utf8').toString('base64'))
  }
  
  const decode = (str: string) => {
    return Buffer.from(unescape(str), 'base64').toString('utf8')
  }
  
  let { data, privateKey } = req.query
  
  if (Array.isArray(data)) {
    data = data[0]
  }

  if (Array.isArray(privateKey)) {
    privateKey = privateKey[0]
  }

  console.log("DATA: ", privateKey, data, privateKey)
  privateKey = decode(privateKey)
  console.log("PRIVATE KEY: ", privateKey)
  console.log("LENGTH: ", privateKey.length)

  let hash = '';
  try {
    hash = privateEncrypt(createPrivateKey(privateKey), Buffer.from(data)).toString("hex")
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }

  console.log("HASH-DATA: ", hash)
  
  return res.json({
    signature: hash,
  })
}
