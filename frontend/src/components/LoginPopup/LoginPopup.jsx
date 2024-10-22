import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
  const {url,setToken}=useContext(StoreContext)
  const [currState,setCurrState]=useState('Login')
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler=(event)=>{
    const name= event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onLogin =async(event)=>{
   event.preventDefault()// Ngăn chặn hành động mặc định của form khi submit, thường là refresh lại trang.
   let newUrl=url;
   if(currState==='Login'){
    newUrl +="/api/user/login"
   }
   else{
    newUrl +="/api/user/register"
   }
   //token Biến trạng thái token được sử dụng để lưu trữ mã xác thực (authentication token) sau khi người dùng đăng nhập thành công
    const response= await axios.post(newUrl,data);
    if (response.data.success) {
     setToken(response.data.token)//ợc lưu trữ trong local storage và state của component (setToken)
     localStorage.setItem("token",response.data.token);// được sử dụng để lưu trữ token của người dùng vào localStorage trên trình duyệt.
     // cửa sổ đăng nhập sẽ đóng lại bằng cách gọi setShowLogin(false).
     setShowLogin(false)

      
    }else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
        {currState==="Login"?<></>:
          <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="emal" placeholder='Your Mail' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />


        </div>
        <button type='submit'>{currState==='Sign Up'?"Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuting ,i agree to the terms of use & privacy policy</p>
      </div>
      {currState==="Login"?( <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>):(
                        <p>Already have a an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>)}
     
      
      </form>
    </div>
  )
}

export default LoginPopup
