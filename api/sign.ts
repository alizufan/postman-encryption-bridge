import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const crypto = require('crypto');
  const unescape = (str: string) => {
    return (str + '==='.slice((str.length + 3) % 4))
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  }
  
  const escape = (str: string) => {
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
  
  let { d, p } = req.query
  
  if (Array.isArray(d)) {
    d = d[0]
  }
  d = decode(d)

  if (Array.isArray(p)) {
    p = p[0]
  }
  p = decode(p)

  let sign = '';
  try {
    sign = crypto.privateEncrypt(p, Buffer.from(d)).toString("hex")
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
  
  return res.json({
    sign: sign,
  })
}
