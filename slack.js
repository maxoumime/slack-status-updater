const token = process.env.SLACK_USER_TOKEN
if (!token) throw "No Slack user token! SLACK_USER_TOKEN"

const cookies = process.env.SLACK_COOKIES
if (!cookies) throw "No cookies! SLACK_COOKIES"

const fetch = require('node-fetch')

const updateStatus = async(emoji, status, duration) => {

  const expiration = duration && (new Date().getTime() / 1000 + duration)

  const payload = {
    status_text: status,
    status_emoji: emoji,
    status_expiration: expiration
  }

  const payloadString = JSON.stringify(payload)

  const encoded = encodeURIComponent(payloadString)

  const url = `https://slack.com/api/users.profile.set?token=${token}&profile=${encoded}}`

  return await fetch(url, defaultBody())
}

const updateSnooze = async(minutes) => {
  const url = `https://slack.com/api/dnd.setSnooze?token=${token}&num_minutes=${minutes || null}`

  return await fetch(url, defaultBody())
}

const status = async() => {
  const url = `https://slack.com/api/users.profile.get?token=${token}`

  return await fetch(url, defaultBody())
}

const defaultBody = () => {
  return {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,fr;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": cookies
    },
    "referrerPolicy": "no-referrer",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };
}

module.exports = {
  updateStatus: updateStatus,
  updateSnooze: updateSnooze,
  status: status
}