"use client";
export default function SectionTwoComponent() {
  return (
    <div className="bg-transparent py-8 sm:py-8 mx-auto max-w-7xl px-6 lg:px-8 h-screen">
      <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:py-24">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Your trusted travel ID.{" "}
            <a href="#" className="font-semibold text-[#9333ea] ">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-[#9333ea] sm:text-7xl">
            TIV
          </h1>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            "Travelers identity verification"
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            To get started with TIV and enjoy seamless, secure identity
            verification for your travels, we need you to connect your MetaMask
            Wallet. Here’s how you can easily create and set up your MetaMask
            wallet with us:
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-[#9333ea]  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#9333ea]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333ea] "
            >
              Get started
            </a>
            <a href="/about" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] bg-white"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#56ffad] to-[#1606f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
