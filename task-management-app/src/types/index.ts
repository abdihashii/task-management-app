export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Tasks = { [key: string]: Task };

export type Columns = { [key: string]: Column };

export type ColumnOrder = string[];

export type InitialData = {
  tasks: Tasks;
  columns: Columns;
  columnOrder: ColumnOrder;
  homeIndex?: number | null;
};

export type ColumnProps = {
  index: number;
  column: Column;
  tasks: Task[];
  isDropDisabled?: boolean;
};

export type TaskProps = {
  task: Task;
  index: number;
};
