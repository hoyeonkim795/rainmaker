import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import ToDoItemList from '../components/ToDoItemList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const commands = [
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
];

const Home = ({ list, setList }) => {
    const [todoList, setTodoList] = useState(list);
    
    useEffect(() => {
      setList(todoList)
      console.log('setList')
    })
  
    return (
        <div className="homepage__container">
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