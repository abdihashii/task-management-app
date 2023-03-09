import Head from 'next/head';
import { Inter } from 'next/font/google';
import { initialData } from '../data/initial-data';
import { useState } from 'react';
import Column from '@/components/column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
    // Clear the index when a drag ends
    setData({
      ...data,
      homeIndex: null,
    });

    // getting type to know if we're dragging a task or a column
    const { destination, source, draggableId, type } = result;

    // If there's no destination, then there's nothing we need to do
    if (!destination) return;

    // If the destination is the same as the source, then there's nothing we need to do
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'COLUMN') {
      // create a copy of the column order array
      const newColumnOrder = [...data.columnOrder];

      // remove the column from the source index
      newColumnOrder.splice(source.index, 1);

      // insert the column at the destination index
      newColumnOrder.splice(destination.index, 0, draggableId);

      // create a new state object with the updated column order array
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };

      // update the state
      setData(newState);
      return;
    }

    // Retrieve the column that the task is being dragged from
    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      // Create a copy of the taskIds array from the source column to avoid mutating the state
      const newSourceColumnTaskIds = [...sourceColumn.taskIds];

      // Modify the array to remove the task from the source index
      newSourceColumnTaskIds.splice(source.index, 1);

      // Modify the array to insert the task at the destination index and insert the task id (draggableId)
      newSourceColumnTaskIds.splice(destination.index, 0, draggableId);

      // Create a new column object with the updated taskIds array to avoid mutating the state
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceColumnTaskIds,
      };

      // Update the state with the new column object to avoid mutating the state
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
        },
      };

      setData(newData);
      return; // this is needed otherwise we'll go to the code below
    }

    /*** Moving from one list to another ***/
    // We need to make a copy of the source column's tasks
    const newSourceColumnTaskIds = [...sourceColumn.taskIds];

    // Then we remove that task from the source column's task id array
    newSourceColumnTaskIds.splice(source.index, 1);

    // Now we create a new column object for the source column
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: newSourceColumnTaskIds,
    };

    // Do the same thing for the destination column
    const newDestinationColumnTaskIds = [...destinationColumn.taskIds];
    // Insert the draggable id at the destination index
    newDestinationColumnTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: newDestinationColumnTaskIds,
    };

    // Create a new object for the data
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    setData(newData);
  };

  // How to enforce a requirement that only lets tasks move to the right
  const onDragStart = (start: { source: { droppableId: string } }) => {
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

    // Record the index of the column that the task is being dragged from to the state
    setData({
      ...data,
      homeIndex,
    });
  };

  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <main className={`${inter.className}`}>
        <DragDropContext
          // called when the drag starts
          onDragStart={onDragStart}
          // called when something changes during the drag, such as moving over a new droppable
          // onDragUpdate={onDragUpdate}
          // called at the end of the drag, this is the only required callback
          onDragEnd={onDragEnd}
        >
          {/* Container */}
          <Droppable
            droppableId={'droppable-container'}
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <section
                className="grid grid-cols-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => data.tasks[taskId],
                  );

                  // true when the index of the column is less than the index of the column that the task is being dragged from
                  // this will prevent dragging tasks backgrounds between columns
                  const isDropDisabled = index < data.homeIndex!;

                  return (
                    <Column
                      key={column.id}
                      {...{ index, column, tasks, isDropDisabled }}
                    />
                  );
                })}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
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

/*

How all horizontal and vertical dnd will work

DroppableContainer (Horizontal) {
  DraggableColumns [
    DraggableColumn1 {
      DroppableColumn1 (Vertical) {
        DraggableTasks [
          task1,
          task2,
          task3
        ]
      }
    },

    DraggableColumn2 {
      DroppableColumn2 (Vertical) {
        DraggableTasks []
      }
    },

    DraggableColumn3 {
      DroppableColumn3 (Vertical) {
        DraggableTasks []
      }
    },
  ]
}

*/
