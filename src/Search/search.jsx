import './search.css';
import { Search } from '@mui/icons-material';
    
export default function SearchComponent(){
    return(
        <div className='search'>
            <input type='text' placeholder='Do funding now'>
                
            </input>
            <Search style={{
                backgroundColor: 'var(--green-color)',
                color: 'white',
                fontSize: '40px',
                padding: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
            }}/>
        </div>
    );
}