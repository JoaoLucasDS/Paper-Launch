import { useState, useEffect, useRef } from 'react';
import { Input, Button, Modal, Snippet } from "@nextui-org/react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Peer, { DataConnection } from 'peerjs';
import Messages from '@/components/messages'; 
import QRCode from 'qrcode';

import { useRecoilValue } from 'recoil';
import { userAtom } from '@/state/atoms/userAtom'

import { useRouter } from 'next/router';

import QrCodeSharpIcon from '@mui/icons-material/QrCodeSharp';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';

import * as forge from 'node-forge';

type Message = {
  from: string;
  received: boolean
  message: string;
};

export default function ChatPage() {
  const [isConnected, setConnected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [peerId, setPeerId] = useState("");
  const [conn, setConn] = useState<DataConnection | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const user = useRecoilValue(userAtom);

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // const [receiver, setReceiver] = useRecoilState(receiverAtom);

  const generateQRCode  = async (value:string) => {
    try {
      const url = qrCodeUrl ? null : await QRCode.toDataURL(value);
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const copyToClipboard  = async (text:string) => {
    navigator.clipboard.writeText(text)
  };


  useEffect(() => {
    const publicKey = user?.publicKey ? forge.pki.publicKeyFromPem(user?.publicKey as string) : null;
    const privateKey = user?.privateKey ? forge.pki.privateKeyFromPem(user?.privateKey as string) : null;

    // Usando a chave pública para criptografar a mensagem
    // const mensagemCriptografada = publicKey ? publicKey.encrypt('mensagem', 'RSA-OAEP') : '';

    // const mensagemDescriptografada = privateKey ? privateKey.decrypt(mensagemCriptografada, 'RSA-OAEP') : '';

    // console.log(mensagemCriptografada)
    // console.log(mensagemDescriptografada)
    if (user?.name === undefined || user?.id === undefined) {
      router.push('/user'); 
    }
    if (!peerInstance.current) {
      console.log('start')
      const userId = `${user?.name}${user?.id}`
      const peer = new Peer(userId);
      peerInstance.current = peer;

      peer.on('open', (id) => {
        setPeerId(id);
        console.log('My peer ID is: ' + id);
      });

      peer.on('connection', (incomingConn) => {
        console.log('Incoming connection from:', incomingConn.peer);
        setConn(incomingConn);
        //respond
        incomingConn.on('data', (data) => {
          console.log('Received data:', data);
          const message = data as Message;

          setMessages((prevMessages) => [...prevMessages, message]);

          //incomingConn.send(obj);
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
    console.log('handleConnection');
    if (!peerInstance.current || !inputValue) {
      console.log('No peer instance or input value');
      return;
    }
  
    try {
      console.log('Attempting to connect to:', inputValue);
      const newConn = peerInstance.current.connect(inputValue);
  
      newConn.on('open', () => {
        console.log('Connection established with:', inputValue);
        setConn(newConn);
        setConnected(true); // Conexão estabelecida com sucesso
      });
  
      newConn.on('data', (data: unknown) => {
        const message = data as Message;
        console.log('Received data from peer:', message);
  
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      newConn.on('error', (err) => {
        console.error('Connection error:', err);
        setConnected(false); // Falha na conexão
      });
  
      newConn.on('close', () => {
        console.log('Connection closed');
        setConnected(false); // Conexão fechada
      });
  
    } catch (e) {
      console.error('Connection failed:', e);
      setConnected(false); // Falha na conexão
    }
  
    setInputValue(''); // Limpa o campo de entrada após tentar a conexão
  };
  

  const sendText = () => {
    if (conn && inputValue) {
      const obj = {
        from: peerId,
        received: true,
        message: inputValue
      };
      conn.send(obj);
      obj.received = false
      console.log('Store:', obj);
      setMessages((prevMessages) => [...prevMessages, obj]);
      setInputValue(''); 
    } else {
      console.error('No active connection or no input value to send');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isConnected) {
      sendText();
    } else {
      handleConnection();
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
        <div className="flex w-full justify-center items-center gap-1 font-bold text-1xl">
          {peerId ? (
            <>
              {`${user?.name}${user?.id}`}
              <Button className="pa-none " onClick={() => copyToClipboard(`${user?.name}${user?.id}`)} isIconOnly color="primary" variant='light' size='sm' aria-label="Like" disableRipple >
                <ContentCopySharpIcon sx={{ fontSize: 25 }}/>
              </Button>
              <Button className="pa-none " onClick={() => generateQRCode(`${user?.name}${user?.id}`)} isIconOnly color="primary" variant='light' size='sm' aria-label="Like" disableRipple >
                <QrCodeSharpIcon sx={{ fontSize: 32 }}/>
              </Button>
            </>
          ) : (<></>)}
          
        </div>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
        <form onSubmit={handleSubmit} className="flex w-full justify-center items-end gap-4">
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
        </form>
        <div className="flex w-full justify-center items-end gap-4">
          <Messages messages={messages} />
        </div>
      </section>
    </DefaultLayout>
  );
}
