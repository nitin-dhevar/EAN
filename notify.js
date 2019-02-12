const { Expo } = require('expo-server-sdk');

function sendNotifiaction(somePushTokens, notice){

  let expo = new Expo();


  let messages = [];
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: pushToken,
      title: notice.title,
      sound: 'default',
      body: notice.body,
      // data: { withSome: 'data' },
    })
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

}
// var notice ={
//   title : "hello",
//   body : "test is add"
// }
// var somePushTokens = ['ExponentPushToken[EsHe2EGgQAJPHE7CnmfKyk]']
// sendNotifiaction(somePushTokens, notice);
module.exports = {
  sendNotifiaction
};
