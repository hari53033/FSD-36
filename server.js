const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './students.json';

// Helper to read student data
const readStudents = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Helper to write student data
const writeStudents = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/students', (req, res) => {
  const students = readStudents();
  res.json(students);
});

app.post('/students', (req, res) => {
  const students = readStudents();
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  writeStudents(students);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  let students = readStudents();
  const id = parseInt(req.params.id);
  students = students.map(s => s.id === id ? { ...s, ...req.body } : s);
  writeStudents(students);
  res.json({ message: 'Student updated' });
});

app.delete('/students/:id', (req, res) => {
  let students = readStudents();
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  writeStudents(students);
  res.json({ message: 'Student deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
