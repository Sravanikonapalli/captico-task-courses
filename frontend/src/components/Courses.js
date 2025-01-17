import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', instructor: '' });
  const [editCourse, setEditCourse] = useState(null); // State for editing a course

  const fetchCourses = async () => {
    try {
                               //url to fetch course details from backend
      const response = await axios.get('http://localhost:5000/api/courses');  
      setCourses(response.data);
    } catch (err) {
      alert('Error fetching courses');
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editCourse) {
        await axios.put(`http://localhost:5000/api/courses/${editCourse._id}`, newCourse, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/courses', newCourse, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCourses();
      setNewCourse({ name: '', description: '', instructor: '' }); // Reset form after adding/editing
      setEditCourse(null); // Reset the edit mode
    } catch (err) {
      alert('Error adding or editing course');
    }
  };

  const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (err) {
      alert('Error deleting course');
    }
  };

  const handleEdit = (course) => {
    setNewCourse({ name: course.name, description: course.description, instructor: course.instructor });
    setEditCourse(course);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
        <Link to="/login" className='link'>
        <button type="button" className='logout-btn'>Logout</button>
        </Link>
      <h2>Courses</h2>
      <form onSubmit={addCourse} className="course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Instructor"
          value={newCourse.instructor}
          onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
        />
        <button type="submit">{editCourse ? 'Edit Course' : 'Add Course'}</button>
      </form>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td className='data'>{course.name}</td>
              <td className='data'>{course.description}</td>
              <td className='data'>{course.instructor}</td>
              <td className='btns'>
                <button onClick={() => handleEdit(course)} className="edit-btn">Edit</button>
                <button onClick={() => deleteCourse(course._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
