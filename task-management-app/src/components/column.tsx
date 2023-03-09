import { ColumnProps } from '@/types';
import React from 'react';
import Task from '@/components/task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ index, column, tasks, isDropDisabled }: ColumnProps) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`m-2 flex flex-col rounded-sm border border-gray-300
            ${snapshot.isDragging ? 'bg-orange-400' : 'bg-inherit'}
          `}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* Column title */}
          <h1
            className={`p-2 text-2xl transition duration-200 ease-linear hover:bg-orange-400`}
            {...provided.dragHandleProps}
            data-is-dragging={snapshot.isDragging}
          >
            {column.title}
          </h1>

          {/* Task list */}
          <Droppable
            droppableId={column.id}
            // type={column.id === 'column-3' ? 'DONE' : 'ACTIVE'} // A mechanism to control where a draggable can be dropped, this is one of two and the simpler of the two. This is optional.
            isDropDisabled={isDropDisabled} // A mechanism to control where a draggable can be dropped, this is one of two and the more complex of the two. This is optional.
            // direction="horizontal" // An optional that controls the direction that the draggable can be dropped in. It defaults to vertical.
            type="TASK"
          >
            {(provided, snapshot) => (
              <div
                className={`flex flex-grow flex-col p-2 transition duration-200 ease-linear ${
                  snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-inherit'
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                date-is-dragging-over={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} {...{ task, index }} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
