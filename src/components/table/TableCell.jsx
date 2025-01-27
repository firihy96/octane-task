const TableCell = ({ getValue}) => {
  let content = (
    <div className="p-4 border-blue-gray-50">
      <div className="flex items-center gap-3">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          {getValue()}
        </p>
      </div>
    </div>
  );
  return content;
};
export default TableCell;
