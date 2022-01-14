import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Link from "../../../components/Link";
import {useDispatch, useSelector} from "react-redux";
import {bool} from "prop-types";
import {useIntl} from "react-intl";

const EntityEdit = () => {
    const {formatMessage} = useIntl();

    let params = useParams();
    const dispatch = useDispatch();
    const student = useSelector((state) => state.reducer.student)


    const loadStudent = (id) => {
        setIsExist(false)
        fetch('http://localhost:8080/rest/students/' + id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFirstName(data.firstName);
                setLastName(data.lastName)
                setGroup(data.group.id)
                dispatch({type: "PUT_STUDENT", payload: data})
                setIsExist(true)
            });
    }

    const saveStudent = () => {
        let studentData = {};

        let updateAddress = ""

        let fetchMethod = "POST"

        if (isExsist) {
            studentData.id = Number(params.id);
            updateAddress = "/" + params.id
            fetchMethod = "PUT"
        }

        studentData.firstName = firstName
        studentData.lastName = lastName
        if (!isNaN(Number(group))) {
            studentData.group = {id: Number(group)}
        }

        fetch("http://localhost:8080/rest/students" + updateAddress, {
            method: "" + fetchMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        }).then(function (response) {
            if (!response.ok) {
                // Сервер вернул код ответа за границами диапазона [200, 299]
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
        }).then(() => {
            setRedirect(true)
        })
    }

    useEffect(() => {
        if (params.hasOwnProperty('id')) {
            loadStudent(params.id)
        }
    }, [])

    const [isExsist, setIsExist] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [group, setGroup] = useState('')

    const [redirect, setRedirect] = useState(false)

    if (redirect) {
        return <Redirect to='/entityList'/>;
    }

    return (
        <div>
            <h1>
                {formatMessage({
                    id: 'create/edit page',
                })}
                : {params.id}
            </h1>

            <h1>
                {formatMessage({
                    id: 'firstName',
                })}
            </h1>
            <TextField
                size={"small"}
                type={"text"}
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
            />
            <h1>
                {formatMessage({
                    id: 'lastName',
                })}
            </h1>
            <TextField
                size={"small"}
                type={"text"}
                value={lastName}
                onChange={event => setLastName(event.target.value)}
            />
            <h1>
                {formatMessage({
                    id: 'GroupNumber',
                })}
            </h1>
            <TextField
                size={"small"}
                type={"text"}
                value={group}
                onChange={event => setGroup(event.target.value)}
            />

            <Button onClick={saveStudent}>
                {formatMessage({
                    id: 'save',
                })}
            </Button>
            <Link to="/entityList">
                {formatMessage({
                    id: 'cancel',
                })}
            </Link>

        </div>
    );
};

export default EntityEdit;