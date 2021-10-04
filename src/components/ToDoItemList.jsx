import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';


const ToDoItemList = ({ title, todoList, setTodoList }) => {

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard =todoList[dragIndex];
        setTodoList(update(todoList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [todoList]);
    const renderCard = (todoItem, index) => {
        return (
            <ToDoItem
                key={todoItem.id}
                index={index}
                id={todoItem.id}
                todoItem={todoItem}
                todoList={todoList}
                setTodoList={setTodoList}
                moveCard={moveCard}
            />
            );
    };
    return(
        <div className="todoapp__list">
            {/* props로 부터 title 값을 전달 받음 */}
            <p className="todoapp__list-tit">{title}</p>

            <ul className="todoapp__list-ul">
                {todoList && // todoList가 있을때만 출력
                todoList.map((todoItem, i) => renderCard(todoItem, i)
                )}
            </ul>
        </div>
    );
}

ToDoItemList.propTypes = {
    title: PropTypes.string.isRequired,
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItemList;