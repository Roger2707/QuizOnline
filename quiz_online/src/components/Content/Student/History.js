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

export const History = () => {
    const {username} = useParams();

    const [results, setResults] = useState(null);
    const url = `http://localhost:9597/api/result/findResultByUsername/${username}`;

    const [exam, setExam] = useState(null);
    let examId = 0;

    const urlExam = `http://localhost:9597/api/exam/find/${examId}`;

    const getResults = async () => {
        axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    setResults(response?.data);
                    setResults(getResult);
                    setLoading(false);  
                   
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getResult = (exam) => {
        return [...exam || []].map(d => {
            d.created = new Date(d.created);
            return d;
        });
    }

    const getExam = async () => {
        axios
            .get(urlExam)
            .then((response) => {
                if (response.status === 200) {
                    setExam(response?.data);
                    setExam(getExam);
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
        'examId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'score': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResults();
        examId !== 0 && getExam();
        return () => { 
            setResults({});
            setExam({});
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

    const header = renderHeader();

    const bodyExamName = (rowData) => {
        const id = rowData.examId;
        examId = id;
        
        return <span>{id}</span>
    }
    
    return (
        <Wrapper>
            <div className="datatable-doc-demo">
                <div className="card">
                    <h1>All Results: {username}</h1>
                    {
                        results !== null &&
                        <DataTable value={results} paginator className="p-datatable-customers" header={header} rows={7}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            dataKey="username" rowHover selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                            filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                            globalFilterFields={['username', 'examId', 'score', 'created']} emptyMessage="No account found."
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                            <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                            <Column field="username" header="Username" sortable filter filterPlaceholder="Search by Username" />
                            <Column field="examId" header="Name Exam" sortable filter filterPlaceholder="Search by Exam Name" body={bodyExamName} />
                            <Column field="score" header="Score" sortable filter filterPlaceholder="Search by Score" />
                            <Column field="created" header="Created" sortable filterField="created" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                                filter filterElement={dateFilterTemplate} />
                        </DataTable>
                    }
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