import React, {useState} from 'react'
import axios from 'axios';
import '../css/Auth.css'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()

  const onSubmitHandle = async (e) => {
    try {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/v1/auth/login", { email: email, password: password});

        if(response.status === 200){
          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('name', response.data.name)  
          localStorage.setItem('role', response.data.role)  

           // Kiểm tra trạng thái khoá/mở khoá sau khi đăng nhập
           if (response.data.locked) {
            setErrorMessage('Tài khoản của bạn đã bị khoá.');
          } else {
            navigate('/')
          }
        }
    } catch (error) {
        setErrorMessage(error.response.data.message);
        
    }
  } 
  return (
    
    <section className="auth-container">
        <form onSubmit={onSubmitHandle} className="auth-form">
            <h2>Đăng nhập tài khoản của bạn</h2>
            {errorMessage  && <div className="error-message">Error: {errorMessage}</div>}
        <input type="email"
          required 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} />

        <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
            <button className="bnt" type="submit">Login</button>
        </form>
    </section>
  )
}
