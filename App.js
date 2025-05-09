import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h2>Student Management</h2>
      <StudentForm onStudentAdded={fetchStudents} />
      <StudentList students={students} onStudentChanged={fetchStudents} />
    </div>
  );
}

export default App;