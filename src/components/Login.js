import { signInWithGoogle } from '../service/firebase';
import {GoogleButton} from 'react-google-button'

import '../App.css';



const Login = () => {
  return (
    <div>
      <GoogleButton className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i></GoogleButton>
    </div>
  )
}

export default Login;