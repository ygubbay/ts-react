
import _ from 'lodash';
import React from 'react';



export default class TodoStats extends React.Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            
            <div>

                <h2 style={{ fontSize: '1.2em', marginTop: '10px', fontWeight: 'bold'}}>Statistics</h2>
                <div>
                    <div className="field-box">
                        <div className="todo-label">Today</div>
                        <div className="todo-field">xx...</div>
                    </div>
                    <div className="field-box">
                        <div className="todo-label">Week</div>
                        <div className="todo-field">xx...</div>
                    </div>
                    <div className="field-box">
                        <div className="todo-label">Month</div>
                        <div className="todo-field">xx...</div>
                    </div>
                </div>
            </div>
        );
    }
}

