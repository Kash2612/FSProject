import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, updateStudent } from '../utils/api';
import { useAuth } from '../context/AuthContext';


const UpdateStudent=() => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '', enrolled_date: '' });

  useEffect(() => {
    const loadStudent = async () => {
      if (token && id) {
        const studentData = await fetchStudentById(token, id);
        setStudent(studentData);
      }
    };
    loadStudent();
  }, [token, id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (token && id) {
      await updateStudent(token, Number(id), student);
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>
        Name:
        <input
          type="text"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />
      </label>
      <label>
        Enrolled Date:
        <input
          type="date"
          value={student.enrolled_date}
          onChange={(e) => setStudent({ ...student, enrolled_date: e.target.value })}
        />
      </label>
      <button type="submit">Update Student</button>
    </form>
  );
};

export default UpdateStudent;
