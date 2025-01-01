import { createContext, useState } from "react";

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phnNoCC, setPhnNoCC] = useState("+91");
  const [phnNo, setPhnNo] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(false);
  const [isRegistered, setIsRegisterd] = useState("undefined");

  return (
    <DetailsContext.Provider
      value={{
        fname,
        lname,
        phnNoCC,
        phnNo,
        email,
        img,
        isRegistered,
        setIsRegisterd,
        setImg,
        setFName,
        setLName,
        setPhnNoCC,
        setPhnNo,
        setEmail,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
