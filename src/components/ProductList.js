import React from 'react';

import Part from './Part';

class ProductList extends React.Component {
    render() {
        return (
            <ul>
                {Object.keys(this.props.products).map((key) => (
                    <Part
                        key={key}
                        ProductInformation={this.props.products[key]}
                        addToCsv={this.props.addToCsv}
                        id={key}
                    />
                ))}
            </ul>
        );
    }
}

export default ProductList;
