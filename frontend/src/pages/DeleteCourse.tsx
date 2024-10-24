import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCourse } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DeleteCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (token && id) {
      await deleteCourse(token, Number(id));
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this course?</p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default DeleteCourse;
