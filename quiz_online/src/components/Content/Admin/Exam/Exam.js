

import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './SaveExam.css';
import axios from 'axios';
import { SaveExam } from './SaveExam';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { QuestionExam } from './QuestionExam';


export const Exam = () => {
    const [grades, setGrades] = useState([]);
    const [subjectFinds, setSubjectFinds] = useState([]);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic3, setDisplayBasic3] = useState(false);
    const [displayBasic4, setDisplayBasic4] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);
    const [exam, setExam] = useState([]);
    const toast = useRef(null);

    const openNew = () => {
        setExam(null);
        setSubmitted(false);
        setDisplayBasic2(true);
    }
    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3,
        'displayBasic4': setDisplayBasic4
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    const openUpdate = (username) => {
        setSubmitted(false);
        setDisplayBasic3(true);

    }
    const openShow = () => {
        setSubmitted(false);
        setDisplayBasic4(true);

    }
    const gradeBodyTemplate = (rowData) => {
        const gradeId = rowData.gradeId;
        if (gradeId === 1) {
            return <span>Grade 10</span>
        } else if (gradeId === 2) {
            return <span>Grade 11</span>
        } else if (gradeId === 3) {
            return <span>Grade 12</span>
        }
        return <span>Grade</span>

    }
    const gradesFind = [1, 2, 3];
    const gradeFilterTemplate = (options) => {

        return <Dropdown value={options.gradeId} options={gradesFind} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={gradeItemTemplate} placeholder="Select a Grade" className="p-column-filter" showClear />;
    }
    const gradeItemTemplate = (option) => {
        return <span>{option === 1 ? 'Grade 10' : option === 2 ? 'Grade 11' : 'Grade 12'}</span>;
    }


    const subjectBodyTemplate = (rowData) => {
        const subjectId = rowData.gradeId;

        let subject = subjects.find(s => s.subjectId === subjectId)
        return subject?.name;

    }

    const subjectFilterTemplate = (options) => {

        return <Dropdown value={options.gradeId} options={gradesFind} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={subjectItemTemplate} placeholder="Select a Grade" className="p-column-filter" showClear />;
    }
    const subjectItemTemplate = (option) => {
        const subjectId = option;

        let subject = subjects.find(s => s.subjectId === subjectId)
        return subject?.name;
        //return <span>{option === 1 ? 'Grade 10' : option === 2 ? 'Grade 11' : 'Grade 12'}</span>;
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
    const getSubjects = () => {
        axios
            .get('http://localhost:9597/api/subject/findAllSubject')
            .then((response) => {
                if (response.status === 200) {

                    setSubjects(response?.data);
                    let data = response?.data;
                    data.map(s => subjectFinds.push(s.subjectId))

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getExam = () => {
        axios
            .get('http://localhost:9597/api/exam/findAllExam')
            .then((response) => {
                if (response.status === 200) {

                    setExams(response?.data);
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
        'gradeId': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'subjectId': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'time': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'easy': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'medium': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'hard': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExam();
        getGrades();
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
        axios.delete('http://localhost:9597/api/exam/delete/' + id)
            .then((res) => {
                if (res.status === 200) {
                    let sts = res?.data?.result;
                    if (sts === 0) {
                        showTos(sts, '');
                    } else if (sts === 1) {
                        showTos(sts, '');
                    } else if (sts === 2) {
                        showTos(sts, 'There are students taking this test.');
                    }
                    getExam();
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
            message: 'Do you want to delete this Exam?',
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
                <DataTable value={exams} paginator className="p-datatable-customers" header={header} rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="subjectId" rowHover onSelectionChange={e => setSelectedUser(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['subjectId', 'name']} emptyMessage="No Class found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="examId" header="Exam Id" sortable filter filterPlaceholder="Search by Subject Id" />
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by Subject Id" />
                    <Column field="gradeId" header="Grade" sortable filter filterPlaceholder="Search by Grade" body={gradeBodyTemplate} filterElement={gradeFilterTemplate} />
                    <Column field="subjectId" header="Subject" sortable filter filterPlaceholder="Search by Subject" body={subjectBodyTemplate} filterElement={subjectFilterTemplate} />
                    <Column field="time" header="Time" sortable filter filterPlaceholder="Search by Time" />
                    <Column field="easy" header="Easy" sortable filter filterPlaceholder="Search by Easy" />
                    <Column field="medium" header="Medium" sortable filter filterPlaceholder="Search by Medium" />
                    <Column field="hard" header="Hard" sortable filter filterPlaceholder="Search by Hard" />
                    <Column headerStyle={{ width: '15rem', textAlign: 'center' }} body={(data, props) => {
                        return (
                            <span>
                                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-button-outlined" aria-label="Show" onClick={(e) => {
                                    setExam(data);
                                    openShow();

                                }} />
                                 &nbsp;
                                <Button icon="pi pi-file-edit" className="p-button-rounded p-button-outlined" aria-label="Edit" onClick={(e) => {
                                    setExam(data);
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


            <Dialog header="Add Subject" visible={displayBasic2} style={{ width: '60vw' }} onHide={() => onHide('displayBasic2')}>
                <SaveExam exam={{ exam }} grades={null} subjects={null} setDisplay={setDisplayBasic2} load={getExam} showSuccess={showSuccess} />

            </Dialog>

            <Dialog header="Update Subject" visible={displayBasic3} style={{ width: '60vw' }} onHide={() => onHide('displayBasic3')}>
                <SaveExam exam={{ exam }} grades={{grades}} subjects={{subjects}} setDisplay={setDisplayBasic3} load={getExam} showSuccess={showSuccess} />

            </Dialog>
            <Dialog header="Update Subject" visible={displayBasic4} style={{ width: '60vw' }} onHide={() => onHide('displayBasic4')}>
                <QuestionExam exam={{ exam }}  setDisplay={setDisplayBasic3} />

            </Dialog>
        </div>
    );
}
