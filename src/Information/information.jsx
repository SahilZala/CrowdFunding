import './information.css'; 
export default function Information(){
    return(
        <section className='info-container'>
            <div>
                <p className='sub'>developed by-</p>
                <p className='main'>SAHIL ZALA</p>
            </div>
            
            <div className='contact-container'>
                <a href="https://github.com/SahilZala/"><img alt='github' src='https://cdn-icons-png.flaticon.com/512/25/25231.png'></img></a>
                <a href="https://leetcode.com/zala4011/"><img alt='leetcode' src='https://cdn.iconscout.com/icon/free/png-256/leetcode-3628885-3030025.png'></img></a>
                <a href="https://www.linkedin.com/in/sahil-zala-3b1981170/"><img alt='linkedin' src='https://cdn-icons-png.flaticon.com/512/145/145807.png'></img></a>
            </div>
        </section>
    );
}