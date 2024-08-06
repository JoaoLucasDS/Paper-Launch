import DefaultLayout from "@/layouts/default";
import { Button, Input } from "@nextui-org/react";
import { nanoid, customAlphabet  } from 'nanoid'
import { useState, useEffect, useRef } from 'react';
import { title } from "@/components/primitives";

import { useRecoilState } from 'recoil';
import { userAtom, User } from '@/state/atoms/userAtom'

export default function IndexPage() {
    const [id, setID] = useState<string>();
    const [inputValue, setInputValue] = useState("");

    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        console.log('on')
        const generateNanoId  = (lenght: number | undefined) => {
            const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?', lenght)
            return nanoid();
        }
        setID(generateNanoId(5))

        return () => {
            console.log('off')

        };
    }, []);

    const handleContinue = () => {
      console.log(inputValue)
      setUser((prevUser) => ({
        ...prevUser || { name: '', id: '', email: '' },
        name: inputValue,
      }));
      console.log(user)
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
                {` ${id}`}
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
            CONTINUE
          </Button>
        </form>
        <div className="inline-block max-w-lg text-center justify-center">
            <span className="text-3xl font-bold">
                {`TESTE BRABO`}
            </span>
            <span className="text-3xl font-bold text-default">
                {` ${user?.name}`}
            </span>
        </div>
      </section>
        </DefaultLayout>
    );
}