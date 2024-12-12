import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div>{children}</div>;
  // return <div className="container mx-auto p-4 min-h-screen">{children}</div>;
}
