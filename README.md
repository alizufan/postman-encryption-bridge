# Node.js Serverless Postman Encryption Signature

Simple Node.js + Vercel Serverless API, to handle `Postman Encryption Signature`. What actual problem? the problem is postman / external library doesnt have capability to use encryption RSA_PKCS1_PADDING in `crypto.privateEncrypt()`.

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=github.com/xboykun/postman-encryption-bridge&project-name=postman-encryption-signature&repository-name=postman-encryption-signature)

### Clone and Deploy

```bash
git clone https://github.com/xboykun/postman-encryption-bridge
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```
