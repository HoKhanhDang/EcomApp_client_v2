import React, { Component } from "react";
import {
    Widget,
    addResponseMessage,
    addUserMessage,
    dropMessages,
} from "react-chat-widget";
import { CometChat } from "@cometchat-pro/chat";
import config from "../../config";
import "react-chat-widget/lib/styles.css";

const agentUID = config.agentUID;
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const serverURL = config.serverURL;
const limit = 30;

class Client extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to our store!");
        addResponseMessage("Are you looking for anything in particular?");

        let uid = localStorage.getItem("cc-uid");

        // check for uid, if exist then get auth token
        if (uid !== null) {
            this.fetchAuthToken(uid).then(
                (result) => {
                    // SDK login
                    CometChat.login(result).then((user) => {
                        // listen to incoming message and fetch previous messages
                        this.createMessageListener();
                        this.fetchPreviousMessages();
                    });
                },
                (error) => {
                    console.log("Initialization failed with error:", error);
                }
            );
        }
    }

    // The functions used above

    fetchAuthToken = async (uid) => {
        const response = await fetch(`${serverURL}/api/auth?uid=${uid}`);
        const result = await response.json();
        return result;
    };

    createMessageListener = () => {
        CometChat.addMessageListener(
            CUSTOMER_MESSAGE_LISTENER_KEY,
            new CometChat.MessageListener({
                onTextMessageReceived: (message) => {
                    console.log("Incoming Message Log", { message });
                    addResponseMessage(message.text);
                },
            })
        );
    };

    fetchPreviousMessages = () => {
        var messagesRequest = new CometChat.MessagesRequestBuilder()
            .setUID(agentUID)
            .setLimit(limit)
            .build();
        messagesRequest.fetchPrevious().then(
            (messages) => {
                // add messages to the widget chat bubbles
                messages.forEach((message) => {
                    if (message.rawMessage.sender === agentUID) {
                        addResponseMessage(message.text);
                    } else {
                        addUserMessage(message.text);
                    }
                });
            },
            (error) => {
                console.log("Message fetching failed with error:", error);
            }
        );
    };

    render() {
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                title="WELCOME !!!"
                subtitle="How can I help you?"
            />
        );
    }

    createUser = async () => {
        const response = await fetch(`${serverURL}/api/create`);
        const result = await response.json();
        return result;
    };

    handleNewUserMessage = (newMessage) => {
        const textMessage = new CometChat.TextMessage(
            agentUID,
            newMessage,
            CometChat.RECEIVER_TYPE.USER
        );

        let uid = localStorage.getItem("cc-uid");

        if (uid === null) {
            // no uid, create user
            this.createUser().then(
                (result) => {
                    localStorage.setItem("cc-uid", result.uid);

                    // do login
                    CometChat.login(result.authToken).then((user) => {
                        CometChat.sendMessage(textMessage).then(
                            (message) => {
                                console.log(
                                    "Message sent successfully:",
                                    message
                                );
                            },
                            (error) => {
                                console.log(
                                    "Message sending failed with error:",
                                    error
                                );
                            }
                        );
                        // create listener
                        this.createMessageListener();
                    });
                },
                (error) => {
                    console.log("Initialization failed with error:", error);
                }
            );
        } else {
            // we have uid, do send
            CometChat.sendMessage(textMessage).then(
                (message) => {
                    console.log("Message sent successfully:", message);
                },
                (error) => {
                    console.log("Message sending failed with error:", error);
                }
            );
        }
    };

    componentWillUnmount() {
        CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
        CometChat.logout();
        dropMessages();
    }
}

export default Client;
