import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
// redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// async query to the DB with redux
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminInterface from './pages/AdminInterface';
// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
//import logger from 'redux-logger';

// store : used to store data after dispaching it in the database
// store is created in in the top of the component hierarchy so that all components will have access to it
// store will allow the UI to be more dynamic
// thunk: shows the content of our store, it  works with an extension
// rootreducer : contiens all combined Reducers
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

const Application = () => {

  return <Provider store={store}>
    <App />
  </Provider>

}

// calling the store at the top of our react component hierarchy
// <app/> is the mother component of our UI application
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" component={AdminInterface} />
      <Route path="/" component={Application} />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

