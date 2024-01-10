import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Menu from './Menu';
import { Card} from '@material-ui/core';
// import Lock from '@material-ui/icons/Lock'
import '../css/ListUser.css'

export default function ListUser() {
    const [listUser, setListUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [tongUser, setTongUser] = useState(0);

    useEffect(() => {
        const dataUser = async () =>{
            try {
              const response = await axios.get('http://localhost:3001/api/v1/auth/users');
              const savedTThai = {}; //đọc trạng thái lưu

              Object.keys(localStorage).forEach(key => {
                if (key.startsWith('user_')) {
                    const userId = key.split('_')[1];
                    savedTThai[userId] = localStorage.getItem(key) === 'true';
                }
              })

              const updateUser = response.data.map(user => {
                if (savedTThai[user._id] !== undefined){
                  return {...user, locked: savedTThai[user._id]}
                }
                return user;
              })
              
              setListUser(updateUser);
              setTongUser(response.data.length); //Tong so luong user
            } catch (error) {
                setErrorMessage('error');
                console.error("Lỗi lấy danh sách");
            }
        };

        dataUser();
    }, []);

    //thiết lập trạng thái khoá
  const handleLock = async (userId, isLocked) => {
    try {
        if (isLocked) {
            await axios.put(`http://localhost:3001/api/v1/auth/users/${userId}/unlock`);
        } else {
            await axios.put(`http://localhost:3001/api/v1/auth/users/${userId}/lock`);
        }

        // Cập nhật lại trạng thái của người dùng trong danh sách
        const updatedUsers = listUser.map(user => {
            if (user._id === userId) {
                return { ...user, locked: !isLocked };
            }
            return user;
        });

        setListUser(updatedUsers);
    } catch (error) {
        console.error('Lỗi khi thực hiện khoá/mở khoá:', error);
    }
};

  return (
    <div>
      <Menu />
      <h2 style={{color:"blueviolet", textAlign:"center", padding:"2rem"}}>Danh sách người dùng</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <h3 style={{paddingLeft:"70%"}}>Tổng tài khoản: {tongUser}</h3>
      <ul>
        {listUser.map((user) => (
          <li key={user._id}>
            <Card style={{margin:"1.5rem", padding:"1rem 2rem" }}>
              {/* {user.locked ? (
                <button onClick={() => handleLock(user._id, user.locked)} style={{ backgroundColor: user.locked ? "red" :"inherit", color:"white"}} className='button-mokhoa'>
                  Mở khoá
                </button>
              ) : (
                <button onClick={() =>handleLock(user._id, user.locked)} className='button-khoa' >
                  Khoá
                </button>
              )} */}

              <button
                onClick={() => handleLock(user._id, user.locked)}
                style={{
                  backgroundColor: user.locked ? "red" : "green",
                  color: "white"
                }}
                className='button-mokhoa'
              >
                {user.locked ? "Mở khoá" : "Khoá"}
              </button>

              <p style={{color:"blue", padding:"5px 0", fontSize:"20px"}}>{user.name}</p>
              <p>Email: {user.email}</p>
              
            </Card>

          </li>
        ))}
      </ul>
    </div>
  )
}
