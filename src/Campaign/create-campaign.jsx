import React from "react";
import './create-campaign.css';
import { PaidRounded, Upload } from "@mui/icons-material";
import IPFSTransaction from "../web3/ipfs-transaction";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
class CreateCampaignClass extends React.Component
{
    constructor(props){
        super(props);
        this.ipfs = new IPFSTransaction();
        this.state = {
            name: '',
            title: '',
            label: 'Education',
            story: '',
            goal: 0,
            endDate: '',
            image: '',
            file: undefined,
            uploadStatus : false,
            submitStatus : false,
            catrgory: [
                'Education',
                'Household',
                'Electronics',
                'Personal Cleaning',
                'Personal Care',
                'Oral Care',
                'Hair Care',
                'Medication',
                'Diet',
                'Clothing',
                'Music',
                'Poster',
                'Shoes',
                'Books',
                'Grocery',
                'Fashio',
                'Auto',
                'Drink',
                'Entertainment',
                'Food',
                'Other'
            ]
        }
    }

    render(){
        return(
            <div className="create-campaign-container">
                <div className="title-banner">
                    <p>START A CAMPAIGN</p>
                </div>
                <br/>
                <div className="create-campaign-body">
                    <div className="first">
                        <div className="body">
                            <label>Category*</label>
                            <select onChange={(cat) => this.setState({label: cat.target.value})}>
                                {this.state.catrgory.map((cat,index)=><option key={index} value={cat}>{cat}</option>)}
                                
                            </select>
                        </div>
                    </div>

                    <div className="first">      
                        <div className="body">
                            <label>Your name*</label>            
                            <input onChange={(val)=>this.setState({name: val.target.value})} placeholder="Jhon Doe"></input>
                        </div>
                        
                        <div className="body">
                            <label>Campaign title*</label>            
                            <input onChange={(val)=>this.setState({title: val.target.value})} placeholder="Write a title"></input>
                        </div>
                    </div>
                 
                    <div className="first"> 
                        <div className="body">
                            <label>Story*</label>            
                            <textarea onChange={(val)=>this.setState({story: val.target.value})} placeholder="Write your story"></textarea>
                        </div> 
                    </div>

                    <div className="first">
                        <div className="banner">
                            <p><PaidRounded style={{fontSize: '25px', paddingRight: '10px'}}/>You will get 100% of the raised ammount</p>
                        </div>
                    </div>


                    <div className="first">      
                        <div className="body">
                            <label>Goal*</label>            
                            <input onChange={(val)=>this.setState({goal: val.target.value})} type='number' placeholder="Jhon Doe"></input>
                        </div>
                        
                        <div className="body">
                            <label>End date*</label>            
                            <input onChange={(val)=>this.setState({endDate: val.target.value})} type='date' placeholder="dd/mm/yyy"></input>
                        </div>
                    </div>

                    

                    <div className="first"> 
                        <div className="body">
                            <label>Campaign image*</label>  
                            <div style={{display:"flex"}}> 
                                <input style={{flex: 1}} onChange={(data)=>this.setState({file: data.target.files[0]})} type='file'></input>
                                {this.state.uploadStatus ? <CircularProgress style={{marginLeft: '10px', color: '#ffb703'}}/> : <button onClick={
                                    ()=>this.uploadImage()}><Upload/>UPLOAD</button>}
                            </div>          
                        </div> 
                    </div>
                    
                    <br/>
                    <br/>
                    <div className="first"> 
                        <div className="submit">
                            { this.state.submitStatus ? <CircularProgress/> : <button onClick={()=>this.createCampaign()}>Submit new campaign</button>}
                        </div> 
                    </div>

                    
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }

    createCampaign(){
    
        
        if(this.state.name === '' || this.state.story === '' || this.state.goal === '' || this.state.endDate === ''){
            alert("Plz complete all field");
            return;
        }
        if(new Date(this.state.endDate) < new Date()){
            alert("End date should be greater then current date.");
            return;
        }
        this.setState({
            submitStatus: true
        });
        this.props.web3.createCampaign(
            this.state.name,
            this.state.label,
            this.state.title,
            this.state.story,
            this.state.goal,
            this.state.endDate,
            this.state.image).then(()=>{
            this.props.setMainComponent(0);
            alert("campaign created succesfully");
            this.setState({
                submitStatus: false
            });
        }).catch((err) => {
            alert(err.message);
            this.setState({
                submitStatus: false
            });
        });

    }

    uploadImage(){
        if(this.state.file === undefined){
            alert("plz select image");
        }
        else{
            this.setState({
                uploadStatus: true
            });
            this.ipfs.save(this.state.file).then((result)=>{
                this.setState({
                    image: "https://crowd-fuding-sahil.infura-ipfs.io/ipfs/"+result.cid,
                    uploadStatus : false
                });
                alert("uploaded succesfully");
            }).catch((error)=>{
                alert(error.message);
                this.setState({
                    uploadStatus: false
                }); 
            });
        }
    }
}

export default function CreateCampaign(props){
    let navigate = useNavigate();
    return(<CreateCampaignClass setMainComponent={props.setMainComponent} web3={props.web3} navigate={navigate}></CreateCampaignClass>);

}