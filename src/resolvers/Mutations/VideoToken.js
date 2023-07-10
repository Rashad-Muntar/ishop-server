const AccessToken = require("twilio").jwt.AccessToken;

const VideoMutation = {
  Mutation: {
    async getVideoToken(_, { username }) {
      const VideoGrant = AccessToken.VideoGrant;

      const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioApiKey = process.env.VIDEO_API_KEY_SID;
      const twilioApiSecret = process.env.VIDEO_API_KEY_SECRET;
      const identity = username;
      const token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
        { identity: identity }
      );

      const videoGrant = new VideoGrant();

      token.addGrant(videoGrant);
      return token.toJwt();
    },
  },
};

module.exports =  VideoMutation
