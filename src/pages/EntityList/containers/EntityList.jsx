import React, {useEffect, useState} from 'react';
import StudentService from "../../../API/StudentService";
import axios from "axios";
import {useFetching} from "../../../hooks/useFetching";
import {Button, Card, CircularProgress, Paper} from "@material-ui/core";
import Link from "../../../components/Link";
import {useDispatch, useSelector} from "react-redux";
import studentsReducer from "../../../app/reducers/students";

const EntityList = () => {

    const dispatch = useDispatch()
    const {
        studentsList,
    } = useSelector(({studentsReducer}) => studentsReducer);

    const [fetchStudents, isStudentsLoading, studentsError] = useFetching(async () => {
        const response = await StudentService.getAll();
        setStudents(response.data);
        dispatch({type: "ADD_STUDENTS", payload: response.data})
        console.log(studentsList)
    })

    const [students, setStudents] = useState([{}])
    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <div>
            <Paper variant="outlined" square/>
            <h1>Студенты</h1>
            <Button onClick={fetchStudents} variant="outlined">Обновить список</Button>
            <Link to="/entityEdit" className="btn btn-primary">Создать</Link>
            <Paper/>

            {students.length === 0
                ? <h1>Нет студентов в бд</h1>
                : <h1></h1>
            }

            {isStudentsLoading
                ? <CircularProgress/>
                : <div>{students.map(stud =>
                    <Card
                        className={"entity"}
                        variant="outlined"
                        key={stud.id}
                        style={{marginTop: 15}}>
                        <p
                            key={stud.id}
                            style={{textAlign: "center"}}
                        >
                            Id:{stud.id} Имя: {stud.firstName} Фамилия: {stud.lastName}
                        </p>
                        <div className="entity__buttons">
                            <Button onClick={() => {
                                StudentService.deleteById(stud.id).then(fetchStudents)
                            }}
                            >
                                Удалить
                            </Button>
                            <Link to={"/entityEdit/" + stud.id}>Редактировать</Link>
                        </div>
                    </Card>
                )}</div>
            }
        </div>
    );
};

export default EntityList;