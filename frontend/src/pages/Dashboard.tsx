// import React, { useState} from 'react';
// import {
//   fetchStudents,
//   createStudent,
//   updateStudent,
//   deleteStudent,
//   fetchCourses,
//   createCourse,
//   updateCourse,
//   deleteCourse,
// } from '../utils/api'; 
// import { useAuth } from '../context/AuthContext'; 
// import './Dashboard.css';


// const Dashboard: React.FC = () => {
//   const { token } = useAuth(); 


//   const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);
//   const [isCourseSectionOpen, setIsCourseSectionOpen] = useState(false);
//   const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);
//   const [isStudentDetailsOpen, setIsStudentDetailsOpen] = useState(false);
//   const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
//   const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({ name: '', email: '', enrolled_date: '' });
//   const [newCourse, setNewCourse] = useState({ name: '', description: '', students: [] });
//   const [students, setStudents] = useState<any[]>([]);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   console.log("Auth Token:", token);


//   // Fetch students
//   const loadStudents = async () => {
//     if (!token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchStudents(token);
//       console.log("Students fetched from backend:", data); 
//       setStudents(data);
//     } catch (error) {
//       setError("Failed to fetch students.");
//       console.error("Error fetching students:", error); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch courses
//   const loadCourses = async () => {
//     if (!token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchCourses(token);
//       console.log("Courses fetched from backend:", data);  
//       setCourses(data);
//     } catch (error) {
//       setError("Failed to fetch courses.");
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (isCourseOpen) {
//   //     loadStudents(); // Load students when course form opens
//   //   }
//   // }, [isCourseOpen]);

//   const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!token) return;
//     setLoading(true);
//     try {
//       const newStudentData = await createStudent(token, newStudent);
//       console.log("Student created:", newStudentData);
//       setNewStudent({ name: '', email: '', enrolled_date: '' }); 
//       setIsStudentFormOpen(false); 
//     } catch (error) {
//       setError("Failed to create student.");
//       console.error("Error creating student:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleCreateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!token) return;
//     setLoading(true);
//     try {
//       const newCourseData = await createCourse(token, newCourse);
//       console.log("Course created:", newCourseData);
//       setNewCourse({ name: '', description: '', students: [] }); 
//       setIsCourseFormOpen(false);
//     } catch (error) {
//       setError("Failed to create course.");
//       console.error("Error creating course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStudent = async (id: number) => {
//     if (!token) return;
//     const studentToUpdate = students.find(student => student.id === id);
//     if (!studentToUpdate) {
//       setError("Student not found.");
//       return;
//     }
  
//     const newName = prompt("Enter new name for the student:", studentToUpdate.name);
//     const newEmail = prompt("Enter new email for the student:", studentToUpdate.email);
//     const newEnrolledDate = prompt("Enter new enrolled date for the student:", studentToUpdate.enrolled_date);

//     if (newName !== studentToUpdate.name || newEmail !== studentToUpdate.email || newEnrolledDate !== studentToUpdate.enrolled_date) {
//       setLoading(true);
//       try {
//         await updateStudent(token, id, {
//           name: newName,
//           email: newEmail,
//           enrolled_date: newEnrolledDate,
//         });
//         await loadStudents(); 
//       } catch (error) {
//         setError("Failed to update student.");
//         console.error("Error updating student:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
  

//   const handleUpdateCourse = async (id: number) => {
//     if (!token) return;
  
//     const courseToUpdate = courses.find(course => course.id === id);
//     if (!courseToUpdate) {
//       setError("Course not found.");
//       return;
//     }

//     const newName = prompt("Enter new name for the course:", courseToUpdate.name);
//     const newDescription = prompt("Enter new description for the course:", courseToUpdate.description);
 
//     if (newName !== courseToUpdate.name || newDescription !== courseToUpdate.description) {
//       setLoading(true);
//       try {
      
//         await updateCourse(token, id, {
//           name: newName,
//           description: newDescription,
//         });
//         await loadCourses(); 
//       } catch (error) {
//         setError("Failed to update course.");
//         console.error("Error updating course:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };


// const handleDeleteStudent = async (id: number) => {
//   if (!token) return;
//   const confirmDelete = window.confirm(`Are you sure you want to delete the student with ID ${id}?`);
//   if (confirmDelete) {
//     setLoading(true);
//     try {
//       await deleteStudent(token, id);
//       console.log("Student deleted with ID:", id); 
//       await loadStudents(); 
//     } catch (error) {
//       setError("Failed to delete student.");
//       console.error("Error deleting student:", error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };


// const handleDeleteCourse = async (id: number) => {
//   if (!token) return;
//   const confirmDelete = window.confirm(`Are you sure you want to delete the course with ID ${id}?`);
//   if (confirmDelete) {
//     setLoading(true);
//     try {
//       await deleteCourse(token, id);
//       console.log("Course deleted with ID:", id); 
//       await loadCourses(); 
//     } catch (error) {
//       setError("Failed to delete course.");
//       console.error("Error deleting course:", error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };


//   const toggleStudentForm = () => {
//     setIsStudentFormOpen(!isStudentFormOpen);
//     setIsStudentDetailsOpen(false); 
//   };

//   const toggleStudentDetails = () => {
//     setIsStudentDetailsOpen(!isStudentDetailsOpen);
//     setIsStudentFormOpen(false); 
//     if (!isStudentDetailsOpen) loadStudents(); 
//   };


//   const toggleCourseForm = () => {
//     setIsCourseFormOpen(!isCourseFormOpen);
//     setIsCourseDetailsOpen(false); 
//   };

//   const toggleCourseDetails = () => {
//     setIsCourseDetailsOpen(!isCourseDetailsOpen);
//     setIsCourseFormOpen(false);
//     if (!isCourseDetailsOpen) loadCourses(); 
//   };


//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>

//       {/* Student Section */}
//       <button onClick={() => setIsStudentSectionOpen(!isStudentSectionOpen)} className="btn">
//         Student
//       </button>

//       {isStudentSectionOpen && (
//         <div className="student-section">
//           <button onClick={toggleStudentForm} className="btn">
//             Add Student
//           </button>

//           <button onClick={toggleStudentDetails} className="btn">
//             Get Student Details
//           </button>

//           {isStudentFormOpen && (
//             <form onSubmit={handleCreateStudent} className="form">
//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   value={newStudent.name}
//                   onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//                   required
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   value={newStudent.email}
//                   onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
//                   required
//                 />
//               </label>
//               <label>
//                 Enrolled Date:
//                 <input
//                   type="date"
//                   value={newStudent.enrolled_date}
//                   onChange={(e) => setNewStudent({ ...newStudent, enrolled_date: e.target.value })}
//                   required
//                 />
//               </label>
//               <button type="submit" className="btn">
//                 Create Student
//               </button>
//             </form>
//           )}

//           {isStudentDetailsOpen && (
//             <div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Enrolled Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student.id}>
//                       <td>{student.id}</td>
//                       <td>{student.name}</td>
//                       <td>{student.email}</td>
//                       <td>{student.enrolled_date}</td>
//                       <td>
//                         <button onClick={() => handleUpdateStudent(student.id)} className="btn">
//                           Update
//                         </button>
//                         <button onClick={() => handleDeleteStudent(student.id)} className="btn">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Course Section */}
//       <button onClick={() => setIsCourseSectionOpen(!isCourseSectionOpen)} className="btn">
//         Course
//       </button>

//       {isCourseSectionOpen && (
//         <div className="course-section">
//           <button onClick={toggleCourseForm} className="btn">
//             Add Course
//           </button>

//           <button onClick={toggleCourseDetails} className="btn">
//             Get Course Details
//           </button>

//           {isCourseFormOpen && (
//             <form onSubmit={handleCreateCourse} className="form">
//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   value={newCourse.name}
//                   onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
//                   required
//                 />
//               </label>
//               <label>
//                 Description:
//                 <input
//                   type="text"
//                   value={newCourse.description}
//                   onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
//                   required
//                 />
//               </label>
//               <label>
//                 Students (IDs, comma-separated):
//                 <input
//                   type="text"
//                   value={newCourse.students.join(',')}
//                   onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value.split(',').map(s => s.trim()) })}
//                 />
//               </label>
//               <button type="submit" className="btn">
//                 Create Course
//               </button>
//             </form>
//           )}

//           {isCourseDetailsOpen && (
//             <div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Description</th>
//                     <th>Students</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {courses.map((course) => (
//                     <tr key={course.id}>
//                       <td>{course.id}</td>
//                       <td>{course.name}</td>
//                       <td>{course.description}</td>
//                       <td>{course.students.join(', ')}</td>
//                       <td>
//                         <button onClick={() => handleUpdateCourse(course.id)} className="btn">
//                           Update
//                         </button>
//                         <button onClick={() => handleDeleteCourse(course.id)} className="btn">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {loading && <div>Loading...</div>}
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';

import {
  fetchStudents,
  updateStudent,
  deleteStudent,
  fetchCourses,
  updateCourse,
  deleteCourse,
} from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);
  const [isCourseSectionOpen, setIsCourseSectionOpen] = useState(false);
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<any>(null); 
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [studentToDelete, setStudentToDelete] = useState<any>(null); 
  const [courseToDelete, setCourseToDelete] = useState<any>(null); 

  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadStudents();
      loadCourses();
    }
  }, [token]);

  const loadStudents = async () => {
    if (!token) return; // Early return if token is null
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents(token);
      setStudents(data);
    } catch (error) {
      setError('Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    if (!token) return; // Early return if token is null
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourses(token);
      setCourses(data);
    } catch (error) {
      setError('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = (student: any) => {
    setSelectedStudent(student); 
    setIsStudentFormOpen(true); 
  };

  const handleUpdateCourse = (course: any) => {
    setSelectedCourse(course); 
    setIsCourseFormOpen(true); 
  };

  // Open delete confirmation modal for student
  const handleDeleteStudentClick = (student: any) => {
    setStudentToDelete(student);
  };

  // Open delete confirmation modal for course
  const handleDeleteCourseClick = (course: any) => {
    setCourseToDelete(course);
  };

  // Confirm student deletion
  const handleConfirmDeleteStudent = async () => {
    if (!token || !studentToDelete) return;
    setLoading(true);
    try {
      await deleteStudent(token, studentToDelete.id);
      setStudentToDelete(null); 
      loadStudents(); 
    } catch (error) {
      setError('Failed to delete student.');
    } finally {
      setLoading(false);
    }
  };

  // Confirm course deletion
  const handleConfirmDeleteCourse = async () => {
    if (!token || !courseToDelete) return;
    setLoading(true);
    try {
      await deleteCourse(token, courseToDelete.id);
      setCourseToDelete(null); 
      loadCourses(); 
    } catch (error) {
      setError('Failed to delete course.');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent && token) {
      setLoading(true);
      try {
        await updateStudent(token, selectedStudent.id, selectedStudent);
        setIsStudentFormOpen(false); 
        loadStudents(); 
      } catch (error) {
        setError('Failed to update student.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && token) {
      setLoading(true);
      try {
        await updateCourse(token, selectedCourse.id, selectedCourse);
        setIsCourseFormOpen(false); 
        loadCourses(); 
      } catch (error) {
        setError('Failed to update course.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Student Section */}
      <button onClick={() => setIsStudentSectionOpen(!isStudentSectionOpen)} className="btn">
        Student
      </button>

      {isStudentSectionOpen && (
        <div className="student-section">
          <button onClick={() => loadStudents()} className="btn">
            Get Student Details
          </button>

          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Enrolled Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.enrolled_date}</td>
                    <td>
                      <button onClick={() => handleUpdateStudent(student)} className="btn">
                        Update
                      </button>
                      <button onClick={() => handleDeleteStudentClick(student)} className="btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Update Form */}
      {isStudentFormOpen && selectedStudent && (
        <div className="modal">
          <form onSubmit={handleStudentSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                value={selectedStudent.name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedStudent.email}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
              />
            </label>
            <label>
              Enrolled Date:
              <input
                type="date"
                value={selectedStudent.enrolled_date}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, enrolled_date: e.target.value })
                }
              />
            </label>
            <button type="submit" className="btn">Update Student</button>
          </form>
        </div>
      )}

      {/* Student Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this student?</h2>
            <p>{studentToDelete.name}</p>
            <button onClick={handleConfirmDeleteStudent} className="btn">Yes, Delete</button>
            <button onClick={() => setStudentToDelete(null)} className="btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Course Section */}
      <button onClick={() => setIsCourseSectionOpen(!isCourseSectionOpen)} className="btn">
        Course
      </button>

      {isCourseSectionOpen && (
        <div className="course-section">
          <button onClick={() => loadCourses()} className="btn">
            Get Course Details
          </button>

          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>
                      <button onClick={() => handleUpdateCourse(course)} className="btn">
                        Update
                      </button>
                      <button onClick={() => handleDeleteCourseClick(course)} className="btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Update Form */}
      {isCourseFormOpen && selectedCourse && (
        <div className="modal">
          <form onSubmit={handleCourseSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                value={selectedCourse.name}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={selectedCourse.description}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
              />
            </label>
            <button type="submit" className="btn">Update Course</button>
          </form>
        </div>
      )}

      {/* Course Delete Confirmation Modal */}
      {courseToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this course?</h2>
            <p>{courseToDelete.name}</p>
            <button onClick={handleConfirmDeleteCourse} className="btn">Yes, Delete</button>
            <button onClick={() => setCourseToDelete(null)} className="btn">Cancel</button>
          </div>
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Dashboard;


