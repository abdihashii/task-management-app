import { ColumnProps } from '@/types';
import React from 'react';
import Task from '@/components/task';

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div className="m-2 rounded-sm border border-gray-300">
      {/* Column title */}
      <h1 className="p-2 text-2xl">{column.title}</h1>

      {/* Task list */}
      <div className="p-2">
        {tasks.map((task) => (
          <Task key={task.id} {...{ task }} />
        ))}
      </div>
    </div>
  );
};

export default Column;
