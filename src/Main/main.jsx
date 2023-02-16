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
            data: [],
            progress: true,
            myAccountAddress: ''
        };
        
    }

    async componentDidMount(){
        var data = await this.web3.getCampaignList();
        var address = await this.web3.getRequestAccount();
        this.setState({
            data : data,
            progress: false,
            myAccountAddress: address[0]
        });
    }

    render(){
        this.component = [
            <Dashbord myAddress={this.state.myAccountAddress} progress={this.state.progress} data = {this.state.data} web3={this.web3}/>,
            <CamapignMain myAddress={this.state.myAccountAddress} progress={this.state.progress} data = {this.state.data} web3={this.web3}/>,
            <h1>notification</h1>,
            <Information/>,
            <h1>logout</h1>,
            <CreateCampaign setMainComponent={(index)=>this.setState({main: index})} web3={this.web3}/>
        ];
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