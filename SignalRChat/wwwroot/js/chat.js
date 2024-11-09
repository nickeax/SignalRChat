"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    let li = document.createElement("li");
    document.querySelector("#messagesList").appendChild(li);
    // We can assign user-supplied content to an element's textContent because it's not interpreted as HTML
    // If you're assigning in any other way, you should be aware of the risks of possible script injection
    li.textContent = `${user}: ${message}`;
});

connection.start().then(function () {
    document.querySelector("#sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.querySelector("#sendButton").addEventListener("click", function (event) {
    let user = document.querySelector("#userInput").value;
    let message = document.querySelector("#messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});