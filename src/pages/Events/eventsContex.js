import React, { useContext } from "react";

const initialState = {
  status: "",
};

export const EventsContext = React.createContext(initialState);

export const useEvents = () => useContext(EventsContext);
