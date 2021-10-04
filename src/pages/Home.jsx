import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import ToDoItemList from '../components/ToDoItemList';

const users = [
    {
        todoList: [],
        label: 'A'
    },
    {
        todoList: [],
        label: 'B',
    },
    {
        todoList: [],
        label: 'C',
    },
    {
        todoList: [],
        label: 'D',
    }
]

const commands = [
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
];

const Home = () => {
    const [todoList, setTodoList] = useState([]);
    const [user, setUser] = useState(users[0])
    return (
        <div className="homepage__container">
            {/* 청취자 Type 선택 */}
            {/*<InputBox options={users} user={todoList} setTodoList={setTodoList} />*/}

            {/* ToDo Item을 추가할 수 있는 input 박스 */}
            <InputBox options={commands} todoList={todoList} setTodoList={setTodoList} />

            {/* 할 일 Item 리스트 */}
            <ToDoItemList    // (1)
                title={'시나리오'}
                todoList={todoList}
                setTodoList={setTodoList}
            />

            {/* 완료한 Item 리스트 */}
            <ToDoItemList />
        </div>
    );
};

export default Home;