import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';
import '../ContentTable.css';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import UploadService from "../../../../services/file-upload-service";

export const StudentClass = (props) => {
    const [imageInfos, setImageInfos] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [accountDialog, setAccountDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState(null);

    const [usernameUpdate, setUsernameUpdate] = useState({});

    const [displayModal, setDisplayModal] = useState(false);
    const getUsers = () => {
        axios
            .get('http://localhost:9597/api/account/findAllStudentInClass/'+props.id)
            .then((response) => {
                if (response.status === 200) {

                    setUsers(response?.data);
                    setUsers(getUser);
                    setLoading(false);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = (user) => {
        return [...user || []].map(d => {
            d.dob = new Date(d.dob);
            return d;
        });
    }


    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'username': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'classes': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'firstName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'lastName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'address': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'gender': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'phone': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'dob': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
        UploadService.getFiles().then((response) => {
            setImageInfos(response.data);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (value) => {
        var date = new Date(value);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">

                <div >
                    <span className="p-input-icon-left" >
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                </div>
            </div>
        )
    }

    const genders = [
        true, false
    ];

    const genderBodyTemplate = (rowData) => {
        return <span>{rowData.gender ? 'Female' : 'Male'}</span>;
    }

    const genderFilterTemplate = (options) => {

        return <Dropdown value={options.gender} options={genders} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={genderItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const genderItemTemplate = (option) => {
        return <span>{option ? 'Female' : 'Male'}</span>;
    }
    const status = [0, 1]
    const statusBodyTemplate = (rowData) => {
        if (rowData.status == 1) {
            return <span className='customer-badge' style={{ backgroundColor: 'green', color: 'white' }}>Active</span>;
        } else if (rowData.status == 0) {
            return <span className='customer-badge' style={{ backgroundColor: 'red', color: 'white' }}>Block</span>;
        }

    }
    const statusFilterTemplate = (options) => {

        return <Dropdown value={options.status} options={status} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear style={{ textAlign: 'center' }} />;
    }
    const statusItemTemplate = (option) => {
        if (option == 0) {

            return <span className='customer-badge status-unqualified' >Active</span>;
        } else if (option == 1) {

            return <span className='customer-badge status-qualified' >Block</span>;
        }
    }
    const avatarBodyTemplate = (rowData) => {
        let url;

        imageInfos.map((img, index) => {
            if (img.name == rowData.avatar) {
                url = img.url

            }
        })
        return (
            <span><img src={url} height="80px" /></span>
        );

    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.dob);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }




    const header = renderHeader();





    return (


        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={users} paginator className="p-datatable-customers" header={header} rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="username" rowHover selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['username', 'classes', 'firstName', 'lastName', 'address', 'phone']} emptyMessage="No account found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="avatar" header="Avatar" body={avatarBodyTemplate} />
                    <Column field="username" header="Username" sortable filter filterPlaceholder="Search by name" />
                    <Column field="classes" header="Class" sortable filterField="classes" filter filterPlaceholder="Search by classes" />
                    <Column field="firstName" header="First Name" sortable filter filterPlaceholder="Search by first name" />
                    <Column field="lastName" header="Last Name" sortable filter filterPlaceholder="Search by last name" />
                    <Column field="address" header="Address" sortable filter filterPlaceholder="Search by address" />
                    <Column field="gender" header="Gender" sortable filter filterPlaceholder="Search by gender" body={genderBodyTemplate} filterElement={genderFilterTemplate} />
                    <Column field="phone" header="Phone" sortable filter filterPlaceholder="Search by phone" />
                    <Column field="dob" header="DOB" sortable filterField="dob" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                    <Column field="status" header="Status" sortable style={{ textAlign: 'center' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                </DataTable>
            </div>
        </div>





    );
}
