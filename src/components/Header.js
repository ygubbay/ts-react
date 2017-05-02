
import _ from 'lodash';
import React from 'react';



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
                    <button>Todo</button>
                    <button>Create Invoice</button> 
                    <button>View Invoices</button>
                </div>
            </div>
        );
    }
}

