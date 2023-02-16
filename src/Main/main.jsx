import React from "react";
import './main.css';
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";
import Dashbord from "../Dashbord/dashbord";
import CreateCampaign from "../Campaign/create-campaign";
import Web3Transaction from "../web3/web3-transaction";
import CamapignMain from "../Campaign/campaign-main";
import Information from "../Information/information";

export default class Main extends React.Component
{
    constructor(){
        super();
        this.web3 = new Web3Transaction();
        this.state = {
            main : 0,
        };
        this.component = [
            <Dashbord web3={this.web3}/>,
            <CamapignMain  web3={this.web3}/>,
            <h1>notification</h1>,
            <Information/>,
            <h1>logout</h1>,
            <CreateCampaign setMainComponent={(index)=>this.setState({main: index})} web3={this.web3}/>
        ];
    }

    render(){
        return(
            <div className="main-container">
                <section> 
                    <Sidebar index={this.state.main} setMainComponent={(index)=>this.setState({main: index})}/>
                </section>
                <section style={{
                        flex: '1',
                        padding: '10px'
                    }}>
                    <Navbar web3={this.web3} setMainComponent={(index)=>this.setState({main: index})} />
                    <section>
                        {this.component[this.state.main]}
                    </section>
                </section>
             </div>
        );
    }   
}