import Head from 'next/head';
import { Inter } from 'next/font/google';
import { initialData } from '../data/initial-data';
import { useState } from 'react';
import Column from '@/components/column';
import { DragDropContext } from 'react-beautiful-dnd';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState(initialData);

  // Synchronously update the state to reflect the drag and drop result
  const onDragEnd = (result) => {
    // TODO: reorder our column
  };

  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <main className={`${inter.className}`}>
        <DragDropContext
          // called when the drag starts
          // onDragStart
          // called when something changes during the drag, such as moving over a new droppable
          // onDragUpdate
          // called at the end of the drag, this is the only required callback
          onDragEnd={onDragEnd}
        >
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return <Column key={column.id} {...{ column, tasks }} />;
          })}
        </DragDropContext>
      </main>
    </>
  );
}
