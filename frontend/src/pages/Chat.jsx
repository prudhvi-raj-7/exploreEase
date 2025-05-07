import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Connect to the backend
const socket = io("https://exploreease-vzoh.onrender.com");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); // For mobile toggle

  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;

  useEffect(() => {
    socket.emit("addUser", username);

    socket.on("chatHistory", (history) => {
      setChatMessages(history);
    });

    socket.on("receiveMessage", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("activeUsers", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("activeUsers");
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { content: message, username };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Mobile Users Toggle Button */}
        <button
          className="md:hidden bg-blue-500 text-white p-2"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>

        <div className="flex flex-1 bg-gray-100 flex-col md:flex-row">
          {/* Active Users Section - Hidden on mobile unless toggled */}
          <div
            className={`${
              showUsers ? "block" : "hidden"
            } md:block w-full md:w-1/4 bg-white border-r border-gray-300 p-4 overflow-y-auto`}
          >
            <h2 className="text-xl font-bold mb-4">Active Users</h2>
            <ul className="space-y-2">
              {activeUsers.map((user, index) => (
                <li
                  key={index}
                  className="p-2 rounded-lg bg-violet-200 font-bold"
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col w-full md:w-3/4 h-[650px] p-4 bg-gray-50">
            <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg bg-white">
              <div className="space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.username === username
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                        msg.username === username
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      <strong>{msg.username}:</strong> {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 md:py-6 border rounded-l-lg focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded-r-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Chat;
