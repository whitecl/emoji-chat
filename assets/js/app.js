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

import { Socket } from "phoenix";

let socket = new Socket("/socket", {
  params: { user_id: window.location.search.split("=")[1] }
});
let channel = socket.channel("room:lobby", {});

const main = document.querySelector("main[role=main]");
const messageList = document.getElementById("message-list");

socket.connect();

channel.join();
channel.push("join");

channel.on("shout", payload => {
  let messageItem = document.createElement("li");
  messageItem.innerHTML = `${payload.user}<b>:</b> ${payload.body}`;
  messageList.appendChild(messageItem);
});

const submitButton = document.getElementById("send-message");
const messageInput = document.getElementById("message");
submitButton.addEventListener("click", () => {
  if (messageInput.value.length > 0) {
    channel.push("emote", { body: messageInput.value });
  }
});
