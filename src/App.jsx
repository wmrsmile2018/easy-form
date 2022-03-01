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
  const handleOnLogout = () => {
    history.push("/admin/sign-in");
    dispatch({ type: "CLEAR_STORE" });
  };

  const handleOnRedirect = () => {
    window.open("https://qrga.me/admin/loadCsv", "_blank");
  };
  return (
    <>
      <div className="app-navigation">
        <div className="app-navigation-wrapper">
          <NavLink exact className="app__nav-link" activeClassName="activeRoute" to="/admin">
            Главная
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
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/sign-in">
            <p onClick={handleOnRedirect}>
              Кастомные
              <br />
              страницы
            </p>
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/users">
            Администрирование
          </NavLink>
          <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/sign-in">
            <p onClick={handleOnLogout}>Выйти</p>
          </NavLink>
        </div>
      </div>
      <main id="main">
        <div className="app-content">
          <Switch>
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
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPageController} />
        <Route path="/admin/sign-in" component={SignInController} />
        <Route
          path="/admin"
          render={() => (token ? <Router /> : <Redirect to="/admin/sign-in" />)}
        />
      </Switch>
    </div>
  );
}

export default App;
