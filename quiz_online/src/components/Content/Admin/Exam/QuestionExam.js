import React, { useState, useEffect } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';

import '../ContentTable.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const QuestionExam = (props) => {
    const [questions, setQuestions] = useState([]);
    const [subject, setSubject] = useState([]);
    const url = 'http://localhost:9597/api/question/findByExam/'+props.exam.exam.examId;

    const [subjects, setSubjects] = useState([]);
    const urlSubjects = 'http://localhost:9597/api/subject/findAllSubject'

    const getQuestions = async () => {
        axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    
                    setQuestions(response?.data);
                    setQuestions(getQuestion);
                    setLoading(false);  
                   
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getQuestion = (question) => {
        return [...question || []].map(d => {
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
        'questionId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'gradeId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'leverId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'subjectId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'content': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'type': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'photo': { value: null, matchMode: FilterMatchMode.IN },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuestions();
        getSubjects();
        return () => { 
            setQuestions({});
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


    const actionBodyTemplate = () => {

        return  <Button type="button" icon="pi pi-cog"></Button>;
    }

    const header = renderHeader();

    const questionBody = (rowData) => {
        const questionId = rowData.questionId;
        return <span>{questionId}</span>
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

    const levelBody = (rowData) => {
        const levelId = rowData.leverId;

        if(levelId === 0) {
            return <span>Easy</span>
        } else if (levelId === 1) {
            return <span>Normal</span>
        } else if (levelId === 2) {
            return <span>Hard</span>
        }
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


    const contentBody = rowData => {
        const content = rowData.content;
        return <span>{[...content.slice(0, 70), '...']}</span>
    }
    const history = useHistory();

    
    return (
        <>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable value={questions} paginator className="p-datatable-customers" header={header} rows={7}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="questionId" rowHover selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                        globalFilterFields={['questionId', 'gradeId', 'leverId', 'subjectId', 'name', 'content', 'created', 'type', 'photo', 'status']} emptyMessage="No account found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                      
                        <Column field="questionId" header="Question Id" sortable filter filterPlaceholder="Search by QuestionId" body={questionBody}/>
                        <Column field="gradeId" header="Grade" sortable filter filterPlaceholder="Search by GradeId" body={gradeBody} />
                        <Column field="leverId" header="Level" sortable filter filterPlaceholder="Search by LevelId" body={levelBody}  />
                        <Column field="subjectId" header="Subject" sortable filter filterPlaceholder="Search by SubjectId" 
                                body={subjectBody}
                        />
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by Name"  />
                        <Column field="content" header="Content" sortable filter filterPlaceholder="Search by content" body={contentBody}  />
                        <Column field="type" header="Type" sortable filter filterPlaceholder="Search by type"  />
                    </DataTable>
                </div>
            </div>
        </>
    );
}
                 