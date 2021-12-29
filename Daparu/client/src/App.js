import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import SignInPage from './views/SignInPage/SignInPage';
import SignUpPage from './views/SignUpPage/SignUpPage';
import MyPage from './views/MyPage/MyPage';
import RegisterSellerPage from './views/RegisterSellerPage/RegisterSellerPage';
import UploadPage from './views/UploadPage/UploadPage';
import DetailPage from './views/ProductPage/DetailPage/DetailPage';
import ReviewUpload from './views/ReviewPage/ReviewUpload';
import CartPage from './views/CartPage/CartPage';
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
          <Route path='/uploads' exact component={UploadPage} />
          <Route path='/product/:productId' exact component={DetailPage} />
          <Route path='/cart' exact component={CartPage} />
          <Route path='/uploads/:productId' exact component={UploadPage} />
          <Route path='/review/:productId/new' exact component={ReviewUpload} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;