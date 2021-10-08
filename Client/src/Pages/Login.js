import {Button,Grid,Typography} from '@material-ui/core'
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Input from "../Components/Input/Input"
import Auth from '../Auth/Auth'
import {loginApi,registrationApi} from '../Api/index'
import styles from '../styles/login.module.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(false)
    const history=useHistory()
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    useEffect(() => {
        if(Auth.isAuthenticated()) {
          Auth.login(() => {
            history.push('/demo');
          })
        }
      },[form]);
  
    const switchMode = () => {
      setForm(initialState);
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading((prevState) => !prevState);
        if(isSignup) {
          registrationApi(form).then((response) => {
            redirectToDemoPage(response)
          })
          .catch((err) => {
            setLoading((prevState) => !prevState);
          })
        } else {
          loginApi(form).then((response) => {
            redirectToDemoPage(response)
          })
          .catch((err) => {
            setLoading((prevState) => !prevState);
          })
        }
    }

    const redirectToDemoPage = (response) => {
      setLoading((prevState) => !prevState);
      Auth.login(() => {
        history.push('/demo')       
      }, response.data.token)
    }
    
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  

    return (
        <div className={`main-container ${styles.loginRegisterContainer}`}>
            <Typography component="h1" variant="h5">{ isSignup ? 'SIGN UP' : 'SIGN IN' }</Typography>
            <form  onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                { isSignup && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                {error && <p>please enter correct password</p>}
            </Grid>
            <Button className={styles.submit} type="submit" fullWidth variant="contained" color="primary" >
                { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <Grid container justify="center">
                <Grid item>
                <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
                </Grid>
            </Grid>
            </form>
        </div>
        
    )
}

export default SignUp