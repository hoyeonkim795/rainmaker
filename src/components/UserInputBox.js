import React, { useCallback } from 'react'
import Select from 'react-select'

const UserInputBox = ({ users, setSelectedUser }) => {
  const handleChange = useCallback((inputValue) => setSelectedUser(inputValue), [])
  return (
    <div className="todoapp__inputbox">
      <Select
        type="text"
        name="todoItem"
        placeholder="청취자 타입을 선택해주세요"
        className="todoapp__inputbox-inp"
        options={Object.keys(users).map(user => ({ label: user }))}
        onChange={handleChange}
      />
    </div>
  )
}

export default UserInputBox