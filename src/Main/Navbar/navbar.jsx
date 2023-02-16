import React from 'react';
import SearchComponent from '../../Search/search';
import './navbar.css';
export default class Navbar extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            state : false
        }

        
    }

    // async componentDidMount(){
    //     try{
    //         if(await this.props.web3.isConnected()){
    //             this.setState({
    //                 state: true
    //             });

    //             await this.props.web3.getCampaignList();
    //         }
    //         else{
    //             this.setState({
    //                 state: false
    //             });
    //         }
    //     }
    //    catch(c){
    //     alert('plz connect metamask first');
    //    }
    // }

    render(){
        return(
            <div className="navbar">
                <div className='left-component'>
                <SearchComponent search={this.props.search}/>
                </div>
                <div className='right-component'>
                    <button onClick={()=>this.props.setMainComponent(5)}>Start a campeign</button>
                    {/* <div style={{backgroundColor: this.state.state ? 'var(--green-color)' : '#da5552',padding: '5px',borderRadius: '50px'}}>
                        <Avatar onClick={()=>{
                            this.props.web3.connect().then((result)=>{
                                this.setState({
                                    state: true
                                });
                            });
                        }} style={{
                            cursor: 'pointer',
                            fontSize: '50px'      
                        }}/>
                    </div> */}
                </div>
            </div>
        );    
    }
}