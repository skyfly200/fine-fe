import type { NextApiRequest, NextApiResponse } from 'next'
import mailchimp, { AddListMembeBody } from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER
})

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  if (!process.env.MAILCHIMP_AUDIENCE_ID)
    return res.status(500).json({ error: 'Something went wrong. Try again later.' })

  try {
    const resp = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed'
    })
    return res.status(201).json({ error: '' })
  } catch (error) {
    let msg = 'Something went wrong. Try again later.'
    // @ts-ignore
    if (error.response.error.text) {
      // @ts-ignore
      msg = JSON.parse(error.response.error.text).title
    }
    return res.status(400).json({ error: msg })
  }
}

export default subscribe
