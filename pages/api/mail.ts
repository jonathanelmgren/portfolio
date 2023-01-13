import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

const { SENDGRID_API } = process.env

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body
        try {
            if (!SENDGRID_API) throw new Error('Sendgrid API missing')
            if (!name || !email || !message) throw new Error('Missing field')
            if (message < 2) throw new Error('Too short message')

            sgMail.setApiKey(SENDGRID_API)

            await sgMail.send({
                to: 'jonathan@elmgren.dev',
                from: 'jonathan@elmgren.dev',
                subject: 'Message from portfolio form',
                text: `Email: ${email}, Name: ${name}, Message: ${message}`
            })
            return res.status(200).json({ success: 'Success' })
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message })
            } else {
                return res.status(500).json({ error: 'Something went wrong' })
            }
        }
    } else {
        return res.status(403).json({ error: 'Method not allowed' })
    }
}

export default handler