import './search.css';
import { Search } from '@mui/icons-material';
    
export default function SearchComponent(props){
    return(
        <div className='search'>
            <input type='text' onChange={(value)=>props.search(value.target.value)} placeholder='Do funding now'>
                
            </input>
            
            <Search style={{
                backgroundColor: 'var(--green-color)',
                color: 'white',
                fontSize: '40px',
                padding: '10px',
                borderRadius: '10px'
            }}/>
        </div>
    );
}