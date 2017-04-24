
import _ from 'lodash';
import React from 'react';



export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            
            <header style={{ 'background': 'lightgreen',                        
                            'padding': '5px',
                            'textAlign': 'center',
                            'fontSize': '1.3em',
                            'fontFamily': 'cursive' }}>
                Timesheeter
            </header>
        );
    }
}

