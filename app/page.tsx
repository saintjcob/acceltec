import LenisWrapper from './_components/lenis-wrapper';
import LogoHero from './_components/logo-hero';
import Button from './_components/button';
import Form from './_components/form';
import Footer from './_components/footer/footer';

export default function Home() {
  return (
    <LenisWrapper>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <section className="pb-12 min-h-screen lg:pt-24 overflow-hidden w-screen">
          <div className="flex items-center w-full justify-center px-6">
            <LogoHero className="relative -bottom-6 w-full min-w-[890px]" />
          </div>
          <h1 className="text-[1.75rem] px-6 lg:text-[2.5rem] leading-8 text-center lg:leading-[1.8] font-normal">
            We partner with founders who look for greatness
          </h1>
        </section>
        <section className="flex max-w-xl min-h-screen pt-20 lg:max-w-3xl flex-col items-center px-6 lg:px-0">
          <div className="mx-auto text-2xl lg:text-4xl space-y-8 lg:space-y-6 leading-6 lg:leading-10">
            <h2 className="text-white/80">
              Berlin-based software studio that exclusively works with founders, executives and
              innovative teams.
            </h2>
            <p className="text-white/40">
              We partner with companies and founders who aren’t afraid to challenge conventional
              order. We invest our time, resources and networks in those who recognize the value we
              bring to the table.
            </p>
            <p className="text-white/40">
              We work in a research driven manner. We try to ask the right questions to understand
              and uncover the problem space. We identify the nail before we start worrying about the
              hammer.
            </p>
          </div>
          <Button>Pitch your project</Button>
        </section>
        <section className="max-w-4xl w-full px-4 min-h-screen lg:px-0 py-20">
          <Form />
        </section>
      </main>
      <Footer />
    </LenisWrapper>
  );
}
