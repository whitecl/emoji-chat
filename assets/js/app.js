// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import normalize from "normalize.css";
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
  window.scrollTo(0, document.body.scrollHeight);
});

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message");
messageForm.addEventListener("click", event => {
  event.preventDefault();
  if (messageInput.value.length > 0) {
    channel.push("emote", { body: messageInput.value });
    messageInput.value = "";
  }
});
