import { StreamChat } from "stream-chat";

const apiKey = "tpvq3dcffqzz";
const apiUrl = "https://chat-us-east-1.stream-io-api.com";

const chatClient = StreamChat.getInstance(apiKey, {
  timeout: 6000,
  baseServerURL: apiUrl,
});

export default chatClient;
