import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Home from './pages/Home';
import UserInputBox from './components/UserInputBox'

const DEFAULT_USERS = [
  {
    label: 'A',
    todoList: [],
  },
  {
    label: 'B',
    todoList: [],
  },
  {
    label: 'C',
    todoList: [],
  },
  {
    label: 'D',
    todoList: [],
  },
]

const App = () => {
  const [user, setUser] = useState(DEFAULT_USERS[0])
  const setList = list => {
    setUser(prev => ({
      ...prev,
      todoList: list
    }))
  }

  return (
    <div>
      <UserInputBox users={DEFAULT_USERS} user={user} setUser={setUser} />
      <Home list={user.todoList} setList={list => setList(list)} />
    </div>
  )
}

export default App;
