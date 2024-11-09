"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const allLinks = {
  Accueil: "/",
  Solution: "/solution",
  Equipe: "/team",
  Contact: "/contact",
};

export const Header = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [linksToShow, setLinksToShow] =
    useState<Record<string, string>>(allLinks);
  const [selectedLink, setSelectedLink] = useState<string>("");
  const [underlinePosition, setUnderlinePosition] = useState<number>(0);
  const [underlineWidth, setUnderlineWidth] = useState<number>(0);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const linksContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set the initial selected link based on the current path only on the client side
    if (typeof window !== "undefined") {
      setSelectedLink(window.location.pathname);
    }
    updateLoginStatus();
  }, []);

  // Function to update the underline position and width based on the selected link
  const updateUnderline = (url: string) => {
    const selectedRef = linkRefs.current[url];
    if (selectedRef && linksContainerRef.current) {
      const containerRect = linksContainerRef.current.getBoundingClientRect();
      const selectedRect = selectedRef.getBoundingClientRect();
      setUnderlinePosition(selectedRect.left - containerRect.left);
      setUnderlineWidth(selectedRect.width);
    }
  };

  // Function to load the login status from localStorage
  const updateLoginStatus = () => {
    const storedLoginStatus = localStorage.getItem("isLogin");
    const loginStatus = storedLoginStatus === "true";
    setIsLogin(loginStatus);
    setLinksToShow(allLinks);
    setSelectedLink(allLinks.Accueil);
    updateUnderline(selectedLink);
  };

  useEffect(() => {
    const handleLoginStatusChange = () => updateLoginStatus();
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  const handleLoginToggle = () => {
    const newLoginStatus = !isLogin;
    setIsLogin(newLoginStatus);
    localStorage.setItem("isLogin", JSON.stringify(newLoginStatus));

    window.dispatchEvent(new CustomEvent("loginStatusChanged"));

    const newLink = allLinks.Accueil;
    setSelectedLink(newLink);
    updateUnderline(newLink);
    router.push(newLink);
  };

  const navigateToHome = () => {
    router.push(allLinks.Accueil);
    setSelectedLink(allLinks.Accueil);
    updateUnderline(allLinks.Accueil);
  };

  useEffect(() => {
    updateUnderline(selectedLink);
    const handleResize = () => updateUnderline(selectedLink);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedLink]);

  return (
    <div className="relative flex items-center justify-between w-full py-[2%] px-4 mb-[3%]">
      <div className="flex items-center justify-start gap-3">
        <h2
          className="text-xl text-white outfit-regular cursor-pointer"
          onClick={navigateToHome}
        >
          Edukai
        </h2>
        <Badge className="flex items-center justify-center gap-2 outfit-regular text-xs text-primary-500 px-3 py-1 rounded-full border border-primary-500 bg-primary-500 bg-opacity-25 hover:bg-primary-500 hover:bg-opacity-25 whitespace-nowrap">
          <Image src={"/icons/stars.svg"} width={15} height={15} alt="Stars" />
          Dès Juillet 2025
        </Badge>
      </div>
      <div
        ref={linksContainerRef}
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <div className="relative flex items-center gap-5">
          {Object.entries(linksToShow).map(([name, url]) => (
            <a
              key={name}
              href={url}
              ref={(el) => {
                linkRefs.current[url] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedLink(url);
                updateUnderline(url);
                router.push(url);
              }}
              className={`transition-all relative text-md text-white hover:text-primary-500 outfit-regular ${
                selectedLink === url ? "text-primary-500" : ""
              }`}
            >
              {name.replace("_", " ")}
            </a>
          ))}
          {/* Underline element */}
          <span
            className="absolute bottom-[-4px] h-[2.5px] bg-primary-500 rounded-full transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${underlinePosition}px)`,
              width: `${underlineWidth * 0.75}px`,
            }}
          ></span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <a
          href="https://github.com/EdukaiFR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/logos/github.png"}
            width={20}
            height={20}
            alt="GitHub"
            className="transition-all opacity-50 hover:opacity-100"
          />
        </a>
        <a
          href="https://www.instagram.com/edukaifr/?hl=fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/logos/instagram.png"}
            width={20}
            height={20}
            alt="Instagram"
            className="transition-all opacity-50 hover:opacity-100"
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image
            src={"/logos/linkedin.png"}
            width={20}
            height={20}
            alt="LinkedIn"
            className="transition-all opacity-50 hover:opacity-100"
          />
        </a>
      </div>
    </div>
  );
};
