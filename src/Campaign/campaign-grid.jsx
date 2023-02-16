import { useNavigate } from 'react-router-dom';
import CampaignCard from './campaign-card';
import './campaign-grid.css';
export default function CampaignGrid(props){
    var navigate = useNavigate();
    return(
        <div className='campaign-container'>
            <p>{props.title}
                <spam style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                    color: 'var(--purple-color)'
                }}>({props.data.length})</spam>
            </p>
            <div className='compaign-grid-container'>
                {props.data.map((d)=>{
                    return(<CampaignCard key={d.data['_id']} data={d} onClick={
                        ()=>{
                            navigate('/donate',
                                {state: {
                                    data: d,
                                    from: props.from
                                }}
                            );
                            // props.web3.donate(d.data['_id'],d.data['_address'],489);
                        }
                    }/>);
                })}
            </div>
        </div>
    );  
}