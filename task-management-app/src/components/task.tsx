import { TaskProps } from '@/types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import Handle from '@/components/handle';

const Task = ({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`mb-2 flex rounded-sm border border-gray-300 p-2 ${
            snapshot.isDragging ? 'bg-orange-400' : 'bg-white'
          }`}
          {...provided.draggableProps}
          // the part of the draggable that is used to control the dragging of the entire draggable
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-is-dragging={snapshot.isDragging} // using data-is-dragging because isDragging is not a supported attribute for HTMLElements
        >
          {/* <Handle
            // Makes the handle the only part of the draggable that is used to control the dragging of the entire draggable
            dragHandleProps={provided.dragHandleProps}
          /> */}
          {task.content} {task.id}
        </div>
      )}
    </Draggable>
  );
};

export default Task;

/****
snapshot object: 
  contains a number of properties that can be used to style 
  the component during a drag and drop operation

// Draggable
const draggableSnapshot = {
  isDragging: boolean, // will be true if the item is being dragged
  draggingOver: string | null, // will be the id of the droppable that the 
                                  item is being dragged over, or null if it 
                                  is not being dragged over any droppable
};

// Droppable
const droppableSnapshot = {
  isDraggingOver: boolean, // will be true when a draggable is dragging over 
                              this droppable
  draggingOverWith: string | null, // will be the id of the draggable that is
                                      being dragged over this droppable, or
                                      null if it is not being dragged over
};
*/
