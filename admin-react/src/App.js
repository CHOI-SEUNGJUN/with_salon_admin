import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

const Signin = React.lazy(() => import("./views/Pages/Signin"));
const Home = React.lazy(() => import("./views/Pages/Home"));
const Salon = React.lazy(() => import("./views/Pages/Salon"));
const Contents = React.lazy(() => import("./views/Pages/Contents"));

function App() {

  const [rootUser, setRootUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(rootUser != null);
  const [isAdmin, setIsAdmin] = useState(false);

  const authenticatedHandler = async (user, from, status) => {

    setIsAuthenticated(status);
    setRootUser(user);
    if (user && user.email && user.isAdmin === true) {
      setIsAdmin(true);
      window.sessionStorage.setItem('id', user.email);
      window.sessionStorage.setItem('isAdmin', user.isAdmin);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // console.log("/ hereee");
    if (window.sessionStorage.getItem('isAdmin') === "true") {
      // console.log("logged");
      setRootUser({
        email: window.sessionStorage.getItem('id'),
        isAdmin: true
      });
      setIsAdmin(true);
    }
  }, [])

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path="/sign-in"
            name="Sign-in Page"
            render={(props) => (
              <Signin 
              authenticated={isAdmin}
              authenticatedHandler={authenticatedHandler}
              {...props}/>
            )}
          />
          <Route
            exact
            path="/salon"
            name="Salon"
            render={(props) => (
              <Salon />
            )}
          />
          <Route
            exact
            path="/contents"
            name="Contents"
            render={(props) => (
              <Contents />
            )}
          />
          <Route 
            path="/"
            name="Home"
            render={(props) => (
              <DefaultLayout 
                authenticatedHandler={authenticatedHandler}
                isAdmin={isAdmin}
                {...props}/>
            )}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
