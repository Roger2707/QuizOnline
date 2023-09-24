import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import '../ContentTable.css';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { SaveClass } from './SaveClass';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { StudentClass } from './StudentClass';

export const Class = () => {
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic3, setDisplayBasic3] = useState(false);
    const [displayBasic4, setDisplayBasic4] = useState(false);
    const [classes, setClasses] = useState([]);
    const [clas, setClas] = useState([]);
    const [grades, setGrades] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    const openNew = () => {
        setClas(null);
        setSubmitted(false);
        setDisplayBasic2(true);
    }
    const openShow = () => {
        setSubmitted(false);
        setDisplayBasic4(true);
    }
    const openUpdate = () => {
        setSubmitted(false);
        setDisplayBasic3(true);

    }

    const getClasses = () => {
        axios
            .get('http://localhost:9597/api/classes/findAllClasses')
            .then((response) => {
                if (response.status === 200) {

                    setClasses(response?.data); 
                    setClasses(getClass);
                    setLoading(false);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getGrades = () => {
        axios
            .get('http://localhost:9597/api/grade/findAllGrade')
            .then((response) => {
                if (response.status === 200) {

                    setGrades(response?.data);


                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClass = (classes) => {
        return [...classes || []].map(d => {
            d.dob = new Date(d.dob);
            return d;
        });
    }
    const gradesFind = [1, 2, 3];
    const gradeFilterTemplate = (options) => {

        return <Dropdown value={options.grade} options={gradesFind} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={gradeItemTemplate} placeholder="Select a Grade" className="p-column-filter" showClear />;
    }
    const gradeItemTemplate = (option) => {
        return <span>{option === 1 ? 'Grade 10' : option === 2 ? 'Grade 11' : 'Grade 12'}</span>;
    }

    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'classId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'grade': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'quantity': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGrades();
        getClasses();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const actionBodyTemplate = () => {
        return (<span>
            <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-button-outlined" aria-label="Edit" />
            &nbsp;
            <Button icon="pi pi-file-edit" className="p-button-rounded p-button-outlined" aria-label="Edit" />
            &nbsp;
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" aria-label="Delete" />
        </span>);
    }

    const header = renderHeader();

    const gradeBody = (rowData) => {
        const gradeId = rowData.grade;

        if (gradeId === 1) {
            return <span>Grade 10</span>
        } else if (gradeId === 2) {
            return <span>Grade 11</span>
        } else if (gradeId === 3) {
            return <span>Grade 12</span>
        }
        return <span>Grade</span>

    }
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
    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3,
        'displayBasic4': setDisplayBasic4,

    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const deleteClass = (id) => {
        axios.delete('http://localhost:9597/api/classes/delete/' + id)
            .then((res) => {
                if (res.status === 200) {
                    let sts = res?.data?.result;
                    if (sts === 0) {
                        showTos(sts, '');
                    } else if (sts === 1) {
                        showTos(sts, '');
                    } else if (sts === 2) {
                        showTos(sts, 'There are still student for this class.');
                    }
                    getClasses();
                }
            }).catch((error) => {
                console.log(error);
            });

    }
    const showTos = (sts, message) => {
        if (sts === 1) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }

    }
    const confirm = (id) => {
        confirmDialog({
            message: 'Do you want to delete this class?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                accept(id);
            },
            reject
        });
    }

    const accept = (id) => {
        deleteClass(id);

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
                <DataTable value={classes} paginator className="p-datatable-customers" header={header} rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="classId" rowHover selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['classId', 'gradeId', 'name', 'quantity', 'status']} emptyMessage="No Class found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="classId" header="ClassId" sortable filter filterPlaceholder="Search by ClassId" />
                    <Column field="grade" header="Grade" sortable filter filterPlaceholder="Search by GradeId" body={gradeBody} filterElement={gradeFilterTemplate} />
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by Class Name" />
                    <Column field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by Quntity" />
                    <Column headerStyle={{ width: '15rem', textAlign: 'center' }} body={(data, props) => {
                        return (<span>
                            <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-button-outlined" aria-label="Show" onClick={(e) => {
                                setClas(data);
                                openShow();

                            }} />
                            &nbsp;
                            <Button icon="pi pi-file-edit" className="p-button-rounded p-button-outlined" aria-label="Edit" onClick={(e) => {
                                setClas(data);
                                openUpdate();

                            }} />
                            &nbsp;
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" aria-label="Delete" onClick={(e) => {
                                confirm(data.classId);
                            }} />
                        </span>);
                    }} />
                </DataTable>
            </div>

            <Dialog header="Add Class" visible={displayBasic2} style={{ width: '50vw' }} onHide={() => onHide('displayBasic2')}>
                <SaveClass clas={{ clas }} grades={{grades}} setDisplay={setDisplayBasic2} load={getClasses} showSuccess={showSuccess} />

            </Dialog>

            <Dialog header="Update Class" visible={displayBasic3} style={{ width: '50vw' }} onHide={() => onHide('displayBasic3')}>
                <SaveClass clas={{ clas }} grades={{grades}} setDisplay={setDisplayBasic3} load={getClasses} showSuccess={showSuccess} />

            </Dialog>
            <Dialog header={"Student In Class " +clas.name} visible={displayBasic4} style={{ width: '50vw' }} onHide={() => onHide('displayBasic4')}>
                <StudentClass id={clas.classId}  setDisplay={setDisplayBasic4} />

            </Dialog>
        </div>
    );
}
