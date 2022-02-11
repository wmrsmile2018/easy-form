import clsx from "clsx";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import "./mainPage.scss";

export const MainPage = ({ className, state, onChange, onSubmit }) => {
  const classes = clsx("main-page", className);
  return (
    <MarginGroup isColumn gap={10} className={classes}>
      <h2>Введите Ваш id:</h2>
      <Input name="id" type="text" value={state} onChange={onChange} />
      <Button onClick={onSubmit}>Перейти</Button>
    </MarginGroup>
  );
};
