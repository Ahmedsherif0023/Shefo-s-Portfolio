"use client";

import { mailchimp } from "@/app/resources";
import { Button, Flex, Heading, Input, Text, Background, Column } from "@/once-ui/components";
import { opacity, SpacingToken } from "@/once-ui/types";
import { useState } from "react";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

type NewsletterProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
};

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
       style={{ pointerEvents: "none" }} // <-- Add this line
            position="absolute"
            mask={{
              x: mailchimp.effects.mask.x,
              y: mailchimp.effects.mask.y,
              radius: mailchimp.effects.mask.radius,
              cursor: mailchimp.effects.mask.cursor
            }}
            gradient={{
              display: mailchimp.effects.gradient.display,
              opacity: mailchimp.effects.gradient.opacity as opacity,
              x: mailchimp.effects.gradient.x,
              y: mailchimp.effects.gradient.y,
              width: mailchimp.effects.gradient.width,
              height: mailchimp.effects.gradient.height,
              tilt: mailchimp.effects.gradient.tilt,
              colorStart: mailchimp.effects.gradient.colorStart,
              colorEnd: mailchimp.effects.gradient.colorEnd,
            }}
            dots={{
              display: mailchimp.effects.dots.display,
              opacity: mailchimp.effects.dots.opacity as opacity,
              size: mailchimp.effects.dots.size as SpacingToken,
              color: mailchimp.effects.dots.color,
            }}
            grid={{
              display: mailchimp.effects.grid.display,
              opacity: mailchimp.effects.grid.opacity as opacity,
              color: mailchimp.effects.grid.color,
              width: mailchimp.effects.grid.width,
              height: mailchimp.effects.grid.height,
            }}
            lines={{
              display: mailchimp.effects.lines.display,
              opacity: mailchimp.effects.lines.opacity as opacity,
              size: mailchimp.effects.lines.size as SpacingToken,
              thickness: mailchimp.effects.lines.thickness,
              angle: mailchimp.effects.lines.angle,
              color: mailchimp.effects.lines.color,
            }}
          />
     <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
        <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
      </Text>
 <form
  action="https://buttondown.com/api/emails/embed-subscribe/ahmedsherifoo23"
  method="post"
  target="popupwindow"
  onSubmit={() => window.open('https://buttondown.com/ahmedsherifoo23', 'popupwindow')}
  className="embeddable-buttondown-form"
  style={{ position: "relative", zIndex: 1 }}
>
  {/* <label htmlFor="bd-email">Enter your email</label> */}
  <input
    type="email"
    name="email"
    id="bd-email"
    className="newsletter-input"
    placeholder="Enter your email"
    value={email} // <-- Make input controlled
    onChange={handleChange} // <-- Use your handler
    onBlur={handleBlur}
  />
  <input type="submit" value="Subscribe"className="submitBtn" />
</form>
        <style>
        {`

        
          .newsletter-input {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            transition: border-color 0.3s, box-shadow 0.3s;
            margin-right: 20px;
          }
          .newsletter-input:hover, .newsletter-input:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px #007bff33;
            outline: none;
          }
            .submitBtn{
            background-color: transparent;
            color: #fff;
            border: 1px solid #f0f0f0;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 20px;
            }
            .submitBtn:hover {
            background-color: #007bff;
            transition: background-color 0.3s ease-in-out;
            color: #fff;
            transition: color 0.3s ease-in-out;
            }
            @media (max-width: 435px) {
            .submitBtn{
            margin-top: 10px;
            margin-left: -15px;
            }
              form{
          display:flex;
          jsutify-content:center;
          align-items:center;
          flex-direction:column;
          }
        }
        `}
      </style>
    </Column>
  );
};
