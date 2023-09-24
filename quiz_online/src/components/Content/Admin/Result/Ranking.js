
import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


export const Ranking = () => {
    const [results, setResults] = useState([]);
    const [subjectFinds, setSubjectFinds] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);
    const [exam, setExam] = useState([]);
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
    const formatDate = (value) => {
        var date = new Date(value);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
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

    const getResult = () => {
        axios
            .get('http://localhost:9597/api/result/findAllResult')
            .then((response) => {
                if (response.status === 200) {

                    setResults(response?.data);
                    setLoading(false);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'username': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'score': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResult();
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
    const header = renderHeader();

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.created);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }




    return (

        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={results} paginator className="p-datatable-customers" header={header} rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="subjectId" rowHover onSelectionChange={e => setSelectedUser(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['examId', 'username', 'score']} emptyMessage="No Class found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="examId" header="Exam Id" sortable filter filterPlaceholder="Search by Exam Id" />
                    <Column field="username" header="Username" sortable filter filterPlaceholder="Search by Username" />
                    <Column field="score" header="Score" sortable filter filterPlaceholder="Search by Score" body={gradeBodyTemplate} filterElement={gradeFilterTemplate} />
                    <Column field="created" header="Created" sortable filterField="created" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                   
                </DataTable>
            </div>
        </div>
    );
}
