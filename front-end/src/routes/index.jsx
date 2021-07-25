import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import { Page } from "../components";
import {
  Login,
  Register,
  Home,
  AddFreela,
  ListFreela,
  Profit,
  Summary,
  EditFreela,
  AddProfit,
  EditProfit,
  AddSprint,
  EditSprint,
  ListSprint,
  Config,
} from "../pages";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Page>
        <Route path="/" exact component={Home} isPrivate />
        <Route exact path="/freela/add" component={AddFreela} isPrivate />
        <Route exact path="/freela" component={ListFreela} isPrivate />
        <Route exact path="/profit" component={Profit} isPrivate />
        <Route exact path="/profit/add" component={AddProfit} isPrivate />
        <Route exact path="/profit/edit/:id" component={EditProfit} isPrivate />
        <Route exact path="/summary/:id" component={Summary} isPrivate />
        <Route exact path="/freela/edit/:id" component={EditFreela} isPrivate />
        <Route exact path="/sprint" component={ListSprint} isPrivate />
        <Route exact path="/sprint/add" component={AddSprint} isPrivate />
        <Route exact path="/sprint/edit/:id" component={EditSprint} isPrivate />
        <Route exact path="/config" component={Config} isPrivate />
      </Page>
    </Switch>
  );
}
