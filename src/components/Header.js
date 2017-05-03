
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';



export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div>
                <header style={{ 'background': 'lightgreen',                        
                                'padding': '5px',
                                'textAlign': 'center',
                                'fontSize': '1.3em',
                                'fontFamily': 'cursive' }}>
                    Timesheeter
                </header>
                <div>
                    <Link to="/"><button>Todo</button></Link>
                    <Link to="/invoice"><button>Create Invoice</button></Link> 
                    <Link to="/invoices/view">View Invoices</Link>
                </div>
            </div>
        );
    }
}

