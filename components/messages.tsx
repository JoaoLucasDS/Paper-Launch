import React from 'react';
import { Card, CardHeader, Avatar } from "@nextui-org/react";

type Message = {
  from: string;
  message: string;
  received: boolean;
};

type MessagesProps = {
  messages: Message[];
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const renderedMessages = messages.map((msg, index) => (
    <Card key={index} className="w-[700px]" shadow="none">
      <CardHeader className={`p-4 ${msg.received ? 'flex-row' : 'flex-row-reverse'} flex gap-5`}>
        <Avatar
          isBordered
          radius="full"
          size="md"
          src={msg.received ? "https://nextui.org/avatars/avatar-2.png" : "https://nextui.org/avatars/avatar-1.png"}
        />
        <div className={`flex flex-col gap-1 ${msg.received ? 'items-start ' : 'items-end text-right'} w-full max-w-[calc(100% - 56px)]`}>
          <span className={`text-xl font-semibold leading-none ${msg.received ? 'text-default' : 'text-primary'}`}>Nome</span>
          <span className="text-xs font-semibold leading-none text-primary-900">{msg.from}</span>
          <span className="text-lg tracking-tight leading-none text-primary break-words">{msg.message}</span>
        </div>
      </CardHeader>
    </Card>
  ));

  return (
    <div className="messages-container">
      {renderedMessages}
    </div>
  );
};

export default Messages;
