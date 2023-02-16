import React from "react";
import './dashbord.css';
import CampaignGrid from "../Campaign/campaign-grid";
import { CircularProgress } from "@mui/material";
export default class Dashbord extends React.Component{
    constructor(props)
    {
        super(props);
        console.log(props.data);
        this.state = {
            data : [],
            progress: true
        }
    }

    async componentDidMount()
    {
        var d = await this.props.web3.getCampaignList();
        this.setState({
            data: d === undefined ? [] : d,
            progress: false
        });
    }
    render(){ 
        return(<div className="dashbord">{ this.state.progress ? <center><CircularProgress/></center> : this.state.data.length === 0 ? <p>No data Found</p> : 
            <CampaignGrid from="dashbord" title="Popular Campaign" web3={this.props.web3} data={this.state.data}></CampaignGrid>}
        </div>); 
    }  
}