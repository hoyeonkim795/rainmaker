import React, {useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const ToDoItem = ({ index, id, moveCard, todoItem, todoList, setTodoList }) => {

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TodoItem,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect(); // rendering 된 사각형에 값을 받아옴.
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; //다른 컴포넌트의 높이값 절반 이상일때
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TodoItem,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className="todoapp__item">

            {/* 아이템 내용 */}
            <span className="todoapp__item-ctx">{todoItem.value.label}</span>
            {/* 수정 버튼 */}
            <button type="button" className="todoapp__item-edit-btn">
                ✏
            </button>
            {/* 삭제 버튼 */}
            <button type="button" className="todoapp__item-delete-btn">
                🗑
            </button>
        </li>
    );
};

ToDoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.object.isRequired,
    }),
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.object.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;