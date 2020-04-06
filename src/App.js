import React from 'react';
import * as Utils from './utilities/utilities';
import { CSVLink } from 'react-csv';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

import ProductList from './components/ProductList';

class App extends React.Component {
    state = {
        products: {},
        csvData: [],
    };

    getAllProducts = () => {
        new Promise((resolve, reject) => {
            Utils.getProducts(
                '/api/inventory?batchsize=50&page=1',
                [],
                resolve,
                reject
            );
        }).then((response) => {
            this.setState({ products: response });
        });
    };

    addToCsv = (newCsvData) => {
        const csvData = this.state.csvData;
        csvData.push(newCsvData);
    };

    componentDidMount() {
        loadProgressBar();
        this.getAllProducts();
    }
    render() {
        return (
            <div className="App">
                <ProductList
                    products={this.state.products}
                    addToCsv={this.addToCsv}
                />
                <CSVLink data={this.state.csvData}>Download me</CSVLink>
            </div>
        );
    }
}

export default App;
