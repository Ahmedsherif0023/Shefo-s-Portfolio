"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Fade, Flex, Line, ToggleButton, useTheme } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, about, blog, work } from "@/app/resources/content";
import { ThemeToggle } from "./ThemeToggle";
import SignLogo from "../../public/images/Sign.png";
import SignBLogo from "../../public/images/Sign_b.png";
import Image from "next/image";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-ar",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export const Header = () => {
  const pathname = usePathname() ?? "";
  const { theme } = useTheme(); // ✅ Use theme from context

  const [logoStyle, setLogoStyle] = useState<{
    width: number;
    left: number;
    top?: number;
    bottom?: number;
  }>({ width: 120, left: 0 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 500) {
        setLogoStyle({ width: 80, left: -30, top: -20 });
      } else if (w < 900) {
        setLogoStyle({ width: 100, left: -10, top: -30 });
      } else {
        setLogoStyle({ width: 120, left: 0, top: -30 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        show="s"
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex className="ml-20">
          <Link href="/">
            <Image
              src={theme === "dark" ? SignLogo : SignBLogo} // ✅ Correct logic
              alt="Logo"
              className="Logo"
              style={{
                width: logoStyle.width + "px",
                height: logoStyle.width + "px",
                position: "absolute",
                top:
                  logoStyle.top !== undefined
                    ? logoStyle.top + "px"
                    : "-30px",
                left: logoStyle.left + "px",
                zIndex: 10,
                borderRadius: "16px",
                transition: "width 0.3s, left 0.3s, top 0.3s",
              }}
            />
          </Link>
        </Flex>

        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-alpha-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href="/"
                  selected={pathname === "/"}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line
                    background="neutral-alpha-medium"
                    vert
                    maxHeight="24"
                  />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex
              paddingRight="12"
              fillWidth
              vertical="center"
              textVariant="body-default-s"
            >
              {display.location && <Flex hide="s">{person.location}</Flex>}
            </Flex>
            <Flex hide="s">
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
