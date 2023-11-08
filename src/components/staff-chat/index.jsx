import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
// import chatClient from "../../stream-chat/StreamChat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  LoadingIndicator,
  ChannelHeader,
  Thread,
  ChannelList,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };
const StaffChat = () => {
  // useEffect(() => {
  //   // Kiểm tra xem người dùng đã có cuộc trò chuyện với admin chưa
  //   chatClient
  //     .queryChannels({ members: { $in: ["admin", staffID] } })
  //     .then((response) => {
  //       if (response.channels.length > 0) {
  //         // Sử dụng cuộc trò chuyện hiện có
  //         setChannel(response.channels[0]);
  //       } else {
  //         // Cuộc trò chuyện chưa tồn tại, tạo cuộc trò chuyện mới và mời người dùng và admin
  //         const newChannel = chatClient.channel("messaging", {
  //           members: ["admin", staffID],
  //         });
  //         newChannel.invite({ users: [staffID, "admin"] });
  //         setChannel(newChannel);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [staffID]);
  const [client, setClient] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const staff = {
    id: user.accountID.toString(),
    name: user.staff?.fullName,
  };
  useEffect(() => {
    const newClient = new StreamChat("xuqy7bsjnqu7");
    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: staff?.id,
        name: staff.name,
      },
      newClient.devToken(staff?.id)
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default StaffChat;
