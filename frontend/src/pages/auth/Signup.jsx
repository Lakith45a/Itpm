import React ,{useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/Authlayout';
import { useNavigate,Link} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance  from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../contexts/userContext';


const Signup = () => {
  const[fullname,setFullName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    const {updateUser} = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullname){
      setError('Please enter your full name');
      return;
    }

    if(!validateEmail(email)){
          setError('Please enter a valid email address');
          return;
        }
        if(!password){
          setError('Password is required');
          return;
        }
        setError("");

        try{
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            fullname,
            email,
            password,
          });
          const { token,user } = response.data;

        if(token){
          localStorage.setItem('token', token);
          updateUser(user);
          navigate('/dashboard');
        }
      }catch (error) {
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }else{
          setError('Something went wrong. Please try again later.');
        }
      }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your information
        </p>
        <form onSubmit={handleSignup} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
             value={fullname}
             onChange={({target})=>setFullName(target.value)}
             label="Full Name"
             type="text"
             placeholder="John Doe"
            />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="col-span-2">
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          
          </div>
               {error && <p className="text-red-500 text-xs">{error}</p>}
               
                         <button
                           type="submit"
                           className="btn-primary"
                         >
                           Sign Up
                         </button>
                         <p className='text-[13px] text-slate-800 mt-3'>
                           Have an account?{' '}
                           <Link className='font-medium text-primary unserline' to='/login'>  
                            login
                           </Link>
                         </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
