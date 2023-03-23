import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import TrackerSummary from "./components/Tracker/TrackerSummary";
import Tracker from "./components/Tracker";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splashpage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <ProtectedRoute>
              <Splashpage></Splashpage>
            </ProtectedRoute>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/tracker">
            <ProtectedRoute>
              <Tracker></Tracker>
            </ProtectedRoute>
          </Route>
          <Route exact path="/tracker/:distance/:duration/:coordinates">
            <TrackerSummary></TrackerSummary>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
