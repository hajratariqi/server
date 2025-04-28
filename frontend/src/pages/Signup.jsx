import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    try{
    const response = await axios.post('http://localhost:8000/api/auth/signup', formData)

    if(response.status === 201){
        console.log('Signup Success:', response.data);
        toast.success('Login Successful!');
        
        if(response.data){
          localStorage.setItem('token', response.data.token); 
          localStorage.setItem('user', JSON.stringify(response.data.user)); 
          window.location = '/'
        }
        console.log("🚀 ~ handleSubmit ~ response.data.user:", response.data.user)

    }else{
      toast.error('Login failed. Please try again.');
    }
  }catch(error){
    console.errror("error", error);
    toast.error('Login failed. Please try again.');
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d7ccc8] to-[#efebe9]">
    <div className="backdrop-blur-lg m-4  bg-white/80 p-10 rounded-3xl shadow-2xl w-full max-w-lg">
      <h1 className="text-4xl font-extrabold text-[#4e342e] mb-2 text-center">Create Account</h1>
      <p className="text-center text-[#6d4c41] mb-8 text-sm">Organize your tasks, collaborate with your team, and achieve goals faster. Let's get you started!</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required className="p-4 rounded-xl bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#8d6e63] border-[#d7ccc8] border text-gray-700 placeholder:text-gray-400" />
        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required className="p-4 rounded-xl bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#8d6e63] border-[#d7ccc8] border text-gray-700 placeholder:text-gray-400" />
        <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required className="p-4 rounded-xl bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#8d6e63] border-[#d7ccc8] border text-gray-700 placeholder:text-gray-400" />
        <button type="submit" className="bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] text-white font-bold text-lg py-3 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">Sign Up</button>
        <p className="text-center text-[#5d4037] text-sm">Already have an account? <Link to="/login" className="font-semibold underline hover:text-[#6d4c41]">Login</Link></p>
        <p className="text-center text-xs text-gray-400 mt-2">By creating an account, you agree to our <span className="underline cursor-pointer hover:text-[#6d4c41]">Terms</span> and <span className="underline cursor-pointer hover:text-[#6d4c41]">Privacy Policy</span>.</p>
      </form>
    </div>
  </div>
  
  );
}

export default Signup;