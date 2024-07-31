import DefaultLayout from "@/layouts/default";

import {Button} from "@nextui-org/button";
import Logo from '@/components/logo';

import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/chat'); // Change '/another-page' to your target route
  };



  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div className="inline-block max-w-lg text-center justify-center">
          <div className="mt-0 mb-10">
            <Logo/>
          </div>
          
          <div className="inline-flex flex-col gap-y-5">
            <Button className="button-primary" onClick={handleStart} size="lg">
              START
            </Button>
            <Button className="button-secondary" size="lg" >
              ABOUT
            </Button>
          </div>
          
        </div>
      </section>

    </DefaultLayout>
  );
}