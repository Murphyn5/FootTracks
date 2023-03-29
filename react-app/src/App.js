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
import ActivityCreate from "./components/Activities/ActivityCreate";
import ActivitiesManageIndex from "./components/Activities/ActivityManageIndex";
import UserSearched from "./components/Users/UserSearched";
import Footer from "./components/Footer";
import LoginSignupFooter from "./components/LoginSignupFooter";

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
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
          <Route exact path="/activities/new">
            <ProtectedRoute>
              <ActivityCreate></ActivityCreate>
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
          <Route exact path="/users/search/:searchString">
            <ProtectedRoute>
              <UserSearched />
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
          <Route exact path="/users/search/">
            <ProtectedRoute>
              <UserSearched />
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
          <Route exact path="/activities/current">
            <ProtectedRoute>
              <ActivitiesManageIndex></ActivitiesManageIndex>
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
            <LoginSignupFooter></LoginSignupFooter>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <LoginSignupFooter></LoginSignupFooter>
          </Route>
          <Route exact path="/tracker">
            <ProtectedRoute>
              <Tracker></Tracker>
            </ProtectedRoute>
          </Route>
          <Route exact path="/tracker/summary">
            <ProtectedRoute>
              <TrackerSummary></TrackerSummary>
              <Footer></Footer>
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
