import React, { Component } from 'react';
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import { Select, Spin, notification } from 'antd';

const { Option } = Select;

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = { dropDownData: [], noOfItems: 0, userType: 'privilage' }
    }

    componentDidMount() {
        axios.get(`http://13.57.235.126:5000/countries`).then(res => {
            const dropDownData = res.data.countries
            const noOfItems = dropDownData.length
            this.setState({ dropDownData, noOfItems })
        });
    }

    addCountry = (data) => {
        let { dropDownData } = this.state
        const updatedCountries = dropDownData.unshift(data)
        this.setState({ noOfItems: updatedCountries })
    }
    render() {
        let { dropDownData, noOfItems, privilage, userType } = this.state
        return (<>
            <NavBar changeUser={(data) => this.setState({ userType: data })} />
            <h3 style={{ paddingTop: "20px" }}>Smart Dropdown - <span style={{ textTransform: "capitalize" }}>{userType}</span></h3>
            {
                userType == "admin" ? <Admin noOfItems={noOfItems} dropDownData={dropDownData} addValue={(data) => this.addCountry(data)} />
                    :
                    <Privilage noOfItems={noOfItems} dropDownData={dropDownData} addValue={(data) => this.addCountry(data)} />

            }
        </>);
    }
}

export default MainContent;



//Class Component
class Admin extends Component {
    state = {}

    handleChange = (value) => {
        let { dropDownData, addValue } = this.props
        let addCountry = value && value[0]
        console.log("value", value)
        if (!dropDownData.includes(addCountry)) {
            axios.get(`http://13.57.235.126:5000/addcountry?name=${addCountry}`).then(res => {
                this.openNotificationWithIcon('success', addCountry, "Country Added Successfully")
            }).catch(error => this.openNotificationWithIcon('error', addCountry, "Duplicate Value"));
        }
        addValue(addCountry)
    }

    openNotificationWithIcon = (type, country, descrip) => {
        notification[type]({
            message: `Country Name : ${country}`,
            description: descrip
        });
    };

    render() {
        let { noOfItems, dropDownData, userType } = this.props;
        return (
            <>
                {noOfItems !== 0 ? <h6>No of Items from API {noOfItems}</h6> : <div><Spin size="large" /></div>}
                <Select
                    mode={"tags"}
                    showSearch
                    style={{ width: '50%' }}
                    placeholder="Select a Location"
                    onChange={(e) => this.handleChange(e)}>
                    {dropDownData?.map((data, index) => (
                        <Option key={index}>{data}</Option>
                    ))}
                </Select>
            </>);
    }
}

//Functional Component
const Privilage = ({ noOfItems, dropDownData, userType }) => {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    return (
        <>
            {noOfItems !== 0 ? <h6>No of Items from API {noOfItems}</h6> : <div><Spin size="large" /></div>}
            <Select
                showSearch
                style={{ width: '50%' }}
                placeholder="Select a Location"
                onChange={(e) => handleChange(e)}>
                {dropDownData?.map((data, index) => (
                    <Option key={index}>{data}</Option>
                ))}
            </Select>
        </>);
}

