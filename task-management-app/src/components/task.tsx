import { TaskProps } from '@/types';
import React from 'react';

const Task = ({ task }: TaskProps) => {
  return (
    <div className="mb-2 rounded-sm border border-gray-300 p-2">
      {task.content}
    </div>
  );
};

export default Task;
