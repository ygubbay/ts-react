import React from 'react';


import _ from 'lodash';


import * as api from '../api';

import InvoiceHeader from './invoice-header';
import InvoiceTodosTable from './invoice-todos-table';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';


export default class ViewInvoice extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            header: {},
            todos: []
        }

    }

    componentWillMount() {

        this.getInvoiceHeader(this.props.invoiceid);
        this.getInvoiceTodos(this.props.invoiceid);
    }


    getInvoiceHeader(invoiceid) {

        api.invoiceGetHeader(invoiceid).then((response) => {

            this.setState({header: response.data});
        }).catch((err) => {

            alert(err);
        })
    }   

    getInvoiceTodos(invoiceid) {

        api.invoiceGetTodos(invoiceid).then((response) => 
        {

            this.setState({todos: response.data});

        }).catch((err) => {

            alert(err);
        })
    }

    backClick(event) {

        this.props.onBackClick();
    }

    printClick() {
        alert('print the hardcoded invoice: Ensure invoice_number is updated');

            console.log('printClick:');
            console.dir(this.state.todos);
            let net_amount = 0;
            this.state.todos.map((todo) => {
                net_amount += todo.amount;
                todo.duration = (new Date(todo.endtime)  - new Date(todo.starttime))/60000
            })
            const tax_amount = .17 * net_amount;
            const total_amount = net_amount + tax_amount;

            const print_inv = {
                    from_company: {
                        name: 'Nu Solutions',
                        number: '319210738',
                        is_company: false,
                        phone_number: '093338888',
                        fax_number: '093338888',
                        email: 'ygubbay@gmail.com',
                        website: 'www.nusolutions.com.au'
                    },
                    to: {
                        name: 'BookForMe',
                        person_name: 'Ronnie Heyman'
                    },
                    logo_file: 'images/image.png',
                    invoice_number: '10201',
                    todos: this.state.todos,
                    total: {
                        net: net_amount,
                        tax: tax_amount,
                        grand: total_amount
                    }

                }
            api.invoicePdf(print_inv).then((response) => {

                alert('printed');
            }).catch((err) => {

                alert(err);
            })
    }

// todos: [ { invoicedate: new Date(),
//                                 description: 'Kickoff meeting', 
//                                 duration: '02:00', 
//                                 amount: 360 },
//                             { invoicedate: new Date(),
//                                 description: 'Setup windows service, sql db', 
//                                 duration: '03:30', 
//                                 amount: 630 },
//                             { invoicedate: new Date(),
//                                 description: 'Node ftp client', 
//                                 duration: '01:15', 
//                                 amount: 225 },
//                             { invoicedate: new Date(),
//                                 description: 'Server data transfer', 
//                                 duration: '03:30', 
//                                 amount: 630 },
//                             { invoicedate: new Date(),
//                                 description: 'Server-server comm + db import', 
//                                 duration: '08:30', 
//                                 amount: 1530 },
//                             { invoicedate: new Date(),
//                                 description: 'Cleanup data import', 
//                                 duration: '03:00', 
//                                 amount: 540 },
//                             { invoicedate: new Date(),
//                                 description: 'Test incoming files', 
//                                 duration: '00:20', 
//                                 amount: 60 },
//                             { invoicedate: new Date(),
//                                 description: 'server - add infra', 
//                                 duration: '00:45', 
//                                 amount: 135 },
//                             { invoicedate: new Date(),
//                                 description: 'Install Klika Orders server app on Book4Me server', 
//                                 duration: '00:50', 
//                                 amount: 150 },
//                             { invoicedate: new Date(),
//                                 description: 'service test', 
//                                 duration: '00:30', 
//                                 amount: 90 },
//                             { invoicedate: new Date(),
//                                 description: 'Admin, email pdf infra', 
//                                 duration: '05:00', 
//                                 amount: 900 },
//                             { invoicedate: new Date(),
//                                 description: 'code backup', 
//                                 duration: '00:15', 
//                                 amount: 45 },
//                             { invoicedate: new Date(),
//                                 description: 'Pdf to png conversion.  More import', 
//                                 duration: '02:35', 
//                                 amount: 465 },
//                             { invoicedate: new Date(),
//                                 description: 'Single pdf Order', 
//                                 duration: '11:45', 
//                                 amount: 2115 }
//                                 ]    

  
    render() {

        return (

            <div>
                <div>
                    <h2 style={{ float: 'left'}}>{this.state.header.invoiceid ? 'Invoice - ' + this.state.header.invoiceid: ''}</h2>

                    <div style={{ float: 'right', textAlign: 'right', marginRight: '20px' }}>
                        <button className="btn btn-primary" onClick={this.printClick.bind(this)}>Print</button>
                        <button className="btn btn-danger" onClick={this.backClick.bind(this)}>Back</button>
                        
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>

                <div style={{marginBottom: '20px'}}>
                    <InvoiceHeader header={this.state.header} />
                </div>
                <InvoiceTodosTable todos={this.state.todos} />
            </div>
        );
    }
}
