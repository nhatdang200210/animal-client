import React, {useState} from 'react'
import axios from 'axios';
import '../css/Auth.css'

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  

  const onSubmitHandle = async (e) => {
    try {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/v1/auth/register", {name: name, email: email, password: password});
        if(response.status === 200)
          
        alert("Đăng ký tài khoản thành công.")
        setTimeout(() => {
          window.location.reload();
        }, 500);
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  } 
  return (
    
    <section className="auth-container">
        <form onSubmit={onSubmitHandle} className="auth-form">
            <h2>Đăng ký tài khoản của bạn</h2>
            <div className="error-message">{errorMessage && `Error: ${errorMessage}`}</div>
        <input type="text"
          required 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} />
        <input type="email"
          required 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} />

        <input
            type="password"
            required
            placeholder="Password"
            pattern=".{4,}"
            title="Mật khẩu phải nhiều hơn 4 ký tự"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
            <button className="bnt" type="submit">Register</button>
            
            
        </form>
    </section>
  )
}
