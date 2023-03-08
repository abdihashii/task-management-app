import Head from 'next/head';
import { Inter } from 'next/font/google';
import { initialData } from '../data/initial-data';
import { useState } from 'react';
import Column from '@/components/column';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState(initialData);

  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <main className={`${inter.className}`}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return <Column key={column.id} {...{ column, tasks }} />;
        })}
      </main>
    </>
  );
}
