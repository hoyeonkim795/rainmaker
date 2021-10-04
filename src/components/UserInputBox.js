import React, { useRef, useCallback } from 'react'
import Select from 'react-select'

const UserInputBox = ({ users, user, setUser }) => {
  const inputRef = useRef(null)
  const handleChange = useCallback((inputValue) => setUser(inputValue), [])
  return (
    <div className="todoapp__inputbox">
      <Select
        type="text"
        name="todoItem"
        placeholder="청취자 타입을 선택해주세요"
        className="todoapp__inputbox-inp"
        options={users}
        ref={inputRef}
        value={user}
        onChange={handleChange}
      />
    </div>
  )
}

export default UserInputBox