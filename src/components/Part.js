import React from 'react';

class Part extends React.Component {
    state = {
        vehicles: {},
        category: {},
    };

    // getVehicles(vehicles) {
    //     if (vehicles) {
    //         const allVehicles = vehicles.map(function (vehicle) {
    //             //console.log(vehicle);
    //             let year = vehicle.YearID;
    //             let make = vehicle.MakeName;
    //             let model = vehicle.ModelName;

    //             let ymm = `${year}>${make}>${model}`;
    //             //console.log(ymm);
    //             return ymm;
    //         });

    //         let vehicleString = allVehicles.toString();
    //         const separator = '|';
    //         vehicleString = vehicleString.split(',').join(separator);

    //         //console.log(vehicleString);

    //         this.setState({
    //             vehicles: vehicleString,
    //         });
    //     } else {
    //         this.setState({
    //             vehicles: 'Universal',
    //         });
    //     }
    // }

    componentDidMount() {
        const productInformation = this.props.ProductInformation;

        const prodName = productInformation.ProdName;
        const brandName = productInformation.BrandName;
        const partNumber = productInformation.PartNo;
        const vehicleApplications = productInformation.VehicleApplications;
        const id = this.props.id;

        if (vehicleApplications) {
            const allVehicles = vehicleApplications.map(function (vehicle) {
                //console.log(vehicle);
                let year = vehicle.YearID;
                let make = vehicle.MakeName;
                let model = vehicle.ModelName;

                let ymm = `${year}>${make}>${model}`;
                //console.log(ymm);
                return ymm;
            });

            let vehicleString = allVehicles.toString();
            const separator = '|';
            vehicleString = vehicleString.split(',').join(separator);

            this.vehicleFinal = vehicleString;
            this.setState({ vehicles: vehicleString });
        } else {
            this.vehicleFinal = 'Universal';
            this.setState({ vehicles: 'Universal' });
        }

        //const vehicles = this.state.vehicles;

        const csvData = {
            prodName: prodName,
            brandName: brandName,
            sku: partNumber,
            ymm: this.vehicleFinal,
        };

        //console.log(csvData);
        this.props.addToCsv(csvData, id);
    }

    componentDidUpdate() {}

    render() {
        const prodName = this.props.ProductInformation.ProdName;
        const brandName = this.props.ProductInformation.BrandName;
        const partNumber = this.props.ProductInformation.PartNo;

        return (
            <tr>
                <td>{prodName}</td>
                <td>{brandName}</td>
                <td>{partNumber}</td>
                <td>
                    {Object.keys(this.state.vehicles).map((key) => (
                        <span key={key}>{this.state.vehicles[key]}</span>
                    ))}
                </td>
            </tr>
        );
    }
}

export default Part;
