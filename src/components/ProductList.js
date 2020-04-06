import React from 'react';
import Table from 'react-bootstrap/Table';
import Part from './Part';

class ProductList extends React.Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>SKU</th>
                        <th>Vehicles</th>
                    </tr>
                </thead>
                {Object.keys(this.props.products).map((key) => (
                    <Part
                        key={key}
                        ProductInformation={this.props.products[key]}
                        addToCsv={this.props.addToCsv}
                        id={key}
                    />
                ))}
            </Table>
        );
    }
}

export default ProductList;
