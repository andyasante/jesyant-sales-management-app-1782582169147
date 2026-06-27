import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import Login from './components/Login';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/products" component={ProductList} />
            <Route path="/sales" component={SaleForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;