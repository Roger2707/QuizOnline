import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../ContentTable.css';
import axios from 'axios';
import { SaveSubject } from './SaveSubject';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

export const Subject = () => {
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic3, setDisplayBasic3] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState([]);
    const toast = useRef(null);

    const openNew = () => {
        setSubject(null);
        setSubmitted(false);
        setDisplayBasic2(true);
    }
    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    const openUpdate = (username) => {
        setSubmitted(false);
        setDisplayBasic3(true);

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
    const getSubjects = () => {
        axios
            .get('http://localhost:9597/api/subject/findAllSubject')
            .then((response) => {
                if (response.status === 200) {

                    setSubjects(response?.data);
                    setSubjects(getSubject);
                    setLoading(false);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubject = (subject) => {
        return [...subject || []].map(d => {
            d.dob = new Date(d.dob);
            return d;
        });
    }

    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'subjectId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubjects();
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
        return (
            <span>
                <Button icon="pi pi-file-edit" className="p-button-rounded p-button-outlined" aria-label="Edit" />
                &nbsp;
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" aria-label="Delete" />
            </span>


        );
    }

    const header = renderHeader();
    const deleteSubject = (id) => {
        axios.delete('http://localhost:9597/api/subject/delete/' + id)
            .then((res) => {
                if (res.status === 200) {
                    let sts = res?.data?.result;
                    if (sts === 0) {
                        showTos(sts, '');
                    } else if (sts === 1) {
                        showTos(sts, '');
                    } else if (sts === 2) {
                        showTos(sts, 'There are still questions or exams for this subject. ');
                    }
                    getSubjects();
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
            message: 'Do you want to delete this subject?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept :()=>{
                accept(id);
            },
            reject
        });
    }

    const accept = (id) => {
         deleteSubject(id);
       
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
                <DataTable value={subjects} paginator className="p-datatable-customers" header={header} rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="subjectId" rowHover onSelectionChange={e => setSelectedUser(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['subjectId', 'name']} emptyMessage="No Class found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="subjectId" header="Subject Id" sortable filter filterPlaceholder="Search by Subject Id" />
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by Subject Name" />
                    <Column headerStyle={{ width: '10rem', textAlign: 'center' }} body={(data, props) => {
                        return (
                            <span>
                                <Button icon="pi pi-file-edit" className="p-button-rounded p-button-outlined" aria-label="Edit" onClick={(e) => {
                                    setSubject(data);
                                    openUpdate();

                                }} />
                                &nbsp;
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" aria-label="Delete" onClick={(e) => {
                                    confirm(data.subjectId);
                                }} />
                            </span>
                        )
                    }} />
                </DataTable>
            </div>


            <Dialog header="Add Subject" visible={displayBasic2} style={{ width: '50vw' }} onHide={() => onHide('displayBasic2')}>
                <SaveSubject subject={{ subject }} setDisplay={setDisplayBasic2} load={getSubjects} showSuccess={showSuccess} />

            </Dialog>

            <Dialog header="Update Subject" visible={displayBasic3} style={{ width: '50vw' }} onHide={() => onHide('displayBasic3')}>
                <SaveSubject subject={{ subject }} setDisplay={setDisplayBasic3} load={getSubjects} showSuccess={showSuccess} />

            </Dialog>
        </div>
    );
}
