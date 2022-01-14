import React, {useEffect, useState} from 'react';
import {Button, Card, CircularProgress, Paper} from "@material-ui/core";
import Link from "../../../components/Link";
import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";

const EntityList = () => {
    const {formatMessage} = useIntl();


    const dispatch = useDispatch()
    const students = useSelector((state) => state.reducer.students)

    useEffect(() => {
        loadStudents()
        console.log(students)
    }, [])

    const loadStudents = () => {
        fetch('http://localhost:8080/rest/students')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({type: "PUT_STUDENTS", payload: data})
            });
    }

    const deleteStudent = (id) => {
        fetch('http://localhost:8080/rest/students/' + id, {method: 'DELETE'})
            .then(() => loadStudents());
    }


    return (
        <div>
            <Paper variant="outlined" square>
                <h1>{formatMessage({
                    id: 'students',
                })}</h1>
                <Button onClick={loadStudents} variant="outlined">{formatMessage({
                    id: 'updateList',
                })}</Button>
                <Link to="/entityEdit" className="btn btn-primary">{formatMessage({
                    id: 'create',
                })}</Link>


                {students.length === 0
                    ? <h1>{formatMessage({
                        id: 'noStudentsInDB',
                    })}</h1>
                    : <h1></h1>
                }

                <div>{students.map(stud =>
                    <Card
                        className={"entity"}
                        variant="outlined"
                        key={stud.id}
                        style={{marginTop: 15}}>
                        <p
                            key={stud.id}
                            style={{textAlign: "center"}}
                        >
                            {formatMessage({
                                id: 'id',
                            })}:{stud.id}
                            {formatMessage({
                                id: 'firstName',
                            })}: {stud.firstName}
                            {formatMessage({
                                id: 'lastName',
                            })}: {stud.lastName}
                        </p>
                        <div className="entity__buttons">
                            <Button onClick={() => {
                                deleteStudent(stud.id)
                            }}
                            >
                                {formatMessage({
                                    id: 'delete',
                                })}
                            </Button>
                            <Link to={"/entityEdit/" + stud.id}>{formatMessage({
                                id: 'edit',
                            })}</Link>
                        </div>
                    </Card>
                )}</div>
            </Paper>
        </div>
    );
};

export default EntityList;