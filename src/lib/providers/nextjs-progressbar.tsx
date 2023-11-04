"use client";
import { Fragment, ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";

interface Props {
  children: ReactNode;
}

const NextJsProgressbar = ({ children }: Props) => {
  return (
    <Fragment>
      <NextNProgress
        options={{ easing: "ease", speed: 500 }}
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {children}
    </Fragment>
  );
};

export default NextJsProgressbar;
