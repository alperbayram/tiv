"use client"; // Client component

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname instead of useRouter
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [walletId, setWalletId] = useState("");
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const savedWalletId = Cookies.get("address");
    if (savedWalletId) {
      setWalletId(savedWalletId);
    }
  }, []);

  const connectWallet = async () => {
    if (!walletId) {
      try {
        // Connect to MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletId(address);
        Cookies.set("address", address, { expires: 7 }); // Save Wallet ID in cookies

        // Redirect to profile page after connecting
        window.location.href = "/profile";
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      // Disconnect: Clear Wallet ID and remove from cookies
      setWalletId("");
      Cookies.remove("address");

      // Redirect to home page after disconnecting
      window.location.href = "/";
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <h6 className="text-2xl font-bold text-[#9333ea]">TIV</h6>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "border-b-2 border-[#9333ea]  text-black font-semibold"
                        : "text-black border-b-2 hover:border-[#9333ea]",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {walletId ? (
              <Link
                href="/profile"
                className="inline-flex items-center rounded-md bg-[#9333ea]  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#9333ea]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333ea] "
              >
                Profile
              </Link>
            ) : (
              ""
            )}
            <button
              type="button"
              onClick={connectWallet}
              className="inline-flex items-center rounded-md bg-[#9333ea]  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#9333ea]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333ea] "
            >
              {walletId ? "Exit Wallet" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "border-b-2 border-[#9333ea]  text-black font-semibold"
                  : "text-gray-300 border-b-2 hover:border-[#9333ea]  ",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
