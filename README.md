# Slack status updater

This is a small [Bitbar](https://github.com/matryer/bitbar) plugin that displays your current Slack status on the MacOS toolbar and allows you to select a custom status from presets.

The script not only changes your status, but also enables Do not Disturb for the duration of your status.

![](https://nothingreally.botler.me/slackupdater.png)

This plugin can *definitely be improved* so feel free to open PRs! But note that it will soon move to the [Bitbar plugin repository](https://github.com/matryer/bitbar-plugins).

# Setup

_This plugin is using Node but Bitbar [doesn't really like it](https://github.com/matryer/bitbar#writing-plugins)._
> Caveats: Shebang has to be in the format #!/usr/bin/env /path/to/the/node/executable

First, you'll need to grab your Slack token and cookies. Since we don't want to create a bot for this, you'll have to:
- Open Slack on your browser
- Open the dev console, on the network tab
- Update your status (eg: select "In a meeting" and hit "Save")
- Select the POST request that was executed 
- Grab the cookies + the `token` property from the body

You'll have to update a couple of files to make it work:
- [print_status.1m.js](https://github.com/maxoumime/slack-status-updater/blob/main/print_status.1m.js)
  + Lines 1 and 2
- [set_status.js](https://github.com/maxoumime/slack-status-updater/blob/main/set_status.js)
  + Lines 1 and 2
- Create a `.env` file to the project root
  + `SLACK_USER_TOKEN=your-token`
  + `SLACK_COOKIES=your-cookies`
  
**Finally**, add `print_status.1m.js` to your `Bitbar/Enabled` folder (or whatever you have set up). I recommend using a symlink for this.

# Customize the presets

You can update the presets by editing `presets.json`.

```ts
// The key is used as a bash parameter, so make sure it doesn't contain spaces
"Key": {
    // Required: New Slack status to display
    "status": string,
    // Required: Status duration. The main benefit from this script is to set the same end time for the DnD and the status
    "duration_minutes": number,
    // Optional: If set to true, the DnD won't be enabled
    "status_only": boolean | undefined,
     // Required: emoji to display (using aliases, eg: :coffee: for ☕️)
    "emoji": string
}
```