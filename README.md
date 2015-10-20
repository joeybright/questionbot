# questionbot

A bot for Slack, used to ask anonymous questions.

## How questionbot Works

questionbot has one purpose: To take _any_ private messages it receives and post it to another channel as itself. This anonymizes the user who asked the question, hopefully allowing team members to ask better questions without fear of any judgement.

### Use cases

The primary use case around questionbot is for asking anonymous questions to company leadership through a tool many companies use: Slack. However, the functionality of questionbot can be used for other purposes, such as anonymous employee feedback or company criticism.

### A note on the anonymous element of questionbot

questionbot is not 100% anonymous. This is because owners of a Slack organization that uses Slack pro can [download the entire message history for their organization, including private messages](https://evidation.slack.com/pricing/plus).

For all intents and purposes, questionbot remains anonymous to everyone who does not have access to that functionality, including non-administrative members of your team. However, if you choose to use questionbot in your organization, be aware that if someone with administrative access to Slack could gain knowledge of who asked what questions.

## Configuring questionbot

To get questionbot configured and running, you need two pieces of information: An API token from a Slack bot user and the name of the channel you'd like questionbot to post the private messages it receives.

To get an API token for a Slack bot, you need to first create a Slack bot user. Slack has a simple guide to doing just that: https://api.slack.com/bot-users

Once you have the API token, paste it into the questionbotSlackAPIToken value in the settings-example.json file.

Then, choose a channel for questionbot to post any questions it receives to. Add the channel name to the questionbotChannel value in the settings-example.json file.  _Do not_ include the # in the channel name.

> Note: If you specify a channel that doesn't exist for questionbot to post to, it _will not_ work.

Once those settings are setup, change the name of the settings-example.json file to settings.json. Then, run questionbot. If everything is entered correctly, you'll see the bot appear online in Slack!

## Run questionbot

Before running questionbot, make sure to have configured it correctly or it will not run. See the "Configuring questionbot" section above.

questionbot was built using Meteor.js, mostly because it's what I know how to use and requires little configuration to get up and running quickly. To get questionbot running, make sure that Meteor is installed.

To install Meteor:

      curl https://install.meteor.com | /bin/sh

Once Meteor is installed and questionbot properly configured navigate to the /questionbot directory and run

      npm start

The command will run the Meteor, using the settings.json file to get your configuration options. The questionbot user in Slack should now be online and act appropriately.

## Deploying questionbot

Below are a few suggestion on hosts and tools to help deploying questionbot:

Modulus makes it dead simple to deploy questionbot: http://help.modulus.io/customer/en_us/portal/articles/1647770-getting-started-with-meteor-on-modulus?b_id=9670

Alternatively, you can use MUP which requires more configuration but also more control over where you can host: https://github.com/arunoda/meteor-up
