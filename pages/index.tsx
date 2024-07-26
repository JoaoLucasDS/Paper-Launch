import DefaultLayout from "@/layouts/default";

import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import Logo from '@/components/logo';

import { useTheme } from "next-themes";

export default function IndexPage() {
  const { theme } = useTheme();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {/* <Image src={`/paper_launch_logo.svg`} width="300" radius="none"/> */}
          <div className="mb-10">
            <Logo/>
          </div>
          
          <div className="inline-flex flex-col gap-y-4">
            <Button className="text-secondary text-4xl font-bold px-6 py-2" color="primary" size="lg">
              START
            </Button>
            <Button className="text-4xl font-bold px-6 py-2 border-3" color="primary" variant="bordered" size="lg" >
              ABOUT
            </Button>
          </div>
          
        </div>
      </section>

    </DefaultLayout>
  );
}