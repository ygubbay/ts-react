
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

import * as api from '../api';

import TodoTable from '../components/todo-table';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        const current_date = new Date();
        const today_date = new Date();
        

          this.state = {
                datePickerOpen: false,
                selectedDay: today_date,
                todos: [],
                customerid: 1,  // need to get from login
                userid: 1, // login
                description: '', 
                starthour: current_date.getHours(), 
                startminute: 0,
                endhour: current_date.getHours() + 1,
                endminute: 0,
                breakminutes: 0,
                tsentryid: 0,  // new todo
                projectid: 0, // dummy
                projects: []  // dummy
            }
    }

    componentDidMount() {
        this.descriptionInput.focus();
    }

    componentWillMount() {
        this.readProjects();
        this.readDailyTodos(this.state.selectedDay);
    }

    readProjects = () => {

        const _this = this;
        api.projectsGetActive(this.state.customerid).then((response) => {
            
            // default - first project will be selected
            _this.setState({ projects: response.data, projectid: response.data[0].projectid });
            //
        }).catch((err) => {
            console.log(err);
        });
    }


    readDailyTodos = (sel_date) => {

        const yyyyMMdd = sel_date.getFullYear() + this.pad(sel_date.getMonth()+1, 2) + this.pad(sel_date.getDate(), 2);
        const _this = this;
        api.todosGetByDay(yyyyMMdd).then((response) => {

            _this.setState({todos: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }




  handleDayClick = (day) => {
    
    this.setState({ 
      selectedDay: day
    })
    this.readDailyTodos(day);
    this.handleDayPickerOpen();
  }

  getProjectOption = (project) => {
  
      var is_selected = (this.state.projectid == project.projectid) ? {selected: true}: {};
      return (<option key={project.projectid} {...is_selected} value={project.projectid}>{project.name}</option>);
  }

  handleInputChange(event) {

      const name = event.target.name;
      this.setState({ [name]: event.target.value});
  }

  handleTimeClick(event) {
      const name_op = event.target.id;
      const op = name_op.substr(0, 2);
      const name = name_op.substr(3);
      const new_value = op == 'up' ? this.state[name]+1: this.state[name]-1;

      this.setState( { [name]: new_value })
  }

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    handleDayPickerOpen() {
        this.setState( { datePickerOpen: !this.state.datePickerOpen})
    }

    handleNewTodoClick() {
        
        this.setState({ description: '', 
                        starthour: (new Date()).getHours(), 
                        startminute: 0,
                        endhour: (new Date()).getHours() + 1,
                        endminute: 0,
                        breakminutes: 0,
                        tsentryid: 0 });

    }
    handleSaveTodoClick() {

        const _this = this;

        const sel_day = this.state.selectedDay;
        const starttime = new Date(Date.UTC(sel_day.getFullYear(), 
            sel_day.getMonth(),
            sel_day.getDate(),
            this.state.starthour,
            this.state.startminute
        ))

        const endtime = new Date(Date.UTC(sel_day.getFullYear(), 
            sel_day.getMonth(),
            sel_day.getDate(),
            this.state.endhour,
            this.state.endminute
        ))
        
        const todo = { description: this.state.description, 
                        starttime,
                        endtime,
                        break: this.state.breakminutes,
                        tsentryid: this.state.tsentryid,
                        projectid: this.state.projectid,
                        userid: this.state.userid,
                        entrydate: this.state.selectedDay,
                    };


        api.todoSave(todo).then((response) => {

            _this.handleNewTodoClick();
            _this.readDailyTodos(this.state.selectedDay);
        }).catch((err) => {
            console.log(err);
        })

        

    }
    handleDeleteTodoClick() {

        if (!this.state.tsentryid)
            return;

        const _this = this;
        api.todoDelete(this.state.tsentryid).then((response) => {
            _this.handleNewTodoClick();
            _this.readDailyTodos(this.state.selectedDay);
        }).catch((err) => {
            console.log(err);
        });
        
    }
    editTodo(todo) {
        const starttime = new Date(todo.starttime);
        const endtime = new Date(todo.endtime);

        this.setState({ description: todo.description, 
                        starthour: starttime.getUTCHours(), 
                        startminute: starttime.getUTCMinutes(),
                        endhour: endtime.getUTCHours(),
                        endminute: endtime.getUTCMinutes(),
                        breakminutes: todo.break,
                        tsentryid: todo.tsentryid,
                        projectid: todo.projectid 
                    });
    }


    handleProjectChange(event) {
        this.setState({ projectid: parseInt(event.target.value) })
    }

    render() {

        const project_options = this.state.projects ? _.map(this.state.projects, this.getProjectOption): [];

        // need to get this from axios
        //const todos = [{description: 'item 1'}, {description: 'item 2'}];

        const duration = (this.state.endhour - this.state.starthour) * 60 + (this.state.endminute - this.state.startminute) - this.state.breakminutes;


        const day_picker = this.state.datePickerOpen ? (<div className="day-picker-dd">
                                <DayPicker
                                defaultValue = { this.state.selectedDay  }
                                initialMonth={this.state.selectedDay}
                                selectedDays={ this.state.selectedDay }
                                onDayClick={ this.handleDayClick.bind(this) } />
                            </div>): (<div></div>);
                            
        const tsentryid_display = this.state.tsentryid ? this.state.tsentryid: '';
        return (
            

            
            <div className="ts-page">
                <Header />
                <div className="ts-daypicker">
                    <div>
                        <div>
                            <input className="todo-day" type="text" value={this.state.selectedDay.toString().substr(0, 15)}  readOnly />
                            <span id="open-daypicker">
                                <Glyphicon style={{color: '#337ab7', fontSize: '1.3em', cursor: 'pointer'}} glyph={this.state.datePickerOpen ? "chevron-up": "chevron-down"} onClick={this.handleDayPickerOpen.bind(this)}  />
                            </span>
                        </div>
                    </div>

                    {day_picker}
 
                </div>
                

                <div className="ts-entry-box">
                    <div>
                        <label className="on-top">Project</label>
                        <select className="select-proj" value={this.state.projectid} onChange={this.handleProjectChange.bind(this)}> 
                            {project_options}
                        </select>
                        <button className="btn btn-success" style={{ fontSize: '0.8em', 'marginLeft': '10px'}}>New Project</button>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <label className="on-top">Description</label>
                        <input type="text" ref={(input) => { this.descriptionInput = input; }} name="description" style={{ width: '100%'}} value={this.state.description} onChange={this.handleInputChange.bind(this)}/>
                    </div>

                    <div style={{marginTop: '25px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '56px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="up_starthour" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="up_startminute" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '73px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="up_endhour" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="up_endminute" glyph="chevron-up"/></div>
                    </div>
                    <div>
                        <label>Start</label>
                        <input type="text" className="time-text" style={{marginLeft: '5px'}} maxLength="2" name="starthour" value={this.pad(this.state.starthour, 2)} onChange={this.handleInputChange.bind(this)} />
                        <input type="text" className="time-text" style={{marginLeft: '5px'}}  maxLength="2" name="startminute" value={this.pad(this.state.startminute, 2)}  onChange={this.handleInputChange.bind(this)}/>
                        
                        <label style={{marginLeft: '20px'}}>End</label>
                        <input type="text"  className="time-text" style={{marginLeft: '5px'}}  maxLength="2" name="endhour" value={this.pad(this.state.endhour, 2)}  onChange={this.handleInputChange.bind(this)}/>
                        <input type="text"  className="time-text"  style={{marginLeft: '5px'}} maxLength="2" name="endminute" value={this.pad(this.state.endminute, 2)}  onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div style={{marginTop: '5px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '56px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="dn_starthour" glyph="chevron-down"  /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="dn_startminute" glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '73px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="dn_endhour" glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="dn_endminute" glyph="chevron-down"/></div>
                    </div>

                    <div className="two-col">
                        <label>Break</label>
                        <input type="text" className="input-control" value={this.state.breakminutes} />
                    </div>
                    <div className="two-col">
                        <label>Duration</label>
                        <input type="text" className="input-control readonly" readOnly value={duration} />
                    </div>
                    <hr />

                    <button className="btn btn-primary btn-small" onClick={this.handleNewTodoClick.bind(this)}>New</button>
                    <button className="btn btn-primary btn-small" onClick={this.handleSaveTodoClick.bind(this)}>Save</button>
                    <button className="btn btn-primary btn-small" onClick={this.handleDeleteTodoClick.bind(this)}>Delete</button>

                    <input type="text" id="ts_id" className="readonly" value={tsentryid_display} readOnly />
                </div>

                <div className="ts-stats">
                    <TodoStats />
                </div>

                <TodoTable todos={this.state.todos} 
                        is_date_col={false} 
                        is_project_col={true} 
                        onRowDoubleClick={(todo) => this.editTodo(todo)} />
            </div>
        );
    }

       
}

