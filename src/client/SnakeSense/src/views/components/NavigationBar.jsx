import './styles/menu.css'
import { Link } from 'react-router-dom';

function NavigationBar() {
 return (
   <div className="menu">
     <div className="logo-container">
       <img src="./src/views/assets/images/Rattlesnake.png" alt="Logo" />
       <p>Snake Sense</p>
     </div>

     <div className="points-container">
       <Link
         to="/dashboard"
         className={`point ${
           location.pathname === "/dashboard" ? "active" : ""
         }`}
       >
         <img src="./src/views/assets/images/iMac.png" alt="Главная" />
         <p>Главная</p>
       </Link>
       <Link
         to="/sensors"
         className={`point ${location.pathname === "/sensors" ? "active" : ""}`}
       >
         <img
           src="./src/views/assets/images/Laptop Settings.png"
           alt="Датчики"
         />
         <p>Датчики</p>
       </Link>
       <div
         className={`point ${
           location.pathname === "/notifications" ? "active" : ""
         }`}
       >
         <img src="./src/views/assets/images/Error.png" alt="Уведомления" />
         <p>Уведомления</p>
       </div>
       <div
         className={`point ${
           location.pathname === "/notifications" ? "active" : ""
         }`}
       >
         <img src="./src/views/assets/images/Staff.png" alt="Персонал" />
         <p>Персонал</p>
       </div>
       <div
         className={`point ${
           location.pathname === "/notifications" ? "active" : ""
         }`}
       >
         <img src="./src/views/assets/images/Puzzle Matching.png" alt="API" />
         <p>API</p>
       </div>
     </div>
   </div>
 );
}

export default NavigationBar;