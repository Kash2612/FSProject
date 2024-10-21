import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById, updateCourse } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const UpdateCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ name: '', description: '' });

  useEffect(() => {
    const loadCourse = async () => {
      if (token && id) {
        const courseData = await fetchCourseById(token, id);
        setCourse(courseData);
      }
    };
    loadCourse();
  }, [token, id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (token && id) {
      await updateCourse(token, Number(id), course);
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>
        Name:
        <input
          type="text"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </label>
      <button type="submit">Update Course</button>
    </form>
  );
};

export default UpdateCourse;
