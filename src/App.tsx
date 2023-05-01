import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Board, { Account } from "./components/Board/Board";
import TimelinePage from "./pages/TimelinePage";
import AddNewCardPage from "./pages/AddNewCardPage";
import NotFoundPage from "./pages/NotFoundPage";

import styles from "./App.module.css";

import {
  loadAccountsAction,
  addAccount,
  loadAccountsSuccess,
  loadAccountsFailureAction,
} from "./redux/accounts/actions";
import { getAccounts } from "./services/requestMock";

interface AppProps {
  loadAccounts: () => void;
  loadAccountsSuccess: (accounts: Account[]) => void;
  loadAccountsFail: () => void;
  addAccount: (payload: Account) => void;
  accounts: Account[];
}

class App extends Component<AppProps, any> {
  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts = async () => {
    this.props.loadAccounts();
    try {
      const accounts = await getAccounts();
      this.props.loadAccountsSuccess(accounts);
    } catch (error) {
      this.props.loadAccountsFail();
    }
  };

  handleSubmit = (newAccount) => this.props.addAccount(newAccount);

  renderTimelinePage = (routeProps) => (
    <TimelinePage {...routeProps.match.params} accounts={this.props.accounts} />
  );

  renderAddNewCardPage = (routeProps) => (
    <AddNewCardPage {...routeProps} handleSubmit={this.handleSubmit} />
  );

  render() {
    return (
      <Router>
        <Board accounts={this.props.accounts} />
        <div className={styles.pageContent}>
          <Switch>
            <Route
              path="/account/:accountId"
              render={this.renderTimelinePage}
            />
            <Route
              path="/actions/add_card"
              render={this.renderAddNewCardPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ accounts: state.accounts });
const mapDispatchToProps = (dispatch) => ({
  loadAccounts: () => dispatch(loadAccountsAction()),
  loadAccountsSuccess: (accounts) => dispatch(loadAccountsSuccess(accounts)),
  loadAccountsFail: () => dispatch(loadAccountsFailureAction()),
  addAccount: (payload) => dispatch(addAccount(payload)),
});

export { App };

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
