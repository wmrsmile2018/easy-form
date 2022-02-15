import { useCallback, useState } from "react";
import { MainPage } from "./mainPage";
import { Helmet } from "react-helmet";

export const MainPageController = () => {
  const [state, setState] = useState("");
  const handleOnChange = useCallback(({ target }) => {
    setState(target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    window.open(`https://qrga.me/${state}`, "_blank");
  }, [state]);
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Helmet>
      <MainPage state={state} onChange={handleOnChange} onSubmit={handleOnSubmit} />;
    </>
  );
};
