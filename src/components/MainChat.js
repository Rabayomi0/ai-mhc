import "./MainChat.css";
import "./Landing.js";
import { useEffect, useState } from "react";
import "../css/main.scss";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import Button from "react-bootstrap/Button";
import "pixel-borders/docs/styles/pixel-borders.css";

function makeName() {
  const json = localStorage.getItem("form");
  const obj = JSON.parse(json);

  var t = "";
  for (const key in obj) {
    t = `${obj[key]}`;
  }
  return t;
}

function MainChat() {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    {
      // initial useState
      message: useEffect(() => {
        async function introMessage() {
          const apiRequestName = {
            introduction:
              "Introduce yourself to me as if we were meeting for the first time. My name is " +
              makeName() +
              ".",
          };

          await fetch("http://localhost:8000/api", {
            method: "PUT",
            headers: {
              Authorization: "Bearer" + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestName),
          })
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
        introMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
      sender: "A.I. MHC",
    },
  ]);

  // UseState for "typing message"
  const [typing, setTyping] = useState(false);

  const resetChat = async () => {
    setMessages([]);

    async function emptyMessages() {
      await fetch("http://localhost:8000/api", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer" + API_KEY,
          "Content-Type": "application/json",
        },
      }).then((response) => console.log(response.json));
    }
    emptyMessages();
    window.location.href = "/";
  };

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
    }, "3000");

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
      //loops through all apiMessages and eventually returns latest message
      for (const info in apiMessages) {
        n = apiMessages[info].content;
      }
      return n;
    }

    const apiRequestBody = {
      prompt: loop(),
    };

    // send message to be processed by backend server
    await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        Authorization: "Bearer" + API_KEY,
        "Content-Type": "application/json",
      },

      // message to be sent

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
        }, "4000");
      });
  }

  console.log(messages);
  return (
    <div className="main-chat">
      <Button className="btn-back" variant="primary" onClick={resetChat}>
        Reset
      </Button>
      <img src="Lux.png" className="ava" alt="Lux the therapist" />
      <div
        className="main"
        style={{
          display: "flex",
          float: "right",
          alignItems: "center",
          position: "relative",
          height: "100vh",
          width: "60%",
        }}
      >
        <MainContainer style={{ width: "60vw", height: "100vh" }}>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? <TypingIndicator content="Lux is typing..." /> : ""
              }
            >
              {messages.map((message, i) => {
                return (
                  <Message
                    key={i}
                    model={message}
                    style={{ maxWidth: "60%", padding: "30px" }}
                  >
                    {message.sender === "A.I. MHC" ? (
                      <Avatar src="Luxpfp.png"></Avatar>
                    ) : (
                      ""
                    )}
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              autoFocus
              attachButton={false}
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
export default MainChat;
