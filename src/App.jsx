import { AddEventController } from "./pages/addEvent/";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { DeletedEventsController, EventsController } from "./pages/Events";

import "./App.css";
import { DetailsController } from "./pages/details";

const ErrorComponent = ({ status }) => {
  return <div className="error-component">Current page doesn't exist</div>;
};

function App() {
  return (
    <div className="App">
      <div className="app-navigation">
        <NavLink exact className="app__nav-link" activeClassName="activeRoute" to="/admin">
          Главная
        </NavLink>
        <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/basket">
          Корзина
        </NavLink>
        <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/add-event">
          Добавить мероприятие
        </NavLink>
      </div>
      <main id="main">
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/admin" />
            </Route>
            <Route exact path="/admin" component={EventsController} />
            <Route path="/admin/edit-event/:id" />
            <Route path="/admin/add-event" component={AddEventController} />
            <Route path="/admin/basket" component={DeletedEventsController} />
            <Route path="/admin/details/:id" component={DetailsController} />
            <Route path="*" component={ErrorComponent} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
{
  /* <Route path='/admin' component={}/> */
}
