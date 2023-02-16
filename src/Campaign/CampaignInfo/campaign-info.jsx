import React from 'react';
import Logo from '../../Logo/logo';
import './campaign-info.css';
import { AccountCircle } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import Web3Transaction from '../../web3/web3-transaction';
import { CircularProgress } from '@mui/material';
import Table from 'react-bootstrap/Table';

class CampaignInfoClass extends React.Component{
    constructor(props){
        super(props);
        this.web3 = new Web3Transaction();

        this.state = {
            fund: 0,
            progress: false,
            funding: []
        }
        
    }

    createCampaign(){
        if(this.props.location.state.from === "campaign-main"){
            alert("you cannot donate in your own account");
            return;
        }
        if(this.state.fund === 0)
        {
            alert('0 fund not allowed');
            return;
        }
        if(Number(this.state.fund)+Number(this.props.location.state.data.donations) <= Number(this.props.location.state.data.data['_goal'])) 
        {
            this.setState({
                progress: true
            });

            this.web3.donate(this.props.location.state.data.data['_id'],this.props.location.state.data.data['_address'],this.state.fund).then((val)=>{
                this.props.navigate(-1);
                this.setState({
                    progress: false
                });
            }).catch((err)=>{
                console.log(err);
                alert(err.message);
                this.setState({
                    progress: false
                });
            });
            
        }
        else{
            alert('donation is over limt.');
        }
    }

    async componentDidMount(){
        const d = await this.web3.getFundingList(this.props.location.state.data.data['_id']);
        this.setState({
            funding: d
        });
    }
    

    render(){
        return(
            <section>
                <div className="campaign-info-main-container">
                    <div className='nav-bar'>
                        <div style={{
                            flex: 2,    
                        }}><Logo/></div>
                        <div style={{
                            flex: 2,
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'center'
                        }}><p style={{
                            color: 'var(--dark-grey)',
                            fontFamily: 'K2D',
                            fontWeight: 800,
                            fontSize: '20px',
                            margin: '0px'
                            }}>{this.props.location.state.data.data['_campaignTitle']}</p>
                        </div>
                    </div>
    
                    <div className='campaign-head-container'>
                        <div className='campaign-primary-container'>
                            <img alt='' src={this.props.location.state.data.data['_imageUrl'] === '' ?  'https://thumbs.dreamstime.com/b/abstract-background-polygon-colorful-vector-design-eps-41507001.jpg' : this.props.location.state.data.data['_imageUrl']}></img>
                        </div>
                        <div className='campaign-secondary-container'>
                            <div className='campaign-side-card'>
                                <div className='upper'>
                                    <p>48</p>
                                </div>
                                <div className='lowwer'>
                                    <p>Day Left</p>
                                </div>
                            </div>
                            <div className='campaign-side-card'>
                                <div className='upper'>
                                    <p>{this.props.location.state.data.donations}</p>
                                </div>
                                <div className='lowwer'>
                                    <p>Raised of {this.props.location.state.data.data['_goal']}Wei</p>
                                </div>
                            </div>
                            <div className='campaign-side-card'>
                                <div className='upper'>
                                    <p>{this.props.location.state.data.totalDonar}</p>
                                </div>
                                <div className='lowwer'>
                                    <p>Total backers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <section className='main-section'>
                        <section className='primary'>
                            <div className='creator-box'>
                                <p>CREATOR</p>
    
                                <div className='title'>
                                    <AccountCircle style={{
                                        color: 'var(--light-grey)',
                                        fontSize: '50px',
                                        marginRight: '10px'
                                        
                                    }}/>
                                    <section>
                                        <p style={{
                                            color: 'var(--dark-grey)',
                                            fontSize: '18px',
                                        }}>{this.props.location.state.data.data['_address']}</p>
                                        <p style={{
                                            
                                            color: 'var(--grey)',
                                            fontSize: '15px',
                                            fontWeight: '500'
                                        }}>1 Campaigns</p>
                                    </section>
                                </div>
                            </div>
                            
                            <br/>
                            <div className='story-box'>
                                <p>STORY</p>
                                <p style={{                        
                                    color: 'var(--grey)',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>{this.props.location.state.data.data['_story']}</p>
                            </div>
                            <br/>
                            <div className='donator-box'>
                                <p>DONATORS</p>
                                {/* <p style={{                        
                                    color: 'var(--grey)',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>No donators yet. Be the first one.</p> */}
                            

                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Campaign Id</th>
                                        <th>Address</th>
                                        <th>Ammount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.funding.map(d=>{
                                      return(<tr>
                                        <td>{d['_id']}</td>
                                        <td>{d['_address']}</td>
                                        <td>{d['_fund']}</td>
                                        <td>{d['_date']}</td>
                                    </tr>);
                                    })}
                                    
                                </tbody>
                                </Table>
                            </div>
                        </section>
                        <section className='secondary'>
                            <div className='fund-box'>
                                <p>FUND</p>
                                
                                <section className='fund-inner-box'>
                                    <p>Fund the campaign</p>
                                    <br/>
                                    <div style={{display:'flex'}}>
                                        <input type='number' onChange={(val)=>this.setState({fund: val.target.value})} placeholder='0.00'></input>
                                    </div>
                                    <br/>
                                    <div style={{
    
                                        backgroundColor: '#484848',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        
                                        
                                    }}>
                                        <p style={{
                                            textAlign: 'left',
                                            
                                            color: 'white',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            fontFamily: 'K2D',
                                            margin: '5px',
                                        }}>Back it because you believe in it.</p>
    
                                        <p style={{
                                            textAlign: 'left',
                                            margin: '5px',
                                            color: 'var(--grey)',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            fontFamily: 'K2D',
                                        }}>Support the project for no reward.just because it speaks to you</p>
                                        <br/>
                                        <div style={{display: 'flex'}}>
                                            {!this.state.progress ? <button 
                                            onClick={()=> this.createCampaign()}
                                            style={{
                                                backgroundColor: 'var(--purple-color)',
                                                border: '0px',
                                                padding: '10px',
                                                flex: '2',
                                                fontFamily: 'K2D',
                                                fontWeight: '500',
                                                color: 'white',
                                                margin: '5px',
                                                borderRadius: '10px',
                                                height: '40px',
                                                cursor: 'pointer'
                                                
                                            }}>
                                                Fund Campaign
                                            </button> : <CircularProgress/>}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </section>
                </div>
                <br/><br/>
            </section>
        );
    }
}

export default function CampaignInfo(){
    const location  = useLocation();
    const navigate = useNavigate();
    // const [fund,setFund] = useState(0);

    return <CampaignInfoClass navigate={navigate} location={location}></CampaignInfoClass>
    
}