import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// AgGridReact
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// Thema more : https://github.com/ag-grid/ag-grid-customise-theme

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: true, checkboxSelection: true
      }, {
        headerName: "Model", field: "model"
      }, {
        headerName: "Price", field: "price", checkboxSelection: true

      }]
      /*
      rowData: [{
        make: "Toyota", model: "Celica", price: 35000
      }, {
        make: "Ford", model: "MOndeo", price: 32000
      }, {
        make: "Porsche", model: "Boxter", price: 72000
      }]
      */
    }
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.setState({rowData}));
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <button onClick={this.onButtonClick}>Get selected rows</button>
        <AgGridReact
          onGridReady={ params => this.gridApi = params.api }
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="multiple"             // relative checkboxSelection
        >
        </AgGridReact>
      </div>
    );
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
    alert(`Selected nodes : ${selectedDataStringPresentation}`);
  }
}

export default App;
