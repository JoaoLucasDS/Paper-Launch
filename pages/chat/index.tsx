import { useState, useEffect, useRef } from 'react';
import { Input, Button } from "@nextui-org/react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Peer, { DataConnection } from 'peerjs';
import Messages from '@/components/messages'; 

type Message = {
  from: string;
  message: string;
};

export default function ChatPage() {
  const [isConnected, setConnected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [peerId, setPeerId] = useState("");
  const [conn, setConn] = useState<DataConnection | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    if (!peerInstance.current) {
      const peer = new Peer();
      peerInstance.current = peer;

      peer.on('open', (id) => {
        setPeerId(id);
        console.log('My peer ID is: ' + id);
      });

      peer.on('connection', (incomingConn) => {
        console.log('Incoming connection from:', incomingConn.peer);
        setConn(incomingConn);
        incomingConn.on('data', (data) => {
          console.log('Received data:', data);
          const message = data as string;
          const obj = {
            from: incomingConn.peer,
            message: message
          };
          setMessages((prevMessages) => [...prevMessages, obj]);

          incomingConn.send(`Received your message: "${message}"`);
        });
        setConnected(true);
      });
    }

    return () => {
      if (peerInstance.current) {
        peerInstance.current.disconnect();
        console.log('Peer disconnected');
        peerInstance.current = null;
      }
    };
  }, []);

  const handleConnection = () => {
    if (!peerInstance.current || !inputValue) return;

    try {
      const newConn = peerInstance.current.connect(inputValue);
      newConn.on('open', () => {
        console.log('Connection established with:', inputValue);
        newConn.send('hi!');
        console.log('Sent: hi!');
        setConn(newConn);
        setConnected(true);
      });
      newConn.on('data', (data) => {
        console.log('Received data from peer:', data);
        const message = data as string;
        const obj = {
          from: inputValue,
          message: message
        };
        setMessages((prevMessages) => [...prevMessages, obj]);
      });
      newConn.on('error', (err) => {
        console.error('Connection error:', err);
      });
    } catch (e) {
      console.error('Connection failed:', e);
    }
    setInputValue('');
  };

  const sendText = () => {
    if (conn && inputValue) {
      const obj = {
        from: peerId,
        message: inputValue
      };
      conn.send(inputValue);
      setMessages((prevMessages) => [...prevMessages, obj]);
      setInputValue(''); 
    } else {
      console.error('No active connection or no input value to send');
    }
  };

  return (
    <DefaultLayout>
      <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>
            {`Chat ${isConnected ? 'Connected' : 'Disconnected'}`}
          </h1>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <span className="font-bold text-1xl tracking-tighter">
            {peerId}
          </span>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <Input
            className="input-primary"
            label="Message"
            labelPlacement="outside"
            placeholder="Enter your message"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <Button
            className="button-primary"
            onClick={isConnected ? sendText : handleConnection}
            size="lg"
          >
            {isConnected ? 'SEND' : 'CONNECT'}
          </Button>
        </div>
        <div className="flex w-full justify-center items-end gap-4">
          <Messages messages={messages} peerId={peerId} />
        </div>
      </section>
    </DefaultLayout>
  );
}
