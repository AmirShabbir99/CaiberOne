import { createContext, useContext } from "react";
export const ContactCtx = createContext({ open: () => {} });
export const useContactDialog = () => useContext(ContactCtx);
