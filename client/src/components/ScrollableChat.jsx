import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { useState, useEffect, useRef } from "react";
import ScrollableFeed from "react-infinite-scroll-component";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css";

const ScrollableChat = ({ messages, fetchMoreMessages }) => {
  const { user } = ChatState();
  const [loading, setLoading] = useState(false);
  const scrollableRef = useRef(null); // Reference for the scrollable container

  // Function to fetch more messages when scrolling
  const fetchData = async () => {
    setLoading(true); // Start loading state
    await fetchMoreMessages(); // Fetch more messages
    setLoading(false); // End loading state
  };

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    // Only scroll if the user is at the bottom or close to it
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messages]); // Runs every time the messages array changes

  return (
    <div className="scrollable-chat-container" ref={scrollableRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollableFeed
        inverse // For chat-like behavior where new messages appear at the bottom
        next={fetchData} // Function to fetch more messages
        hasMore={!loading && messages.length > 0} // Check if more messages are available
        loader={<h4>Loading...</h4>} // Loader displayed while fetching more messages
        scrollThreshold={0.9} // Load new messages when user scrolls 90% of the way
        dataLength={messages.length} // Provide dataLength prop to indicate the number of messages
      >
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
