import React from 'react'
import '../css/Menu.css'
import { Link } from 'react-router-dom'

export default function Menu() {
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  return (
    <section className="menu">
    <nav>
        <ul className="main-nav">
            <button className="menu-buton">
            <li><Link to = '/'>HOME</Link></li>
            </button>
            <button className="menu-buton">
                <li><Link to = '/news'>NEWS</Link></li>
            </button>
            <button className="menu-buton">
            <li><Link to = '/status'>STATUS</Link></li>
            </button>
            {isAdmin && (
            <div style={{display:"flex"}}>
              <button className="menu-buton">
                <li><Link to ='/duyet'>PENDING</Link></li>
              </button>
              <button className="menu-buton">
                <li><Link to = '/ds'>USERLIST</Link></li>
              </button>
            </div>
            )}

        </ul>
    </nav>
</section>
  )
}
