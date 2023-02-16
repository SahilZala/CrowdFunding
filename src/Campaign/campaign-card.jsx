import { Card,CardActions,CardContent,CardMedia} from "@mui/material";
import './campaign-card.css';
import { FolderOpen } from "@mui/icons-material";
import {Avatar} from "@mui/material";
export default function CampaignCard(props){
    return(
        <Card style={{
            cursor: 'pointer'
        }} className="campaign-card" sx={{ maxWidth: 330, minWidth: 330}} onClick={()=>props.onClick()}>
            <CardMedia
                className="campaign-card-image"
                component="img"
                alt="green iguana"
                height="160"
                image={props.data.data['_imageUrl'] === '' ? 'https://thumbs.dreamstime.com/b/abstract-background-polygon-colorful-vector-design-eps-41507001.jpg' : props.data.data['_imageUrl']}
            />
            <CardContent> 
                <div className="card-label">
                    <FolderOpen style={{
                        color: 'var(--grey)',
                        fontSize: '15px'
                    }}/>
                   <p className="card-label-secondary">
                        {props.data.data['_label']}
                    </p>
                </div> 
                <p className="card-label-primary">
                {props.data.data['_campaignTitle']}
                </p>
                <p className="card-label-secondary">
                {props.data.data['_story'].length < 70 ? props.data.data['_story'] : props.data.data['_story'].substring(0,70)+'...'}
                </p>
            </CardContent>
            <CardActions 
                style={{
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    
                }}
            >
                <div className="card-action-left">
                    <p className="primary">WEI {props.data.donations}</p>
                    <p className="secondary">Raised of {props.data.data['_goal']}</p>
                </div>
                <div className="card-action-left">
                <p className="primary">{props.data.totalDonar}</p>
                    <p className="secondary">Total Doners</p>
                </div>
                
               
            </CardActions>
            <br/>
                <div className="created-by">    
                <Avatar style={{
                        height: '20px',
                        width: '20px',
                        backgroundColor: 'var(--light-grey)'
                    }}/><p><spam>by</spam> {props.data.data['_name']}</p>
                </div>
                <br/>
        </Card>
    );
}