import React, { useState } from 'react';

function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({ name: '', age: '', email: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', age: '', email: '' });
      onStudentAdded();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" required type="number" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;