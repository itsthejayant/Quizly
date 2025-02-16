import Loader from "@/components/shared/loader/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-slate-200 bg-dotted-pattern bg-contain py-5 md:py-0" >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0" >
          <div className="flex flex-col justify-center gap-8" >
            <h1 className="h2-medium mt-6 font-mono text-cyan-900" >Ever tried, ever failed?<br /> No matter.<br /> Try again, fail again.<br /> Fail better...</h1>
            <p className='p-regular-20 md:p-regular-24 text-stone-800'>
              Fun, informative, and engaging. The ultimate quiz platform for learners and creators.
            </p>
            {/* <Button size='lg' className="button w-full sm:w-fit">
              <Link href='#events' className=" hover-underline-animation-w" > Explore Now</Link>
            </Button> */}
          </div>
          <Image src="/assets/images/hero.png" width={1000} height={1000} alt={'hero.png'} className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]" />
        </div>
      </section>
      {/* <section id='events'
        className="wrapper my-8 flex flex-col gap-8">
        <h2 className="h2-bold"> Trusted platform</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row" >
          Srarch
          Category filter
        </div>
      </section> */}
    </>
  );
}
