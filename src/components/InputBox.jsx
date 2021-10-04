import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const InputBox = ({ options, todoList, setTodoList }) => { // (1)
    // const [text, setText] = useState('');
    const [value, setValue] = useState();
    // const options = [
    //     { value: "leave", label: "퇴장" },
    //     { value: "join", label: "입장" },
    //     { value: "chat", label: "채팅" },
    //     { value: "present", label: "스푼" },
    // ];

    const handleChange = useCallback((inputValue) => setValue(inputValue), []);

    // const handleCreate = useCallback(
    //     (inputValue) => {
    //         const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    //         setOptions([...options, newValue]);
    //         setValue(newValue);
    //     },
    //     [options]
    // );

    const inputRef = useRef(null);

    // input 값 가져오기
    // const onChangeInput = (e) => {
    //     setText(e.target.value);
    // };

    const onClickAddButton = () => {
        // todoItemList에 값 추가
        // const nextTodoList = todoList.concat({ // (2)
            // id: todoList.length, // (2-1)
            // value, // (2-2)
        // });
        setTodoList(prevList => ([...prevList, { id: todoList.length, value }]));

        // input 값 초기화 및 포커싱
        setValue('');
        inputRef.current.focus();
    };

    return (
        <div className="todoapp__inputbox">

            <Select
                type="text"
                name="todoItem"
                ref={inputRef}
                placeholder="청취자의 행위를 선택해주세요"
                className="todoapp__inputbox-inp"
                value={value}
                options={options}
                onChange={handleChange}
                // onCreateOption={handleCreate}
            />

            {/* 입력 후 아이템 추가 버튼 */}
            <button
                type="submit"
                className="todoapp__inputbox-add-btn"
                onClick={onClickAddButton}
            >
                추가
            </button>
        </div>
    );
};

// props 값 검증
InputBox.propTypes = {
    todoList: PropTypes.arrayOf( // (3)
        PropTypes.shape({ // (3-1)
            id: PropTypes.number.isRequired, // (3-2)
            value: PropTypes.object.isRequired, // typescript  { values : string, label: string }
        }).isRequired
    ),
    setTodoList: PropTypes.func.isRequired, // (4)
};

export default InputBox;