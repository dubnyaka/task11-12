import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import redirect from "react-router-dom/es/Redirect";
import StudentService from "../../../API/StudentService";
import Link from "../../../components/Link";

const EntityEdit = () => {
    let params = useParams();


    useEffect(() => {
        if(params.hasOwnProperty('id')){
            StudentService.getAll().then(resp => {
                    const student = resp.data.find(student => student.id === parseInt(params.id))
                    if (student) {
                        setFirstName(student.firstName)
                        setLastName(student.lastName)
                        setGroup(student.group.id)
                    }
                }
            )
        }
    }, [])


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [group, setGroup] = useState('')

    const [redirect, setRedirect] = useState(false)

    const submitForm = () => {
        let bodyFormData = new FormData();

        if(params.hasOwnProperty('id')){
            bodyFormData.append('id', params.id)
        }
        bodyFormData.append('firstName', firstName)
        bodyFormData.append('lastName', lastName)
        bodyFormData.append('group', group)
        return axios({
            method: "post",
            url: "http://localhost:8080/students/save",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(setRedirect(true))
    }

    if (redirect) {
        return <Redirect to='/entityList'/>;
    }

    return (
        <div>
            <h1>Страница создания/редактирования сущности: {params.id}</h1>

            <h1>Имя</h1>
            <TextField
                size={"small"}
                type={"text"}
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
            />
            <h1>Фамилия</h1>
            <TextField
                size={"small"}
                type={"text"}
                value={lastName}
                onChange={event => setLastName(event.target.value)}
            />
            <h1>Номер группы</h1>
            <TextField
                size={"small"}
                type={"text"}
                value={group}
                onChange={event => setGroup(event.target.value)}
            />

            <Button onClick={submitForm}>Сохранить</Button>
            <Link to="/entityList">Отмена</Link>

        </div>
    );
};

export default EntityEdit;