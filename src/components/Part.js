import React, { Fragment } from 'react';
class Part extends React.Component {
    state = {};

    getPrice = (cost, vehicleArray) => {
        let price = 0;
        let isMustang = false;
        const vehicles = vehicleArray;

        if (cost <= 15) {
            price = Math.round(cost * 1.5) - 0.05;
        } else if (cost > 15 && cost <= 70) {
            price = Math.round(cost * 1.4) - 0.05;
        } else if (cost > 70 && cost <= 175) {
            price = Math.round(cost * 1.3) - 0.05;
        } else if (cost > 175 && cost <= 800) {
            price = Math.round(cost * 1.25) - 0.05;
        } else if (cost > 800) {
            price = Math.round(cost * 1.22) - 0.05;
        }

        if (vehicles) {
            vehicles.find((o) => {
                if (o.ModelName === 'Mustang') {
                    isMustang = true;
                    return true;
                }

                return isMustang;
            });
        }

        if (isMustang) {
            price = Math.round(price * 0.98) - 0.05;
        }

        return price;
    };

    getVehicles = (vehicleApplications) => {
        if (vehicleApplications) {
            const allVehicles = vehicleApplications.map(function (vehicle) {
                let year = vehicle.YearID;
                let make = vehicle.MakeName;
                let model = vehicle.ModelName;

                let ymm = `${year}>${make}>${model}`;
                return ymm;
            });

            let vehicleString = allVehicles.toString();
            const separator = '|';
            vehicleString = vehicleString.split(',').join(separator);

            this.vehicleFinal = vehicleString;
            //this.setState({ vehicles: vehicleString });
            return vehicleString;
        } else {
            return 'Universal';
        }
    };

    getFitmentYears = (vehicleApplications) => {
        if (vehicleApplications) {
            const allVehicles = vehicleApplications.map(function (vehicle) {
                let year = vehicle.YearID;
                //let make = vehicle.MakeName;
                //let model = vehicle.ModelName;

                //let ymm = `${year} ${make} ${model}`;
                return year;
            });

            let vehicleYearString = allVehicles.toString();
            return vehicleYearString;
        } else {
            return;
        }
    };

    getFitmentMake = (vehicleApplications) => {
        if (vehicleApplications) {
            const allVehicles = vehicleApplications.map(function (vehicle) {
                //let year = vehicle.YearID;
                let make = vehicle.MakeName;
                //let model = vehicle.ModelName;

                //let ymm = `${year} ${make} ${model}`;
                return make;
            });

            let vehicleMakeString = allVehicles.toString();
            return vehicleMakeString;
        } else {
            return;
        }
    };

    getFitmentModel = (vehicleApplications) => {
        if (vehicleApplications) {
            const allVehicles = vehicleApplications.map(function (vehicle) {
                //let year = vehicle.YearID;
                //let make = vehicle.MakeName;
                let model = vehicle.ModelName;

                //let ymm = `${year} ${make} ${model}`;
                return model;
            });

            let vehicleModelString = allVehicles.toString();
            return vehicleModelString;
        } else {
            return;
        }
    };

    getCategories = (vehicleApplications) => {
        if (vehicleApplications) {
            const vehicle = vehicleApplications[0];
            const category = `${vehicle.CategoryName}>${vehicle.SubCategoryName}`;
            return category;
        }

        return 'Universal';
    };

    imageCheck = (imageUrl) => {
        const http = new XMLHttpRequest();

        http.open('HEAD', imageUrl, false);
        http.send();

        if (http.status === 200) {
            return imageUrl;
        } else {
            return '';
        }
    };

    componentDidMount() {
        //console.log(this.props.ProductInformation);

        let weight = this.props.ProductInformation.Weight;
        let shippingClass = 'ground';

        if (weight !== 0 || weight !== null) {
            const oversized = this.props.ProductInformation.Oversized;
            const vehicleArray = this.props.ProductInformation
                .VehicleApplications;

            const id = this.props.id;
            const autoPlusId = this.props.ProductInformation.InventoryID;
            const prodName = this.props.ProductInformation.MfgLabel;
            const brandName = this.props.ProductInformation.BrandName;
            const partNumber = this.props.ProductInformation.PartNo;
            const cost = this.props.ProductInformation.Cost;
            const height = this.props.ProductInformation.Height;
            const length = this.props.ProductInformation.Length;
            const width = this.props.ProductInformation.Width;
            const images = this.props.ProductInformation.ProductInformation
                .DigitalAssets;
            let imageUrl = '';

            if (images) {
                imageUrl = this.imageCheck(images[0].URI);
                //console.log(imageUrl);
            }

            if (oversized) {
                weight = 1000;
                shippingClass = `${brandName.toLowerCase()}-freight`;
            }

            const vehicles = this.getVehicles(vehicleArray);
            const category = this.getCategories(vehicleArray);
            const price = this.getPrice(cost, vehicleArray);
            const description = `Since 1984, Dynacorn International LLC has been supplying ${prodName} and classic muscle car enthusiast with quality sheet metal, bright trim and molding for restorations or for just plain making a ride look its best. Dynacorn Products are licensed by OEM, GM, Ford, and Chrysler`;

            const fitmentYears = this.getFitmentYears(vehicleArray);
            const fitmentMake = this.getFitmentMake(vehicleArray);
            const fitmentModel = this.getFitmentModel(vehicleArray);

            console.log(fitmentModel);

            const csvData = {
                autoPlusId: autoPlusId,
                prodName: prodName,
                description: description,
                brand: brandName,
                sku: partNumber,
                cost: cost,
                price: price,
                shippingClass: shippingClass,
                weight: weight,
                height: height,
                length: length,
                width: width,
                image: imageUrl,
                category: category,
                vehicles: vehicles,
                fitmentYears: fitmentYears,
                fitmentMake: fitmentMake,
                fitmentModel: fitmentModel,
            };

            this.setState(csvData);

            // pass data to app for csv export
            this.props.addToCsv(csvData, id);
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.weight > 0 && (
                    <tr>
                        <td>{this.state.autoPlusId}</td>
                        <td>{this.state.prodName}</td>
                        <td>{this.state.description}</td>
                        <td>{this.state.brand}</td>
                        <td>{this.state.sku}</td>
                        <td>{this.state.cost}</td>
                        <td>{this.state.price}</td>
                        <td>{this.state.weight}</td>
                        <td>{this.state.shippingClass}</td>
                        <td>{this.state.height}</td>
                        <td>{this.state.length}</td>
                        <td>{this.state.width}</td>
                        <td>{this.state.image}</td>
                        <td>{this.state.category}</td>
                        <td>{this.state.vehicles}</td>
                        <td>{this.state.fitmentYears}</td>
                        <td>{this.state.fitmentMake}</td>
                        <td>{this.state.fitmentModel}</td>
                    </tr>
                )}
            </Fragment>
        );
    }
}

export default Part;
