import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
// import UserPage from "../components/page/userPage";
// import UsersListPage from "../components/page/usersList";
import UserEditPage from "./components/page/userPageEdit";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                {/* <Route path="/users/" component={UsersListPage} />
                <Route path="/users/:userId" component={UserPage} /> */}
                <Route
                    exact
                    path="/users/userId/edit"
                    component={UserEditPage}
                />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
