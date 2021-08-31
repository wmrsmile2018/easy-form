import React, { useState, useCallback } from "react";
import axios from "axios";
import { Event } from "../Event";

const url = process.env.REACT_APP_BASE_URL;

const parametres = {
  status: "add",
};

export const AddEventController = React.memo(() => {
  const [state, setState] = useState({
    event: "",
    city: "",
    date: "",
    area: "",
    QRs: [],
  });

  const handleOnSubmit = useCallback(() => {
    axios.post(`${url}/addEvent`, state);
    setState({ event: "", city: "", date: "", area: "", QRs: [] });
  }, [state]);

  return <Event onUpdateState={setState} state={state} onSend={handleOnSubmit} {...parametres} />;
});
