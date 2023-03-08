import { ColumnProps } from '@/types';
import React from 'react';
import Task from '@/components/task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div className="m-2 rounded-sm border border-gray-300">
      {/* Column title */}
      <h1 className="p-2 text-2xl">{column.title}</h1>

      {/* Task list */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 transition duration-200 ease-linear ${
              snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-white'
            }`}
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
