
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from '../components/Header';
import TodoPage from './todo-page';
import CreateInvoice from './create_invoice';



export default class App extends React.Component {

  
    render() {

                                   
        return (
            <Router>          
            <div className="ts-page">
                <Header />

                <Route exact path="/" component={TodoPage} />
                <Route path="/invoice" component={CreateInvoice} />
            </div>
               </Router>
        );
    }
      
}