import React, { useState } from 'react'
import DropDownOption from './DropDownOption';

const Table = ({ setOpenManageColumns, columns, columnVisibility, setColumns, filteredData, handleFilterChange, setFilteredData, toggleColumn, filters }) => {
    const [currentColumn, setCurrentColumn] = useState({});
    const [showOptionSelect, setShowOptionSelect] = useState(false);
    const [showIconDots, setShowIconDots] = useState(false);
    const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData("colIndex", index);
        setDraggedColumnIndex(index);
    };

    const handleDrop = (index) => (event) => {
        const draggedIndex = event.dataTransfer.getData("colIndex");
        if (draggedIndex !== index) {
            const updatedColumns = [...columns];
            const [draggedColumn] = updatedColumns.splice(draggedIndex, 1);
            updatedColumns.splice(index, 0, draggedColumn);
            setColumns(updatedColumns);
        }
        setDraggedColumnIndex(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (
        <React.Fragment>
            <table className="w-full border border-border shadow-md rounded-lg">
                <thead className="bg-accent text-white border-b border-b-border">
                    <tr>
                        {columns.map(
                            (column, index) =>
                                columnVisibility[column.key] && (
                                    <th
                                        draggable
                                        onDragStart={handleDragStart(index)}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(index)}
                                        key={column.key}
                                        onMouseEnter={() => setShowIconDots(index)}
                                        onMouseLeave={() => setShowIconDots(null)}
                                        className={`cursor-grab z-20 relative py-2 text-nowrap px-4 text-center border-r border-r-border 
                                                    ${draggedColumnIndex === index ? 'bg-border opacity-50' : ''}`}
                                    >
                                        {column.label}
                                        <DropDownOption setOpenManageColumns={setOpenManageColumns} filters={filters} index={index} column={column} filteredData={filteredData} handleFilterChange={handleFilterChange} currentColumn={currentColumn} setFilteredData={setFilteredData} setCurrentColumn={setCurrentColumn} setShowOptionSelect={setShowOptionSelect} showIconDots={showIconDots} showOptionSelect={showOptionSelect} toggleColumn={toggleColumn} />
                                    </th>
                                )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className={`border-b border-b-border text-nowrap last:border-none hover:bg-blue-50`}>
                            {columns.map(
                                (column) =>
                                    columnVisibility[column.key] && (
                                        <td key={column.key} className="py-2 px-4 text-center border-r border-r-border">
                                            {row[column.key]}
                                        </td>
                                    )
                            )}
                        </tr>
                    ))}

                </tbody>
            </table>
            {filteredData?.length == 0 && <div className=' text-xl py-20 flex items-center justify-center w-full mx-auto'>
                <span>אין נותונים להצגה...</span>
                <img className='w-72' src="/src/assets/not-found-data.png" alt="img not found" />
                </div>}
        </React.Fragment>
    )
}

export default Table