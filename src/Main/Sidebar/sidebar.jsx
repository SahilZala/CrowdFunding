import { Notifications, Dashboard, Info, Logout} from '@mui/icons-material';
import { Campaign } from '@mui/icons-material';
import Logo from '../../Logo/logo';
import SideButton from './SideButton/sidebutton';
import './sidebar.css';
export default function Sidebar(props){
    return(
        <div className='sidebar'>
            <div style={{
                flex: '2'
            }} className='header'>
                <Logo/>
            </div>
            <div style={{
                flex: '3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                
            }} className='middle'>
                <SideButton onClick={()=>props.setMainComponent(0)} icon={<Dashboard style={{
                    fontSize: '30px',
                    color: props.index === 0 ? 'var(--green-color)' : 'var(--light-grey)',
                    cursor: 'pointer'
                }}/>}/>
                <SideButton onClick={()=>props.setMainComponent(1)} icon={<Campaign style={{
                    fontSize: '30px',
                    color: props.index === 1 ? 'var(--green-color)' : 'var(--light-grey)',
                    cursor: 'pointer'
                }}/>}/>
               
                <SideButton onClick={()=>props.setMainComponent(2)} icon={<Notifications style={{
                    fontSize: '30px',
                    color: props.index === 2 ? 'var(--green-color)' : 'var(--light-grey)',
                    cursor: 'pointer'
                }}/>}/>
                <SideButton onClick={()=>props.setMainComponent(3)} icon={<Info style={{
                    fontSize: '30px',
                    color: props.index === 3 ? 'var(--green-color)' : 'var(--light-grey)',
                    cursor: 'pointer'
                }}/>}/>
            </div>  

            <div style={{
                display: 'flex',
                flex: '3',
                alignItems: 'end'
                
            }} className='middle'>
                <SideButton onClick={()=>props.setMainComponent(4)} icon={<Logout style={{
                    fontSize: '30px',
                    color: props.index === 4 ? 'var(--green-color)' : 'var(--light-grey)',
                    cursor: 'pointer'
                }}/>}/>
               
            </div>
        </div>
    );
}