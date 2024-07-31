import { useState, useEffect } from 'react';

import {Input, Button} from "@nextui-org/react";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

import Peer from 'peerjs';

export default function ChatPage() {
  const [isConnected, setConnected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const peer = new Peer();

  const [messages, setMessages] = useState<string[]>([]);

  
  const sendText = () => {
    console.log('sendText')
  };
  const handleConnection = () => {
    var conn = peer.connect(inputValue);
    conn.on('open', function(){
      // here you have conn.id
      conn.send('hi!');
    });
    setInputValue('')
  };

  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    console.log('open')
    
    peer.on('open', (id) => {
      setPeerId(id);
      console.log('My peer ID is: ' + id);
    });

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        const message = data as string;
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);


  return (
    <DefaultLayout>
      <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>
            {`Chat ${isConnected} ${inputValue}`}
          </h1>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <h1 className={title()}>
            {`${peerId}`}
          </h1>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <Input className="input-primary" type="email" label="Email" labelPlacement="outside" placeholder="ata" value={inputValue} onValueChange={setInputValue}/>
          <Button className="button-primary" onClick={ isConnected ? sendText : handleConnection} size="lg">
            { isConnected ? 'START' : 'CONNECT' }
          </Button>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <h1 className={title()}>
            {`${messages}`}
          </h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
