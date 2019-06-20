import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';

import history from './app/history';
//Routes
import * as Routes from './constants/routes';
import {
    USERS as ADMIN_USERS,
    PRIVILEGES as ADMIN_PRIVILEGES
} from './constants/routes/admin';
import CONTACT from './constants/routes/contact';
import USERS from './constants/routes/users';
import PRIVILEGES from './constants/routes/privileges';

//Components
import NotFound from './app/components/NotFound';
import userContainer from './users/user';
import addUserContainer from './user/addUser';
import viewUserContainer from './user/viewUser';
import privilegeContainer from './privileges/privilege';
import addPrivilegeContainer from './privileges/addPrivilege';
import viewPrivilegeContainer from './privileges/viewPrivilege';
import settingsContainer from './settings/settings';
import contactContainer from './contact/contact';
import homeContainer from './app/home';

const Router = routerProps => (
    <ConnectedRouter history={history} key={Math.random()}>
        <App>
            <Switch>
                <Route
                    exact
                    path={Routes.HOME}
                    component={withRouter(homeContainer)}
                />
                <Route
                    exact
                    path={CONTACT}
                    component={withRouter(contactContainer)}
                />
                <Route
                    exact
                    path={Routes.SETTINGS}
                    component={withRouter(settingsContainer)}
                />
                <Route
                    path={USERS.ADD}
                    component={withRouter(addUserContainer)}
                />
                <Route
                    path={USERS.VIEW}
                    component={withRouter(viewUserContainer)}
                />
                <Route
                    path={USERS.LIST}
                    component={withRouter(userContainer)}
                />
                <Route
                    path={PRIVILEGES.ADD}
                    component={withRouter(addPrivilegeContainer)}
                />
                <Route
                    path={PRIVILEGES.VIEW}
                    component={withRouter(viewPrivilegeContainer)}
                />
                <Route
                    path={PRIVILEGES.LIST}
                    component={withRouter(privilegeContainer)}
                />
                <Route
                    path={ADMIN_USERS.ADD}
                    component={withRouter(addUserContainer)}
                />
                <Route
                    path={ADMIN_USERS.VIEW}
                    component={withRouter(viewUserContainer)}
                />
                <Route
                    path={ADMIN_USERS.LIST}
                    component={withRouter(userContainer)}
                />
                <Route
                    path={ADMIN_PRIVILEGES.ADD}
                    component={withRouter(addPrivilegeContainer)}
                />
                <Route
                    path={ADMIN_PRIVILEGES.VIEW}
                    component={withRouter(viewPrivilegeContainer)}
                />
                <Route
                    path={ADMIN_PRIVILEGES.LIST}
                    component={withRouter(privilegeContainer)}
                />
                <Route component={NotFound} />
            </Switch>
        </App>
    </ConnectedRouter>
);

export default Router;