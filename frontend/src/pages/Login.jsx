import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    try{
    const response = await axios.post('http://localhost:8000/api/auth/login', formData)

    if(response.status === 200){
        console.log('Signup Success:', response.data);
        toast.success('Login Successful!');
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user', JSON.stringify(response.data.user)); 

        console.log("🚀 ~ handleSubmit ~ response.data.user:", response.data.user)
        window.location = '/'
    }else{
      toast.error('Login failed. Please try again.');
    }
  }catch(error){
    console.error("error", error);
    toast.error('Login failed. Please try again or account not found');
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d7ccc8] to-[#efebe9]">
      <div className="backdrop-blur-lg m-4 bg-white/80 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#4e342e] mb-2 text-center">Welcome Back!</h1>
        <p className="text-center text-[#6d4c41] mb-8 text-sm">Stay organized, track your progress, and achieve your goals efficiently.  Sign in to access your personalized dashboard and collaborate seamlessly with your team.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input type="email" name="email" placeholder="Enter your registered email" value={formData.email} onChange={handleChange} required className="p-4 rounded-xl bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#8d6e63] border-[#d7ccc8] border text-gray-700 placeholder:text-gray-400" />
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required className="p-4 rounded-xl bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#8d6e63] border-[#d7ccc8] border text-gray-700 placeholder:text-gray-400" />
          <button type="submit" className="bg-gradient-to-r cursor-pointer from-[#8d6e63] to-[#6d4c41] text-white font-bold text-lg py-3 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">Sign In</button>
          <p className="text-center text-[#5d4037] text-sm">Don't have an account yet? <Link to="/signup" className="font-semibold underline hover:text-[#6d4c41]">Create one now</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
