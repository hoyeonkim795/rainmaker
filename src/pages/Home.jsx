import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import UserInputBox from '../components/UserInputBox';
import ToDoItemList from '../components/ToDoItemList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DEFAULT_USERS = {
  A: {
    label: 'A',
    todoList: [],
  },
  B: {
    label: 'B',
    todoList: [],
  },
  C: {
    label: 'C',
    todoList: [],
  },
  D: {
    label: 'D',
    todoList: [],
  },
}

const commands = [
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
];

const Home = () => {
    const [users, setUsers] = useState(DEFAULT_USERS)
    const [seletedUser, setSelectedUser] = useState(DEFAULT_USERS['A'])
    const [todoList, setTodoList] = useState(seletedUser.todoList);
    
    return (
        <div className="homepage__container">
            {/* 청취자 Type 선택 */}
            <UserInputBox users={users} setSelectedUser={setSelectedUser} />

            {/* ToDo Item을 추가할 수 있는 input 박스 */}
            <InputBox options={commands} todoList={todoList} setTodoList={setTodoList} />

            {/* 할 일 Item 리스트 */}
            <DndProvider backend={HTML5Backend}>
            <ToDoItemList    // (1)
                title={'시나리오'}
                todoList={todoList}
                setTodoList={setTodoList}
            />
            </DndProvider>
            {/* 완료한 Item 리스트 */}
            <ToDoItemList />
        </div>
    );
};

export default Home;