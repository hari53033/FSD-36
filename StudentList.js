import React from 'react';

function StudentList({ students, onStudentChanged }) {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, { method: 'DELETE' });
      onStudentChanged();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>
          {student.name} ({student.age}) - {student.email}
          <button onClick={() => handleDelete(student.id)} style={{ marginLeft: '10px' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default StudentList;
