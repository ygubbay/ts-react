
import _ from 'lodash';
import React from 'react';

import { setTSList, newTS, removeTS } from '../actions/tsActions';
import Header from '../components/Header';
import TodoStats from '../components/todo-stats';
import TodoEntry from '../components/todo-entry';

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import * as api from '../api';

import TodoTable from '../components/todo-table';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';


export default class CreateInvoice extends React.Component {
  constructor(props) {
        super(props);

        
    }


    render() {

        return (

            <div>
                <h2>Create Invoice</h2>

                <div>
                    
                </div>
            </div>
        );
    }
}