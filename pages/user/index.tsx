import DefaultLayout from "@/layouts/default";
import { Button, Input } from "@nextui-org/react"
import { nanoid, customAlphabet  } from 'nanoid'
import { useState, useEffect, useRef } from 'react'
import { title } from "@/components/primitives";

import PhotoUpload from "@/components/photo-upload";

import { useRecoilState } from 'recoil';
import { userAtom, User } from '@/state/atoms/userAtom'

import { useRouter } from 'next/router';
import forge from 'node-forge'

export default function IndexPage() {
  const [id, setID] = useState<string>();
  const [inputValue, setInputValue] = useState("");

  const [user, setUser] = useRecoilState(userAtom);

  const router = useRouter();
  useEffect(() => {
    console.log('on')
    const generateNanoId  = (lenght: number | undefined) => {
      const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', lenght)
      return nanoid();
    }
    setID(`${generateNanoId(5)}`)

    return () => {
      console.log('off')
    };
  }, []);

  const  handleName = async () => {
    if (inputValue.length > 0) {
      const keyPair = await forge.pki.rsa.generateKeyPair(2048);

      const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

      try {
        setUser((prevUser) => {
          const defaultUser = {
            name: '',
            id: '',
            email: '',
            publicKey: '',
            privateKey: ''
          };
    
          return {
            ...defaultUser,
            ...prevUser,
            name: inputValue,
            id: id as string,
            publicKey: publicKeyPem,
            privateKey: privateKeyPem 
          };
        });
        
      } catch (e) {
        console.error('Connection failed:', e);
      }
    }
  };

  const handleContinue = () => {
    if (user?.name !== inputValue) {
      console.log('mudou nome')
      handleName()
    }
    else {router.push('/chat');} 
  };
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div className="inline-block max-w-lg text-center justify-center">
          Your name will be:
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-lg text-center justify-center">
            <span className="text-3xl font-bold">
                {`${inputValue}`}
            </span>
            <span className="text-3xl font-bold text-default">
                {`${id}`}
            </span>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full justify-center items-end gap-4">
          <Input
            className="input-primary"
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
            value={inputValue}
            onValueChange={(value) => setInputValue(value.toUpperCase().replace(' ', '_'))}
          />
          <Button
            className="button-primary"
            size="lg"
            onClick={handleContinue}
          >
            {user?.name !== inputValue ? 'SET' : 'CONTINUE'}
            
          </Button>
        </form>
        <div>
          <PhotoUpload/>
        </div>
      </section>
    </DefaultLayout>
  );
}