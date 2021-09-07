import { AddEventController } from "./pages/addEvent/";
import { Switch, Route, NavLink } from "react-router-dom";
import { EventsController } from "./pages/Events";

import "./App.css";

const ErrorComponent = ({ status }) => {
  return <div className="error-component">Current page doesn't exist</div>;
};

function App() {
  return (
    <div className="App">
      <div className="app-navigation">
        <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/">
          Главная
        </NavLink>
        <NavLink className="app__nav-link" activeClassName="activeRoute" to="/admin/basket">
          Корзина
        </NavLink>
      </div>
      <main id="main">
        <div className="app-content">
          <Switch>
            <Route exact path="/admin/" component={EventsController} />
            <Route path="/admin/add-event" component={AddEventController} />
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
