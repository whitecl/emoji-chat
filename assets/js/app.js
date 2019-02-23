// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import { Socket, Presence } from "phoenix";

let socket = new Socket("/socket", {
  params: { user_id: window.location.search.split("=")[1] }
});

let channel = socket.channel("room:lobby", {});
let presence = new Presence(channel);
const main = document.querySelector("main[role=main]");
const messageList = document.getElementById("message-list");

function renderOnlineUsers(presence) {
  console.log("joined presence");
  let response = "";

  presence.list((id, { metas: [first, ...rest] }) => {
    debugger;
    let count = rest.length + 1;
    response += `<br>${id} (count: ${count})</br>`;
  });

  main.innerHTML = response;
}

socket.connect();

// presence.onSync(() => renderOnlineUsers(presence))

channel.join();

channel.push("shout", { body: "Joined the chat!" });

channel.on("shout", payload => {
  let messageItem = document.createElement("li");
  const formattedNow = new Date().toLocaleTimeString("en-US");
  messageItem.innerText = `${payload.user} @ ${formattedNow}: ${payload.body}`;
  messageList.appendChild(messageItem);
});

const submitButton = document.getElementById("send-message");
const messageInput = document.getElementById("message");
submitButton.addEventListener("click", () => {
  if (messageInput.value.length > 0) {
    channel.push("emote", { body: messageInput.value });
  }
});
