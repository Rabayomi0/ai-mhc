import "./App.css";
import "./components/Landing.js";
import ChatRoom from "./ChatRoom.js";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hi! I'm your A.I. mental health coach.",
      sender: "A.I. MHC",
    },
  ]);

  const [typing, setTyping] = useState(false);
  const handleSend = async (message) => {
    // when a message gets sent...create message object
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    // spreads out the messages array and places new message on top
    const newMessages = [...messages, newMessage];

    // update messages state
    setMessages(newMessages);

    setTyping(true);
  };

  console.log(messages);
  // update messages state

  // process message to ChatGPT

  return (
    <div className="App">
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundColor: "orange",
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Response is cooking..." />
                ) : (
                  ""
                )
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
export default App;
