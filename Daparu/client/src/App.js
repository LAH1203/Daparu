import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import SignInPage from './views/SignInPage/SignInPage';
import SignUpPage from './views/SignUpPage/SignUpPage';
import MyPage from './views/MyPage/MyPage';
import RegisterSellerPage from './views/RegisterSellerPage/RegisterSellerPage';
import UploadPage from './views/UploadPage/UploadPage';
import DetailPage from './views/ProductPage/DetailPage/DetailPage';
import ReviewTablePage from './views/ReviewPage/ReviewTablePage';
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
          <Route path='/mypage' exact component={MyPage} />
          <Route path='/registerSeller' exact component={RegisterSellerPage} />
          <Route path='/upload' exact component={UploadPage} />
          <Route path='/product/:productId' exact component={DetailPage} />
          <Route path='/reviewTable' exact component={ReviewTablePage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;