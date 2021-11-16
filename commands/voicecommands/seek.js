module.exports = {
  name: 'seek',
  description: 'Search for a different position in the current song',
  execute(client, message, args) {
    const queue = client.distube.getQueue(message);

    if (!message.member.voice.channel) {
      return message.channel.send(
        'You must be in a voice channel to use this.',
      );
    }
    if (!args[0]) {
      return message.channel.send('Please provide a time position to seek to.');
    }
    if (isNaN(args[0])) {
      return message.channel.send('Please provide a number in seconds.');
    }
    if (!queue) {
      return message.channel.send('There are no items playing.');
    }
    try {

      if (queue.songs[0].duration >= args[0] && (queue.songs[0].duration - args[0]) >= 1) {
        client.distube.seek(message, Number(args[0]));
        message.channel.send('Seeked position #'`${args[0]}`);
      }
      else {
        message.channel.send('It seems an issue occured, most likely by seeking a position outside the current song.');
      }
    }
    catch (error) {
      message.channel.send('Error:\n'`${error}`);
    }
  },
};


// TEST FEATURE BEFORE GIT PUSH OK THNX FROM PAST JORIS