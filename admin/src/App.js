import { Redirect, Route, Switch } from 'react-router-dom';
import LayoutSider from './components/Sider';
import AuthPage from './components/Login/pages/AuthPage';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return localStorage.getItem('accessToken') ||
            sessionStorage.accessToken ? (
            <Redirect to="/Edu" />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        path="/Edu"
        render={() => {
          return localStorage.getItem('accessToken') ||
            sessionStorage.accessToken ? (
            <LayoutSider />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route path="/login">
        <AuthPage />
      </Route>
    </Switch>
  );
}

export default App;
