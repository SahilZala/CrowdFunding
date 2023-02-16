import React from "react";
import './dashbord.css';
import CampaignGrid from "../Campaign/campaign-grid";
import { CircularProgress } from "@mui/material";
export default class Dashbord extends React.Component{
    render(){ 
        return(<div className="dashbord">{ this.props.progress ? <center><CircularProgress/></center> : this.props.data.length === 0 ? <p>No data Found</p> : 
            <CampaignGrid from="dashbord" title="Popular Campaign" web3={this.props.web3} data={
                this.props.data.filter((d)=>
                    
                    d.data['_address'] !== this.props.myAddress)
            
            }></CampaignGrid>}
        </div>); 
    }  
}