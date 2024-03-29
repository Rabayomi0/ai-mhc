import "./MainChat.css";
import "./Landing.js";
import { useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import Landing from "./Landing.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainChat() {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    {
      // initial useState
      message: useEffect(() => {
        introMessage();
      }, []),
      sender: "A.I. MHC",
    },
  ]);

  async function introMessage() {
    await fetch("http://localhost:8000/api/introduce")
      .then((response) => response.json())
      .then((intro) => {
        setMessages([
          {
            message: intro.message[0].message.content,
            sender: "A.I. MHC",
          },
        ]);
      });
  }

  const [homePage, isHomePage] = useState(true);

  // UseState for "typing message"
  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    // when a message gets sent...create message object
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    // spreads out the messages array and inserts new message
    const newMessages = [...messages, newMessage];

    // update messages state
    setMessages(newMessages);

    // Will show typing message after a few seconds, to simulate actual conversation.

    setTimeout(() => {
      setTyping(true);
    }, "2000");

    // take sent message and apply it to async processing message
    await processMessage(newMessages);
  };

  // console.log(messages);

  // process message to ChatGPT

  async function processMessage(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "A.I. MHC") {
        // set role as ChatGPT
        role = "assistant";
      }
      // set role as user
      else {
        role = "user";
      }
      // set the role based on what who was determined to be the sender
      return { role: role, content: messageObject.message };
    });

    function loop() {
      var n = "";
      for (const info in apiMessages) {
        n = apiMessages[info].content;
      }
      return n;
    }

    const apiRequestBody = {
      prompt: loop(), // TODO: Find a way to iterate through [message1, message2, message3]
    };

    // get response from the server, which communicated with ChatGPT
    await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        Authorization: "Bearer" + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((answer) => {
        // response from chatGPT

        const answers = answer.message[0].message.content;

        setTimeout(() => {
          setMessages([
            ...chatMessages,
            {
              message: answers,
              sender: "A.I. MHC",
            },
          ]);
          setTyping(false);
        }, "3000");
      });
  }

  return (
    <div className="main-chat">
      {homePage ? (
        <Landing />
      ) : (
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
          <MainContainer style={{ width: "50vw" }}>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="ChatGPT is typing..." />
                  ) : (
                    ""
                  )
                }
              >
                {messages.map((message, i) => {
                  return (
                    <Message
                      key={i}
                      model={message}
                      style={{ maxWidth: "250px" }}
                    >
                      <Avatar src="Misfit.jpg"></Avatar>
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </div>
  );
}
export default MainChat;
