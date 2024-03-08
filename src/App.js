import "./App.css";
import "./components/Landing.js";
import { useState } from "react";
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
import Landing from "./components/Landing.js";

function App() {

  const [messages, setMessages] = useState([
    {
      // initial useState
      message: "Hi! I'm your A.I. mental health coach.",
      sender: "A.I. MHC",
    },
  ]);

  const [homePage, isHomePage] = useState(false);

  // Env variable to access OPENAI Api key
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

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

    console.log(messages);

    // update messages state
    setMessages(newMessages);

    // Will show typing message after a few seconds, to simulate actual conversation.
  
    setTimeout(() =>{
      setTyping(true);
    }, "2000")
      
  
    // take sent message and apply it to async processing message
    await processMessage(newMessages);
  };


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

    // "system" -> one initial message to define how ChatGPT talks

    const systemMessage = {
      role: "system",
      content:
        "You are a sarcastic, sometimes rude, but well meaning mental health coach.",
        // role: "user",
        // content: "What color is the sky?",
        // role: "assistant",
        // content: "The color of my cold, dead heart. Blue, obviously."
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages, // [message1, message2, message3]
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
        return data.json();
      }).then((data) =>{
        // response from chatGPT

        const answers = data.choices[0].message.content;
        
        setTimeout(() => {
          setMessages(
            [...chatMessages, {
              message: answers,
              sender: "A.I. MHC"
            } ]
          );
          setTyping(false);
        }, "3000")
      })
  }

  return (
    <div className="App">
      {homePage ? <Landing/> :
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
        <MainContainer style={{width: "50vw"}}>
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
                return <Message key={i} model={message} style={{maxWidth: "250px"}}>
                  <Avatar src="Misfit.jpg"></Avatar>
                </Message>;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
}
    </div>
  );
}
export default App;
