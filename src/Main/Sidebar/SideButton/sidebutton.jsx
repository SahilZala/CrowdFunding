import './sidebutton.css';
export default function SideButton(props){
    return(
        <div onClick={()=>props.onClick()} className='sidebutton'>
            {props.icon}
            {/* < /> */}
        </div>
    );
}