import { Link } from "react-router-dom";
import '../styles/styles.css'
const MainSection = () => (
  <div className="main">
    <div className="main-section">
    <h3>Manage Your Courses</h3>
    <p className="intro-text">
      "Welcome! Before you start, please log in to access your courses. Once you're logged in, 
      we can add, edit and delete the courses."
    </p>
    <p className="sub-text">Take control of your learning path by managing your courses. Ready to get started?</p>
    <Link to="/login">
      <button type="button" className="btn-primary h-btn">Get Started</button>
    </Link>   
   <Link to="/courses">
      <button type="button" className="btn-primary">courses</button>
    </Link>
    </div>
    
  </div>
);

export default MainSection;
