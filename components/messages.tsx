import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Avatar, Button} from "@nextui-org/react";

type Message = {
  from: string;
  message: string;
};

type MessagesProps = {
  messages: Message[];
  peerId: string;
};

const Messages: React.FC<MessagesProps> = ({ messages, peerId }) => {
  const renderedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const isOwnMessage = msg.from === peerId;
    renderedMessages.push(
        <Card key={i} className="max-w-[400px]" shadow='none'>
            <CardHeader className="justify-between" >
                <div className={`flex gap-5 ${isOwnMessage ? 'flex-row-reverse bg-red-300' : ''}`}>
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <h5 className="text-small tracking-tight text-default-400">{msg.from}</h5>
                    </div>
                </div>
            </CardHeader>
            <span className="message-text">{msg.message}</span>
            <span className="message-text">{msg.from}</span>
            <span className="message-text">{peerId}</span>
        </Card>
    );
  }

  return (
    <div className="messages-container">
        {renderedMessages}
    </div>
  )
};

export default Messages;
