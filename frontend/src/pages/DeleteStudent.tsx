import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteStudent } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DeleteStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (token && id) {
      await deleteStudent(token, Number(id));
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this student?</p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default DeleteStudent;
