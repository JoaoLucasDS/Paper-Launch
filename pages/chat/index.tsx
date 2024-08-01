import { useState, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Peer, { DataConnection } from 'peerjs';

export default function ChatPage() {
  const [isConnected, setConnected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [peerId, setPeerId] = useState("");
  const [conn, setConn] = useState<DataConnection | null>(null);
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer(); // Initialize PeerJS
    setPeerInstance(peer);

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
        setMessages((prevMessages) => [...prevMessages, `From ${incomingConn.peer}: ${message}`]);
        // Respond back to the sender
        incomingConn.send(`Received your message: "${message}"`);
      });
      setConnected(true);
    });

    return () => {
      if (peer) {
        peer.disconnect();
        console.log('Peer disconnected');
      }
    };
  }, []);

  const handleConnection = () => {
    if (!peerInstance || !inputValue) return;

    try {
      const newConn = peerInstance.connect(inputValue);
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
        setMessages((prevMessages) => [...prevMessages, `From ${inputValue}: ${message}`]);
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
      conn.send(inputValue);
      setMessages((prevMessages) => [...prevMessages, `To peer: ${inputValue}`]);
      setInputValue(''); // Clear the input field after sending
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
          <h1 className={title()}>
            {messages.join(', ')}
          </h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
