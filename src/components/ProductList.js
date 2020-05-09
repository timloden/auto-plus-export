import React from 'react';
import Table from 'react-bootstrap/Table';
import Part from './Part';

class ProductList extends React.Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Auto Plus ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>SKU</th>
                        <th>Cost</th>
                        <th>Price</th>
                        <th>Weight</th>
                        <th>Shipping Class</th>
                        <th>Height</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Vehicles</th>
                        <th>Fitment</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.products).map((key) => (
                        <Part
                            key={key}
                            ProductInformation={this.props.products[key]}
                            addToCsv={this.props.addToCsv}
                            id={key}
                        />
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default ProductList;
