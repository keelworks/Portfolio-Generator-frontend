/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findUserByIdThunk } from '../../services/website-thunk';
import { Container, SimpleGrid } from '@mantine/core';
import UserProfileHeader from '../header/header';
import Footer from '../footer/footer';
import ProjectCard from '../cards/ProjectCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectModal from '../projectModal/ProjectModal';

function UserPageInstructionalDesigner() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userById.user);
  const loading = useSelector((state) => state.userById.loading);

  useEffect(() => {
    if (userId) {
      dispatch(findUserByIdThunk(userId));
    }
  }, [userId, dispatch]);
    
    console.log(userId);

  const [modalOpened, setModalOpened] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState({ title: '', description: '' });

  const openProjectModal = (project) => {
    setCurrentProject(project);
    setModalOpened(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  
  const projects = [
    {
      title: 'Scenario',
      description: 'A brief description of Project One.',
      imageUrl: 'https://picsum.photos/600',
      link: 'https://ioflood.com/blog/java-classes/',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <h1>To-Do List</h1>
    <div class="todo-container">
        <input type="text" id="todo-input" placeholder="Add a new task">
        <button id="add-button">Add</button>
        <ul id="todo-list"></ul>
    </div>

    <script src="scripts/app.js"></script>
</body>
</html>`,
      css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}

h1 {
    color: #333;
}

.todo-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
    padding: 10px;
    font-size: 16px;
    width: 200px;
    margin-right: 10px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #005f5f;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background-color: #e74c3c;
    padding: 5px 10px;
}

li button:hover {
    background-color: #c0392b;
}`,
      js: `document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    addButton.addEventListener('click', () => {
        const taskText = todoInput.value;
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);

            todoInput.value = '';
        }
    });
});`,
    },
    {
      title: 'Software Simulation',
      description: 'An overview of Project Two.',
      imageUrl: 'https://picsum.photos/400',
      link: 'https://ioflood.com/blog/java-classes/',
        html: "",
      videoUrl: "/assets/video/Scuba Diving - 699.mp4"
    },
    {
      title: 'Role Over',
      description: 'Details about Project Three.',
      imageUrl: 'https://picsum.photos/600',
      link: '#',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter Example</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <h1>Counter Example</h1>
    <p>Button clicked <span id="counter">0</span> times</p>
    <button id="incrementButton">Click Me</button>

    <script src="scripts/counter.js"></script>
</body>
</html>`,
      css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}

h1 {
    color: #333;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
}

button:hover {
    background-color: #005f5f;
}

p {
    font-size: 18px;
}`,
      js: `document.addEventListener('DOMContentLoaded', (event) => {
    let counter = 0;

    const counterDisplay = document.getElementById('counter');
    const incrementButton = document.getElementById('incrementButton');

    incrementButton.addEventListener('click', () => {
        counter++;
        counterDisplay.textContent = counter;
    });
}); `,
    },
    {
      title: 'Quiz',
      description: 'What Project Four is all about.',
      imageUrl: 'https://picsum.photos/800',
      link: '#',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <h1>Quiz App</h1>
    <div class="quiz-container">
        <div id="question-container" class="hide">
            <div id="question">Question</div>
            <div id="answer-buttons" class="btn-container"></div>
        </div>
        <div class="controls">
            <button id="start-btn" class="start-btn">Start Quiz</button>
            <button id="next-btn" class="next-btn hide">Next Question</button>
        </div>
    </div>

    <script src="scripts/app.js"></script>
</body>
</html>`,
      css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}

h1 {
    color: #333;
}

.quiz-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

.controls {
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 5px;
}

button:hover {
    background-color: #005f5f;
}

.hide {
    display: none;
}

.btn-container {
    display: flex;
    flex-direction: column;
}

.btn-container button {
    margin-top: 10px;
}
`,
      js: `const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the current President of the USA?',
        answers: [
            { text: 'Joe Biden', correct: true },
            { text: 'Donald Trump', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false }
        ]
    }
];
`
    }
  ];

  return (
    <>
      <UserProfileHeader firstName={user?.firstName} resumeUrl={user?.resumeUrl} />
      <div className='container-userPage'>
        <Container size={'responsive'}
          style={{ alignItems: 'center', width: '100vw', maxWidth: '1400px' }}>

          <div className="container-userProfile">
            <div className="profile">
              <img src="https://fakeimg.pl/500/" alt="Profile" className="profile-image" />
            </div>
            <div className="content">
              <div className="section">
                <h1>Design Philosophy</h1>
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="section">
                <h1 size="lg" style={{ marginBottom: '1rem' }}>{hoveredProject.title || 'Samples Of Work'}</h1>
                <p size="sm" style={{ marginBottom: '20px', minHeight: '20px' }}>
                  {hoveredProject.description || 'Hover over a project to see its description.'}
                </p>
              </div>
            </div>
          </div>

          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: 1080, cols: 2 },
              { maxWidth: 860, cols: 1 },
              { maxWidth: 600, cols: 1 },
            ]}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                openProjectModal={openProjectModal}
                onHover={setHoveredProject}
              />
            ))}
          </SimpleGrid>

          {currentProject && (
            <ProjectModal
            project={currentProject}
            projects={projects} // Pass the entire projects array
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
          )}
        </Container>
      </div>
      <Footer firstName={user?.firstName} lastname={user?.lastname} />
    </>
  );
}

export default UserPageInstructionalDesigner;
