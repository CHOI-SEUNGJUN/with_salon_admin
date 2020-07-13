import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

// sidebar nav config
// routes config
import routes from '../../routes';

import AuthRoute from '../../AuthRoute';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    window.sessionStorage.clear();
    // console.log("signOut requested : ", this.props.authenticatedHandler(null, '/login', false));
    //this.props.location.setIsAuthenticated(false);
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <DefaultHeader onSignOut={e => this.signOut(e)}/>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    // console.log("HII", this.props)
                    return route.component ? ( this.props.isAdmin ? 
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} /> 
                      : <AuthRoute
                          authenticated={this.props.isAdmin}
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
