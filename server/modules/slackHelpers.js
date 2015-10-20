
// Gets the question channel if it exists
let getChannelIdFromName = (token, channelName) => {
      // Gets all channels of the user of the passed token
  let allChannels = SlackAPI.channels.list(token).channels,
      // Finds the channel object based on the channel name
      channel     =  _.where(allChannels, {name: channelName});
  // In the future: creates a channel if there is no matching channel?
  // Returns the ID of the channel
  return channel[0].id;
};

// Determines if a passed channel is an IM channel and returns a boolean
let isPrivateChannel = (token, channel) => {
      // Gets a list of the channels a user/bot belongs to based on the token passed
  let IMChannelsBelongedTo =  _.pluck(SlackAPI.im.list(token).ims, 'id'),
      // Filters those channels, gets back an array full of channels that match
      filterChannels = _.filter(IMChannelsBelongedTo, function(channelId){
          return channel == channelId;
      });
  // If the filterChannels variable has more than one (matching) object...
  if (filterChannels.length != 0) {
    return true;
  }
  return false;
};

// Creates a Slack channel, returns the ID of created channel
// let createChannel = (channelName) => {
//   return SlackAPI.channel.create(channelName);
// };

// Registers the modules
Modules.server.getChannelIdFromName = getChannelIdFromName;
Modules.server.isPrivateChannel = isPrivateChannel;
