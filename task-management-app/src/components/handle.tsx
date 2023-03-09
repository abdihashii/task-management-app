import React from 'react';

type HandleProps = {
  dragHandleProps: any;
};

const Handle = ({ dragHandleProps }: HandleProps) => {
  return (
    <div
      {...dragHandleProps}
      className="mr-2 h-5 w-5 rounded bg-orange-300"
    ></div>
  );
};

export default Handle;
