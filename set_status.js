#!/usr/bin/env /Users/maximebertheau/.nvm/versions/node/v14.4.0/bin/node

require('dotenv').config({ path: '/Users/maximebertheau/Bitbar/slack-focus-mode/.env' })
const slack = require('./slack')
const presets = require('./presets.json')
const argv = require('minimist')(process.argv.slice(2));

const DEBUG = argv.debug

const main = async(preset) => {
  const seconds = preset.snooze_minutes * 60
  let response = await slack.updateStatus(preset.emoji, preset.status, seconds)

  if (DEBUG)
    console.log((await response.json()))

  response = await slack.updateSnooze(preset.snooze_minutes)

  if (DEBUG)
    console.log((await response.json()))
}

if (argv._.length === 0) throw "Missing argument"

const presetKey = argv._[0]

const preset = presets[presetKey]

if (!preset) throw `Unknown preset: ${preset}`

main(preset)