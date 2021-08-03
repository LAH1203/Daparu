import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import SignInPage from './views/SignInPage/SignInPage';
import SignUpPage from './views/SignUpPage/SignUpPage';
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={MainPage} />
          <Route path='/signin' exact component={SignInPage} />
          <Route path='/signup' exact component={SignUpPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;