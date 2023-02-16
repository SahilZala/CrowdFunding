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

    render(){ 
        return(this.props.progress ? <center><CircularProgress/></center> : this.props.data.length === 0 ? <p>No data Found</p> : <div className="campaign-main">
            <CampaignGrid from="campaign-main" title="My Campaign" web3={this.props.web3} data={this.props.data.filter((d)=>d.data['_address'] === this.props.myAddress)}></CampaignGrid>
        </div>); 
    }  
}