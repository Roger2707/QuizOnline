import React, { useState, useEffect } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import './ContentTable.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {MdMore} from 'react-icons/md'

export const ListExams = () => {
    const {username} = useParams();

    const [exams, setExams] = useState([]);
    const url = 'http://localhost:9597/api/exam/findAllExam';

    const [subjects, setSubjects] = useState([]);
    const urlSubjects = 'http://localhost:9597/api/subject/findAllSubject'

    const getExams = async () => {
        axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    
                    setExams(response?.data);
                    setExams(getExam);
                    setLoading(false);  
                   
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getExam = (exam) => {
        return [...exam || []].map(d => {
            d.created = new Date(d.created);
            return d;
        });
    }

    const getSubjects = async () => {
        axios
            .get(urlSubjects)
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

    const getSubject = (question) => {
        return [...question || []].map(d => {
            d.created = new Date(d.created);
            return d;
        });
    }

    const [selectedUser, setSelectedUser] = useState(null);

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'examId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'gradeId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'subjectId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
'time': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'qtyQuestion': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExams();
        getSubjects();
        return () => { 
            setExams({});
            setSubjects({});
        }
    }, []);

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

    const dateBodyTemplate = (rowData) => {
        var date = new Date(rowData.created);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }


    const actionBodyTemplate = (rowData) => {
        return  (
            <>
                <Link to={`/student/examination/${rowData.examId}/${username}`} className='btn_exam_detail'>
                    <span><MdMore/></span>
                </Link>
            </>
        );
    }

    const header = renderHeader();

    const questionBody = (rowData) => {
        return <span>{rowData.examId}</span>
    }

    const gradeBody = (rowData) => {
        const gradeId = rowData.gradeId;

        if(gradeId === 1) {
            return <span>Grade 10</span>
        } else if(gradeId === 2) {
            return <span>Grade 11</span>
        } else if(gradeId === 3) {
            return <span>Grade 12</span>
        }
        return <span>Grade</span>

    }

    // Subject : Id -> Name
    const subjectBody = rowData => {
        const id =  rowData.subjectId;

        const subjects2 = [...subjects];
        subjects2.forEach(s => {
            if(s.subjectId === id) {
                rowData = s;
            }
        })
        return <span>{rowData.name}</span>
    }
    

    const qtyBody = rowData => {
        return <span>{rowData.easy + rowData.medium + rowData.hard}</span>
    }

    return (
        <Wrapper>
<div className="datatable-doc-demo">
                <div className="card">
                    <h1>List Exams: </h1>
                    <DataTable value={exams} paginator className="p-datatable-customers" header={header} rows={7}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="examId" rowHover selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                        globalFilterFields={['examId', 'gradeId', 'subjectId', 'name', 'created', 'time', 'qtyQuestion', 'status']} emptyMessage="No account found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                        <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                        <Column field="examId" header="ExamId" sortable filter filterPlaceholder="Search by examId" body={questionBody}/>
                        <Column field="gradeId" header="GradeId" sortable filter filterPlaceholder="Search by GradeId" body={gradeBody} />
                        <Column field="subjectId" header="SubjectId" sortable filter filterPlaceholder="Search by SubjectId" 
                                body={subjectBody}
                        />
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by Name"  />
                        <Column field="created" header="Created" sortable filterField="created" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                            filter filterElement={dateFilterTemplate} />
                        <Column field="time" header="Time" sortable filter filterPlaceholder="Search by type"  />
                        <Column field="qtyQuestion" header="Quantities" sortable filter filterPlaceholder="Search by photo" body={qtyBody} />
                        <Column field="status" header="Status" sortable style={{textAlign:'center'}}  />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }}     body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    h1 {
        margin: 0;
        padding: 20px 0;
        text-align: center;
        font-style: italic;
        background: radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0.1%, rgba(233, 226, 226, 0.28) 90.1%);
    }
`