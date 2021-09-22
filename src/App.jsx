import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import { DeletedEventsController, EventsController } from "./pages/Events";
import { DetailsController } from "./pages/details";
import { AddEventController, EditEventController } from "./pages/Event";

import "./App.css";
import { DefaultResourceCotroller } from "./pages/defaultResource";

const ErrorComponent = ({ status }) => {
  return <div className="error-component">Current page doesn't exist</div>;
};

function App() {
  return (
    <div className="App">
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
        </div>
      </div>
      <main id="main">
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/admin" />
            </Route>
            <Route exact path="/admin" component={EventsController} />
            <Route path="/admin/add-event" component={AddEventController} />
            <Route path="/admin/edit-event/:id" component={EditEventController} />
            <Route path="/admin/basket" component={DeletedEventsController} />
            <Route path="/admin/details/:id" component={DetailsController} />
            <Route path="/admin/get-info-default-resource" component={DefaultResourceCotroller} />
            <Route path="*" component={ErrorComponent} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
