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
        cash,
    } = useSelector(({ studentsReducer })=> studentsReducer);
    console.log(cash)

    const addCash = () => {
      dispatch({type:"ADD_CASH", payload: 5})
    }
    const getCash = () => {
      dispatch({type:"GET_CASH", payload: 5})
    }

    const [fetchStudents, isStudentsLoading, studentsError] = useFetching(async () => {
        const response = await StudentService.getAll();
        setStudents(response.data);
    })

    const [students, setStudents] = useState([{}])
    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <div>

            <div>{cash}</div>
            <div style={{display: 'flex'}}>
                <Button onClick={()=> addCash()}>Пополнить счет</Button>
                <Button onClick={()=> getCash()}>Снять со счета</Button>
            </div>


            <Paper variant="outlined" square/>
            <h1>Студенты</h1>
            <Button onClick={fetchStudents} variant="outlined">Обновить список</Button>
            <Link to="/entityEdit" className="btn btn-primary">Создать</Link>
            <Paper/>

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
                            <Link to={"/entityEdit/"+stud.id} >Редактировать</Link>
                        </div>
                    </Card>
                )}</div>
            }
        </div>
    );
};

export default EntityList;