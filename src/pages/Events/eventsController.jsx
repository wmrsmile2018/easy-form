import React from "react";
import { useHistory } from "react-router-dom";

import { Events } from "./events";

export const EventsController = () => {
  const history = useHistory();
  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };
  return <Events addNew={handleOnAddNew} />;
};
