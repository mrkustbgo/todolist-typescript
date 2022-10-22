import React, { createContext, useState } from "react";

export const PathContext = createContext({} as PathContextProps);

interface PathContextProps {
  path: string;
  changePath: (path: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

const PathProvider = ({ children }: Props) => {
  const initialPath: string = "/";
  const [path, setPath] = useState<string>(initialPath);

  const changePath = (path: string) => {
    setPath(path);
  };

  return (
    <PathContext.Provider value={{ path, changePath }}>
      {children}
    </PathContext.Provider>
  );
};

export default PathProvider;
