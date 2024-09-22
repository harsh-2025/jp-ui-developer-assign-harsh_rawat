import React, { useState, useMemo, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Clipboard, Command, DotIcon, FilterIcon, Search } from "lucide-react";
import "../globals.css";
import { Paginator } from "primereact/paginator";
import { FaUpDown } from "react-icons/fa6";
import { FaCopy, FaUser } from "react-icons/fa";
import useThemeStore from "../store/useThemestore";
import { orderData } from "../data/data";


const OrderList = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.IN }
    });
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    
   
    const statusOptions = [
        // { label: 'All', value: null },  // Give name to first option as 'All'

        { label: 'In Progress', value: 'In Progress' },
        { label: 'Complete', value: 'Complete' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
    ];

    const sortOptions = [
        { label: 'ID', value: 'id' },
        { label: 'User', value: 'user' },
        { label: 'Project', value: 'project' },
        { label: 'Date', value: 'date' },
        { label: 'Status', value: 'status' }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress':
                return 'text-blue-500';
            case 'Complete':
                return 'text-green-500';
            case 'Pending':
                return 'text-yellow-500';
            case 'Approved':
                return 'text-orange-500';
            case 'Rejected':
                return 'text-gray-500';
            default:
                return 'text-gray-400';
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <span className={getStatusClass(rowData.status)}><span className="flex flex-row"><DotIcon/>{rowData.status}</span></span>;
    };

    const onSortChange = (e) => {
        const selectedField = e.value;
        setSortField(selectedField);
        setSortOrder(sortField === selectedField && sortOrder === 1 ? -1 : 1); // Toggle sortOrder between ascending (1) and descending (-1)
    };
   
    const multiSelectRef = useRef(null);

    const openMultiSelect = () => {
        multiSelectRef.current?.show();
    };
    const userBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center">
                <FaUser className="mr-2 text-blue-500 border-[0.5px] border-gray-500 rounded-full p-[1px]" /> {/* Adjust icon and style */}
                {rowData.user}
            </div>
        );
    };
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredRowId, setHoveredRowId] = useState(null);

    const AddressWithCopy = ({ address, rowId, hoveredRowId, setHoveredRowId }) => {
        const handleCopy = () => {
            navigator.clipboard.writeText(address);
            alert("Address copied to clipboard!");
        };
    
        return (
            <div
                className="flex items-center relative"
                onMouseEnter={() => setHoveredRowId(rowId)}
                onMouseLeave={() => setHoveredRowId(null)}
            >
                <span>{address}</span>
                {hoveredRowId === rowId && (
                    <Clipboard
                        className="ml-2 text-gray_color cursor-pointer hover:text-element_color dark:text-gray_color"
                        onClick={handleCopy}
                        title="Copy address"
                    />
                )}
            </div>
        );
    };
    const { darkMode, setDarkMode } = useThemeStore(); // Access the state and setter

    return (

        <div className="pt-20 px-[5rem]">
            <h1 className="text-card_heading font-high_heading text-element_color dark:text-dark_color  mb-4">Order List</h1>

            {/* Search Input and Status Filter */}
            <div className="flex flex-row bg-gray_color dark:bg-dark_color_new  my-8 p-2">
                <div className="flex flex-row w-1/2">
                    
                <button onClick={openMultiSelect} className="mr-2">
                        <FilterIcon className={`h-5 w-5 dark:text-dark_color text-element_color`} />
                    </button>
                    <MultiSelect
                    ref={multiSelectRef}
                    value={filters.status.value}
                    options={statusOptions}
                        // onChange={handleStatusChange}
                        onChange={(e) => setFilters({
                            ...filters,
                            status: { value: e.value, matchMode: FilterMatchMode.IN }
                        })}
                    display="chip"
                    className="w-1/4 custom-multiselect"
                    panelClassName="bg-gray-100 custom-panel mt-2 p-4 "
                    fixedPlaceholder
                />
                
                </div>
                <div className="w-1/4"></div>
                <div className="relative w-1/4">
                <InputText
                    className="bg-gray-200 py-2 px-4 pl-10 pr-10  rounded-md  w-full   border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Search..."
                    onInput={(e) => setFilters({
                        ...filters,
                        global: { value: e.currentTarget.value, matchMode: FilterMatchMode.CONTAINS }
                    })}
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Command className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

</div>
                {/* MultiSelect for Status Filter */}
                
            </div>

            {/* Sorting Dropdown */}
            

            {/* DataTable */}
            <div className="bg-gray_color dark:bg-dark_color_new w-full h-4/5 rounded-xl p-4">
                <DataTable
                    value={orderData}
                    filters={filters}
                    paginator rows={10}
                    paginatorClassName="  space-x-4 "
                    pageLinkSize={10}
                    paginatorLeft
                    sortField={sortField}
                    sortOrder={sortOrder}
                    className=""
                >
                    <Column field="id" header="ID" headerClassName="pb-4 border-b font-element_heading  border-gray-400 text-element_color dark:text-gray_color" sortable className="border-b-2 py-2"/>
                    <Column field="user" header="User" body={userBodyTemplate} sortable className="border-b-2 py-2" headerClassName="pb-4 border-b border-gray-400 font-element_heading  text-element_color dark:text-gray_color"/>
                    <Column field="project" header="Project"  className="border-b-2 py-2" headerClassName="pb-4 border-b border-gray-400 text-element_color font-element_heading  dark:text-gray_color"/>
                    <Column
                field="address"
                        header="Address"
                        className="border-b-2 py-2" headerClassName="pb-4 border-b border-gray-400 text-element_color dark:text-gray_color font-element_heading "
                body={(rowData) => (
                    <AddressWithCopy
                        address={rowData.address}
                        rowId={rowData.id}
                        hoveredRowId={hoveredRowId}
                        setHoveredRowId={setHoveredRowId}
                    />
                )}
                // className="border-b-2 py-2"
                    />
                    <Column field="date" header="Date" className="border-b-2 py-2" headerClassName="pb-4 border-b border-gray-400 text-element_color dark:text-gray_color font-element_heading " />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable className="border-b-2 py-2" headerClassName="pb-4 border-b border-gray-400 text-element_color dark:text-gray_color font-element_heading "/>
                    {/* <Column bodyClassName="py-2 border-b-2 " /> */}

                </DataTable>
            </div>


        </div>
    );
};

export default OrderList;