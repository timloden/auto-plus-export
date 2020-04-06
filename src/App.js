import React from 'react';
import * as Utils from './utilities/utilities';
import { CSVLink } from 'react-csv';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';

class App extends React.Component {
    state = {
        products: {},
        csvData: [],
        date: {},
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
        //this.getAllProducts();
        const date = Utils.getDate();
        this.setState({ date: date });
    }

    render() {
        return (
            <div className="App">
                <button className="btn" onClick={() => this.getAllProducts()}>
                    Load All Products
                </button>
                <ProductList
                    products={this.state.products}
                    addToCsv={this.addToCsv}
                />
                <CSVLink
                    data={this.state.csvData}
                    filename={`${this.state.date}-product-export.csv`}
                    className="btn btn-primary"
                    target="_blank"
                >
                    Download Product CSV
                </CSVLink>
            </div>
        );
    }
}

export default App;
