import axios from 'axios';

const API_URL = 'http://localhost:8000/api/students/'; 
const COURSE_API_URL = 'http://localhost:8000/api/courses/'; 

interface StudentData {
    name: string;
}

interface CourseData {
    name: string;
}

// Student API
export const fetchStudents = async (token: string) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const createStudent = async (token: string, studentData: StudentData) => {
    const response = await axios.post(API_URL, studentData, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const updateStudent = async (token: string, id: number, studentData: StudentData) => {
    const response = await axios.put(`${API_URL}${id}/`, studentData, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const deleteStudent = async (token: string, id: number) => {
    await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Token ${token}` },
    });
};

// Course API
export const fetchCourses = async (token: string) => {
    const response = await axios.get(COURSE_API_URL, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const createCourse = async (token: string, courseData: CourseData) => {
    const response = await axios.post(COURSE_API_URL, courseData, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const updateCourse = async (token: string, id: number, courseData: CourseData) => {
    const response = await axios.put(`${COURSE_API_URL}${id}/`, courseData, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const deleteCourse = async (token: string, id: number) => {
    await axios.delete(`${COURSE_API_URL}${id}/`, {
        headers: { Authorization: `Token ${token}` },
    });
};


interface Student {
    id: number;
    name: string;
    // Add other student properties as per your Student model
  }
  
export const fetchStudentById = async (id: number, token: string): Promise<Student | null> => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
  
      const contentType = response.headers.get('content-type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data as Student; // Ensure the response is typed as a Student
      } else {
        const errorText = await response.text();
        console.error('Non-JSON response:', errorText);
        throw new Error('Received non-JSON response from server');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };
  
  
  
  // Fetch single course by ID
  export const fetchCourseById = async (token: string, id: string) => {
    const response = await fetch(`/api/courses/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return await response.json();
  };
  
  