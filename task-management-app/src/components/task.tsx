import { TaskProps } from '@/types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="mb-2 rounded-sm border border-gray-300 bg-white p-2"
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
