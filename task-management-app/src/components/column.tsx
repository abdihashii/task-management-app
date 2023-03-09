import { ColumnProps } from '@/types';
import React from 'react';
import Task from '@/components/task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ index, column, tasks, isDropDisabled }: ColumnProps) => {
  return (
    <div className="m-2 flex flex-col rounded-sm border border-gray-300">
      {/* Column title */}
      <h1 className="p-2 text-2xl">{column.title}</h1>

      {/* Task list */}
      <Droppable
        droppableId={column.id}
        // type={column.id === 'column-3' ? 'DONE' : 'ACTIVE'} // A mechanism to control where a draggable can be dropped, this is one of two and the simpler of the two. This is optional.
        isDropDisabled={isDropDisabled} // A mechanism to control where a draggable can be dropped, this is one of two and the more complex of the two. This is optional.
      >
        {(provided, snapshot) => (
          <div
            className={`flex-grow p-2 transition duration-200 ease-linear ${
              snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-white'
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
  );
};

export default Column;
