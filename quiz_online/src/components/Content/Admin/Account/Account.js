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
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import './SaveAccount.css';
import { SaveAccount } from './SaveAccount';
import UploadService from "../../../../services/file-upload-service";
import { ProgressSpinner } from 'primereact/progressspinner';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

export const Account = () => {
    const [imageInfos, setImageInfos] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [accountDialog, setAccountDialog] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic3, setDisplayBasic3] = useState(false);
    const [displayBasic4, setDisplayBasic4] = useState(false);

    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState(null);

    const [usernameUpdate, setUsernameUpdate] = useState({});
    const toast = useRef(null);
    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3,
        'displayBasic4': setDisplayBasic4
    }
    const getAccount = (usernames) => {
        axios
            .get('http://localhost:9597/api/account/findByUsername/' + usernames)
            .then((response) => {
                if (response.status === 200) {

                    setAccount(response?.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getUsers = () => {
        axios
            .get('http://localhost:9597/api/account/findall')
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
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
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
        'dob': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },

        'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
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
    const openNew = () => {
        setSubmitted(false);
        setDisplayBasic2(true);
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
        if (option == 1) {

            return <span className='customer-badge status-unqualified' >Active</span>;
        } else if (option == 0) {

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



    const openUpdate = (username) => {
        setUsernameUpdate(username);
        setSubmitted(false);
        setDisplayBasic3(true);
        console.log(username);

        console.log(usernameUpdate);
    }
    const header = renderHeader();

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />

            </React.Fragment>
        )
    };
    const showSuccess = (bool) => {
        if (bool) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: '', life: 3000 });
        }



    }
    const getButton = (data) => {
        if (data.status == 0) {
            return <Button type="button" icon="pi pi-unlock" className="p-button-rounded p-button-success p-button-outlined" onClick={(e) => {

                confirmDialog({
                    message: 'Are you sure you want to active?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        accept1(data.username);
                    },
                    reject
                });
            }
            }></Button>
        } else {
            return <Button type="button" icon="pi pi-lock" className="p-button-rounded p-button-danger p-button-outlined" onClick={(e) => {

                confirmDialog({
                    message: 'Are you sure you want to lock?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        accept2(data.username);
                    },
                    reject
                });
            }
            }></Button>
        }
    }

    const accept1 = (username) => {
        setDisplayBasic4(true);
        axios.get('http://localhost:9597/api/account/changeStatus/' + username + '/1').then((res) => {
            if (res.status === 200) {
                if (res?.data.result == 1) {
                    setDisplayBasic4(false);
                    showSuccess(true);
                } else {
                    setDisplayBasic4(false);
                    showSuccess(false);
                }
            } else {
                setDisplayBasic4(false);
                showSuccess(false);
            }
        }).catch((err) => {
            setDisplayBasic4(false);
            showSuccess(false);
        });
    }


    const accept2 = (username) => {
        setDisplayBasic4(true);
        axios.get('http://localhost:9597/api/account/resetPassword/' + username + '/0').then((res) => {
            if (res.status === 200) {
                if (res?.data.result == 1) {
                    setDisplayBasic4(false);
                    showSuccess(true);
                } else {
                    setDisplayBasic4(false);
                    showSuccess(false);
                }
            } else {
                setDisplayBasic4(false);
                showSuccess(false);
            }
        }).catch((err) => {
            setDisplayBasic4(false);
            showSuccess(false);
        });
    }


    const accept = (username) => {
        setDisplayBasic4(true);
        axios.get('http://localhost:9597/api/account/resetPassword/' + username).then((res) => {
            if (res.status === 200) {
                if (res?.data.result == 1) {
                    setDisplayBasic4(false);
                    showSuccess(true);
                } else {
                    setDisplayBasic4(false);
                    showSuccess(false);
                }
            } else {
                setDisplayBasic4(false);
                showSuccess(false);
            }
        }).catch((err) => {
            setDisplayBasic4(false);
            showSuccess(false);
        });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (


        <div className="datatable-doc-demo">
            <Toast ref={toast} />
            <div className="card">
                <ConfirmDialog />
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
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
                    <Column headerStyle={{ width: '10rem', textAlign: 'center' }} body={(data, props) => {
                        return (<div>

                            {getButton(data)}
                            &nbsp;
                            <Button type="button" icon="pi pi-refresh" className="p-button-rounded p-button-outlined" onClick={(e) => {

                                confirmDialog({
                                    message: 'Are you sure you want to reset pass?',
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => {
                                        accept(data.username);
                                    },
                                    reject
                                });


                            }
                            }></Button>

                            &nbsp;
                            <Button type="button" icon="pi pi-user-edit" className="p-button-rounded p-button-outlined" onClick={(e) => {
                                getAccount(data.username);
                                setAccount(data);
                                openUpdate(data.username);

                            }
                            }></Button>

                        </div>)
                    }} />
                </DataTable>
            </div>


            <Dialog header="Add Account" visible={displayBasic2} style={{ width: '50vw' }} onHide={() => onHide('displayBasic2')}>
                <SaveAccount username="" account={null} setDisplay={setDisplayBasic2} load={getUsers} showSuccess={showSuccess} setLoad={setDisplayBasic4} />

            </Dialog>

            <Dialog header="Update Account" visible={displayBasic3} style={{ width: '50vw' }} onHide={() => onHide('displayBasic3')}>
                <SaveAccount username={usernameUpdate} account={{ account }} setDisplay={setDisplayBasic3} load={getUsers} showSuccess={showSuccess} />

            </Dialog>

            <Dialog closable={false} draggable={false} visible={displayBasic4} style={{ width: '148px' }} onHide={() => onHide('displayBasic4')}>
                <ProgressSpinner />

            </Dialog>
        </div>





    );
}
