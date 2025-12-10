import {Link} from 'react-router-dom';
const LandingPage=()=>{
  return(
    <div className='landing'>
      <div className='overlay'>
        <h1>Welcome to the workout tracker</h1>
        <Link to="/home">
          <button className='enter-btn'>Enter App</button>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage