import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Avatar, Button} from "@nextui-org/react";

type Message = {
  from: string;
  message: string;
  received: boolean
};

type MessagesProps = {
  messages: Message[];
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const renderedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    renderedMessages.push(
        <Card key={i} className="max-w-[400px] bg-secondary" shadow='none'>
            <CardHeader className="justify-between" >
                <div className={`flex gap-5 ${!msg.received ? 'flex-row-reverse' : ''}`}>
                    <Avatar isBordered radius="full" size="md" src={!msg.received ? "https://nextui.org/avatars/avatar-1.png" : "https://nextui.org/avatars/avatar-2.png"} />
                    <div className={`flex flex-col gap-1 justify-center ${!msg.received ? 'items-end' : 'items-start'}`}>
                        <span className={`text-xl  font-semibold leading-none ${!msg.received ? 'text-default' : 'text-primary'}`}>Nome</span>
                        <span className={`text-xs font-semibold leading-none text-primary-900`}>{msg.from}</span>
                        <span className="text-lg tracking-tight leading-none text-primary">{msg.message}</span>
                    </div>
                </div>
            </CardHeader>
            {/* <span className="message-text">{msg.message}</span>
            <span className="message-text">{msg.from}</span>
            <span className="message-text">{msg.received}</span> */}
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
