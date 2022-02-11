import { useCallback, useState } from "react";
import { MainPage } from "./mainPage";

export const MainPageController = () => {
  const [state, setState] = useState("");
  const handleOnChange = useCallback(({ target }) => {
    setState(target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    window.open(`https://qrga.me/${state}`, "_blank");
  }, [state]);
  return <MainPage state={state} onChange={handleOnChange} onSubmit={handleOnSubmit} />;
};
