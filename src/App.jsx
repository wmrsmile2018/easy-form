import { useEffect } from "react";
import { useHistory, Switch, Route, NavLink, Redirect } from "react-router-dom";

import { DeletedEventsController, EventsController } from "./pages/Events";
import { DetailsController } from "./pages/details";
import { AddEventController, EditEventController } from "./pages/Event";

import "./App.css";
import { DefaultResourceCotroller } from "./pages/defaultResource";
import { AboutUs } from "./pages/AboutUs";
import { UsersController } from "./pages/users";
import { SignInController } from "./pages/signIn";
import { useSelector, useDispatch } from "react-redux";
import { MainPageController } from "./pages/MainPage/mainPageController";

const ErrorComponent = ({ status }) => {
  return <div className="error-component">Current page doesn't exist</div>;
};

export const Router = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === 401) {
      history.push("/sign-in");
      dispatch({ type: "CLEAR_STORE" });
    }
  }, [status]);

  const handleOnLogout = () => {
    history.push("/sign-in");
    dispatch({ type: "CLEAR_STORE" });
  };

  return (
    <>
      <div className="app-navigation">
        <div className="app-navigation-wrapper">
          <NavLink exact className="app__nav-link" activeClassName="activeRoute" to="/">
            Главная
          </NavLink>
          <NavLink exact className="app__nav-link" activeClassName="activeRoute" to="/admin">
            Активные
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/basket">
            Корзина
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/add-event">
            Добавить мероприятие
          </NavLink>
          <NavLink
            className="app__nav-link"
            activeClassName="activeRoute"
            to="/admin/get-info-default-resource"
          >
            Общий дефолтный <br />
            внешний ресурс
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/FAQ">
            FAQ
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/users">
            Администрирование
          </NavLink>
          <NavLink
            onClick={handleOnLogout}
            className="app__nav-link"
            activeClassName="activeRoute"
            to="/sign-in"
          >
            Выйти
          </NavLink>
        </div>
      </div>
      <main id="main">
        <div className="app-content">
          <Switch>
            <Route exact path="/" component={MainPageController} />
            <Route exact path="/admin" component={EventsController} />
            <Route path="/admin/add-event" component={AddEventController} />
            <Route path="/admin/users" component={UsersController} />
            <Route path="/admin/edit-event/:id" component={EditEventController} />
            <Route path="/admin/basket" component={DeletedEventsController} />
            <Route path="/admin/details/:id" component={DetailsController} />
            <Route path="/admin/get-info-default-resource" component={DefaultResourceCotroller} />
            <Route path="/admin/FAQ" component={AboutUs} />
            <Route path="*" component={ErrorComponent} />
          </Switch>
        </div>
      </main>
    </>
  );
};

function App() {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" component={SignInController} />
        <Route path="/" component={Router} />
      </Switch>
    </div>
  );
}

export default App;
