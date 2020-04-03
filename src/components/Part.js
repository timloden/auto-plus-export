import React from 'react';

class Part extends React.Component {
	state = {
		vehicles: {}
	}

	componentDidMount() {
		const vehicleApplications = this.props.partInfo.VehicleApplications;

		this.setState({
			vehicles: vehicleApplications
		});
	}

	render() {
	
	const brandName = this.props.partInfo.BrandName;
	const partNumber = this.props.partInfo.PartNo;
	
	return (
		<li>
			<p>{brandName}</p>
			<p>{partNumber}</p> 
			<ul>
				{Object.keys(this.state.vehicles).map(key => (
					<li key={key}>
						<p>{this.state.vehicles[key].YearID} > {this.state.vehicles[key].MakeName} > {this.state.vehicles[key].ModelName}</p>
					</li>
				))}
			</ul>
		</li>
	)
  }
}

export default Part;