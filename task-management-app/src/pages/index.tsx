import Head from 'next/head';
import { Inter } from 'next/font/google';
import { initialData } from '../data/initial-data';
import { useState } from 'react';
import Column from '@/components/column';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState(initialData);

  // These two callbacks are not always needed to change styles, and
  // we should generally rely on the snapshot object to style our components

  // const onDragStart = () => {
  //   document.body.style.color = 'blue';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // };

  // // Makes changes in response to changes during a drag
  // const onDragUpdate = (update) => {
  //   const { destination } = update;

  //   // Stores the percentage of the current index based on all of the tasks in our state
  //   const opacity = destination
  //     ? destination.index / Object.keys(data.tasks).length
  //     : 0;

  //   // Then we set the background color of the body to the opacity value
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // };

  // Synchronously update the state to reflect the drag and drop result
  const onDragEnd = (result: DropResult) => {
    // document.body.style.color = 'inherit'; // reset the color

    const { destination, source, draggableId } = result;

    // If there's no destination, then there's nothing we need to do
    if (!destination) return;

    // If the destination is the same as the source, then there's nothing we need to do
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Retrieve the column that the task is being dragged from
    const column = data.columns[source.droppableId];

    // Create a copy of the taskIds array from the source column to avoid mutating the state
    const newTaskIds = [...column.taskIds];

    // Modify the array to remove the task from the source index
    newTaskIds.splice(source.index, 1);

    // Modify the array to insert the task at the destination index and insert the task id (draggableId)
    newTaskIds.splice(destination.index, 0, draggableId);

    // Create a new column object with the updated taskIds array to avoid mutating the state
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    // Update the state with the new column object to avoid mutating the state
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newData);
  };

  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <main className={`${inter.className}`}>
        <DragDropContext
          // called when the drag starts
          // onDragStart={onDragStart}
          // called when something changes during the drag, such as moving over a new droppable
          // onDragUpdate={onDragUpdate}
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

/*
DragDropContext Props

onDragStart = {
  draggableId: string,
  type: string,
  source: {
    droppableId: string,
    index: number
  }
}

onDragUpdate = {
  ...onDragStart,
  destination: {
    droppableId: string,
    index: number
  }
}

onDragEnd = {
  ...onDragUpdate,
  reason: 'DROP' | 'CANCEL'
}

*/
