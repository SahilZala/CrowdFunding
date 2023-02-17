import React from "react";
import './main.css';
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";
import Dashbord from "../Dashbord/dashbord";
import CreateCampaign from "../Campaign/create-campaign";
import Web3Transaction from "../web3/web3-transaction";
import CamapignMain from "../Campaign/campaign-main";
import Information from "../Information/information";
import Investment from "../Investment/investment";

export default class Main extends React.Component
{
    constructor(){
        super();
        this.web3 = new Web3Transaction();
        this.state = {
            main : 0,
            data: [],
            progress: true,
            myAccountAddress: '',
            search : ''
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
            <Dashbord myAddress={this.state.myAccountAddress} progress={this.state.progress} data = {this.state.search === "" ? this.state.data : this.state.data.filter(d=>d.data['_campaignTitle'].substring(0,this.state.search.length).toLocaleLowerCase() === this.state.search.toLocaleLowerCase() || d.data['_label'].substring(0,this.state.search.length).toLocaleLowerCase() === this.state.search.toLocaleLowerCase())} web3={this.web3}/>,
            <CamapignMain myAddress={this.state.myAccountAddress} progress={this.state.progress} data = {this.state.data} web3={this.web3}/>,
            <Investment myAddress={this.state.myAccountAddress} data = {this.state.data}/>,
            <h3 style={{textAlign: 'center'}}>no notification</h3>,
            <Information/>,
            <CreateCampaign  setMainComponent={(index)=>this.setState({main: index})} web3={this.web3}/>
        ];
        return(
            <div className="main-container">
                <section> 
                    <Sidebar index={this.state.main} setMainComponent={(index)=>this.setState({main: index})}/>
                </section>
                <section style={{
                        flex: '1',
                        
                    }}>
                    <Navbar search={(value)=>this.setState({search: value})} web3={this.web3} setMainComponent={(index)=>this.setState({main: index})} />
                    <section>
                        {this.component[this.state.main]}
                    </section>
                </section>
             </div>
        );
    }   
}