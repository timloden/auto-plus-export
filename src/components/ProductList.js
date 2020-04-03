import React from 'react';
import axios from 'axios';

import Part from './Part';

class ProductList extends React.Component {
  state = {
    products: {}
  }

  componentDidMount() {
    axios.get(`/api/inventory?batchsize=10&page=1000`, {
        headers: {
            'AutoPlusApiKey': 'b09a1f86-1664-4cdc-967c-505b7d04034c',
            'Access-Control-Allow-Headers': 'Authorization',
            'Content-Type': 'application/json',
          }
    })
      .then(res => {
        const products = res.data;
        this.setState({
			products: products.InventoryItems
		});
      })
  }

  render() {
    return (
      <ul>
            {Object.keys(this.state.products).map(key => (
                <Part
                    key={key}
                    partInfo={this.state.products[key]}  
                />
            ))}
      </ul>
    )
  }
}

export default ProductList;