/* eslint new-cap: 0 */

import React from 'react';
import { Route, Redirect } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';
import Profile from './components/ProfileView';
import About from './components/AboutView';
import Aggregations from './components/AggregationsView';
import Settings from './components/SettingsView';
import Comparator from './components/ProposalComparatorView';

import Websocket from './components/Websocket';
import ElementsList from './components/ElementsList';
import Element from './components/ElementView';
import ElementsNew from './components/ElementsNewView';
import Concatenator from './components/ElementsConcatenation';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';


export default (
    <Route path="/" component={App}>
        <Redirect from="" to="elements" />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="register" component={requireNoAuthentication(RegisterView)} />
        <Route path="home" component={requireNoAuthentication(HomeContainer)} />
        <Route path="history" component={requireAuthentication(Analytics)} />
        <Route path="aggregations" component={requireAuthentication(Aggregations)} />
        <Route path="profile"   component={requireAuthentication(Profile)} />
        <Route path="settings"   component={requireAuthentication(Settings)} />
        <Route path="about"   component={requireAuthentication(About)} />

        <Redirect from="main" to="elements" />
        <Route name="elements" path="elements" component={requireAuthentication(ElementsList)} />
        <Route name="elementsOld" path="elementsOld" component={requireAuthentication(Websocket)} />
        <Route name="elements.type:historical" path="elements/type/historical" component={Websocket} />
        <Route name="elements.type:proposal" path="elements/type/proposal" component={Websocket} />
        <Redirect from="elements/type/all" to="elements" />

        <Redirect from="elements/concatenate" to="elements" />

        <Route name="elements.create" path="elements/new" component={requireAuthentication(ElementsNew)} />

        <Route name="Element" path="elements/:elementID" component={requireAuthentication(Element)} />
        <Route name="ElementsConcatenation" path="elements/concatenate/:elementsList" component={requireAuthentication(Concatenator)} />
        <Route name="ElementsComparator" path="elements/compare/:elementA/:elementB" component={requireAuthentication(Comparator)} />

        <Route path="*" component={NotFound} />

    </Route>
);
