
////////////////////////////////////////////////
// QUESTIONBOT
////////////////////////////////////////////////

// Purpose: Takes questions that are sent via direct message to it and reposts
// them in another channel. Currently used to anonymize questions asked for other
// members or leadership in a company/team to answer without knowledge of who
// asked said questions.

    // API token for accessing slack
let token = Meteor.settings.private.slack.questionbotSlackAPIToken,
    // The RTM (real-time messaging) URL for connecting to Slack via the token
    authUrl = SlackAPI.rtm.start(token).url,
    // Should it try to reconnect automatically?
    autoReconnect = true,
    // ??
    autoMark = true,
    // Connects to Slack via an external package
    slack = new Slack(token, autoReconnect, autoMark),
    // Need to store the channel to post to (by Id? by name?)
    // TO DO - Join this channel if not a member of this channel
    channelToPostTo = Meteor.settings.private.slack.questionbotChannel,
    compliments = [
      "An attractive member of our team asks:",
      "You know that super talented person on our team? They ask:",
      "A fantastic question has been submitted by a team member. They ask:",
      "A member of our team asks:"
    ];
    // A var for giving each message a unique ID
var messageId = 1;

// Function for when the connection to Slack opens
slack.on('open', Meteor.bindEnvironment(function() {
  // Logs to the console
  console.log("questionbot started");
}));

// Function for when a message is sent to a channel that this bot belongs to
slack.on('message',  Meteor.bindEnvironment(function(message) {

      // Gets the channel ID from the name of the channel the bot wants to post to
  let channelId = Modules.server.getChannelIdFromName(token, channelToPostTo),
      // Get the channel object by its ID from the channelToPostTo variable
      postChannel = slack.getChannelGroupOrDMByID(channelId),
      // Gets the channel the message originated from
      messageChannel = slack.getChannelGroupOrDMByID(message.channel);

  // Checks to see if the message the channel was sent from was a private channel
  if(Modules.server.isPrivateChannel(token, message.channel)) {
    // Finds a compliment to use for the message
    let messageCompliment = compliments[ _.random(0, (compliments.length - 1))];
    // Posts message to channel, including the compliment
    postChannel.send(messageCompliment + "\n" + "> " + "*" + message.text + "*");
    // Send an IM message to the user and let them know the message has successfully been posted
    messageChannel.send("Your question has been successfully posted to the <#" + channelId +  "|" + postChannel.name + "> channel.");
  }

  // Itterates on the messageId
  return messageId++;

}));

// When there's an error
slack.on('error', Meteor.bindEnvironment(function(error) {
  // Logs any errors to the console
  console.log("There has been an error: ", error);
}));

// Logins, or attemps to open the connection between this server and Slack
slack.login();
