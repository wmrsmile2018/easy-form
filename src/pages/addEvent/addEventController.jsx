import React, { useState, useCallback } from "react";
import axios from "axios";

import { AddEvent } from "./addEvent";

const url = process.env.REACT_APP_BASE_URL;

export const AddEventController = React.memo(() => {
  const [state, setState] = useState({
    event: "",
    city: "",
    date: "",
    area: "",
    QRs: [],
  });

  const handleOnSubmit = useCallback(() => {
    axios.post(url, state);
  }, [state]);

  return (
    <div>
      <AddEvent onUpdateState={setState} state={state} onSend={handleOnSubmit} />
    </div>
  );
});
