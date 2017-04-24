
import _ from 'lodash';
import React from 'react';

import { setTSList, newTS, removeTS } from '../actions/tsActions';
import Header from '../components/Header';
import TodoStats from '../components/todo-stats';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import { projectsGetAll } from '../api';




export default class App extends React.Component {

    constructor(props) {
        super(props);

          this.state = {
                selectedDay: new Date(),
                
            }

        setTimeout(this.readProjects, 20)
    }

    readProjects = ()=> {

        const _this = this;
        projectsGetAll().then(function(response) {
            
            _this.setState({ projects: response.data });
        }).catch(function (err) {
            console.log(err);
        });
    }

    CreateTodo(task) {

        task.isCompleted = false;
    }




  handleDayClick = (day) => {
    
    this.setState({ 
      selectedDay: day 
    })
  }

  getProjectOption(project) {
      return (<option key={project._id} value={project._id}>{project.name}</option>);
    

    
  }

    render() {

        const project_options = this.state.projects ? _.map(this.state.projects, this.getProjectOption): [];
        

        return (
            

            
            <div className="ts-page">
                <Header />
                <div className="todo-left">
                    <DayPicker
                        defaultValue = { new Date()  }
                        selectedDays={ this.state.selectedDay }
                        onDayClick={ this.handleDayClick }
                    />
 
                </div>
                <div className="todo-right">
                    <TodoStats />
                </div>

                <div className="ts-entry-box">
                    <div>
                        <label className="on-top">Project</label>
                        <select className="select-proj"> 
                            {project_options}
                        </select>
                        <button className="btn btn-success" style={{ fontSize: '0.8em', 'marginLeft': '10px'}}>New Project</button>
                    </div>
                    <div>
                        <label className="on-top">Description</label>
                        <input type="text" style={{ width: '100%'}} />
                    </div>

                    <div style={{marginTop: '25px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '61px'}}><Glyphicon glyph="chevron-up"  /></div>
                        <div className="button-up-col" style={{ marginLeft: '15px'}}><Glyphicon glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '75px'}}><Glyphicon glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '18px'}}><Glyphicon glyph="chevron-up"/></div>
                    </div>
                    <div>
                        <label>Start</label>
                        <input type="text" className="time-text" style={{marginLeft: '10px'}}/>
                        <input type="text"  className="time-text"/>
                        
                        <label style={{marginLeft: '20px'}}>End</label>
                        <input type="text"  className="time-text" style={{marginLeft: '10px'}}/>
                        <input type="text"  className="time-text" />
                    </div>
                    <div style={{marginTop: '5px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '61px'}}><Glyphicon glyph="chevron-down"  /></div>
                        <div className="button-up-col" style={{ marginLeft: '15px'}}><Glyphicon glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '75px'}}><Glyphicon glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '18px'}}><Glyphicon glyph="chevron-down"/></div>
                    </div>

                    <div className="two-col">
                        <label>Break</label>
                        <input type="text" className="input-control" />
                    </div>
                    <div className="two-col">
                        <label>Duration</label>
                        <input type="text" className="input-control readonly" readOnly />
                    </div>
                    <hr />

                    <button className="btn btn-primary btn-small">New</button>
                    <button className="btn btn-primary btn-small">Save</button>
                    <button className="btn btn-primary btn-small">Delete</button>

                    <input type="text" id="ts_id" className="readonly" readOnly />
                </div>
            </div>
        );
    }

       
}

