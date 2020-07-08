#!/usr/bin/env /Users/maximebertheau/.nvm/versions/node/v14.4.0/bin/node

require('dotenv').config({ path: '/Users/maximebertheau/Bitbar/slack-focus-mode/.env' })
const emojiData = require('emoji-data')
const slack = require('./slack')
const presets = require('./presets.json')

const findEmoji = (alias) => {
  if (!alias) return null
  const cleaned = alias.replace(/:/g, '')
  const matches = emojiData.find_by_short_name(cleaned)
  if (matches.length == 0) return null

  const emoji = matches[0].unified
  const hexes = emoji.split('-').map(it => `0x${it}`);

  return String.fromCodePoint(...hexes);
}

const main = async() => {
  const response = await slack.status()
  const json = await response.json()
  const profile = json.profile

  const emoji = findEmoji(profile.status_emoji) || '👌'

  console.log(emoji)
  console.log('---')

  console.log(`Slack Status: ${profile.status_text || 'None'}`)

  Object.keys(presets)
    .forEach(key => {
      const preset = presets[key]

      console.log(`${findEmoji(preset.emoji) || '👌'} ${preset.status || key} | bash=/Users/maximebertheau/Bitbar/slack-focus-mode/set_status.js param1=${key} refresh=true terminal=false`)
    })
}

main()