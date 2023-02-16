import React from "react";
import './campaign-main.css';
import CampaignGrid from "../Campaign/campaign-grid";
import { CircularProgress } from "@mui/material";
export default class CamapignMain extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data : [],
            progress: true
        }
    }

    async componentDidMount()
    {
        
        var d = await this.props.web3.getCampaignListByAccount();
        this.setState({
            data: d === undefined ? [] : d,
            progress: false
        });
    }
    render(){ 
        return(this.state.progress ? <center><CircularProgress/></center> : this.state.data.length === 0 ? <p>No data Found</p> : <div className="campaign-main">
            <CampaignGrid from="campaign-main" title="My Campaign" web3={this.props.web3} data={this.state.data}></CampaignGrid>
        </div>); 
    }  
}