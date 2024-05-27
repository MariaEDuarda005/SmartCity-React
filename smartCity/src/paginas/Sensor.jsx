import React, {useEffect, useState} from "react";
import axios from 'axios';
import estilos from './Sensor.module.css'

export function Sensor(){
    const[sensores, setSensores] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores(){
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/api/sensores', {
                    header: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data) // fazer a listagem dos sensores e trazer aqui
                setLoading(false); // não estou mais carregando, já está carregado
            } catch(err){
                setError(err);
                setLoading(false)// não quer que carregue, só a analize
            }
        }
        fetchSensores();
    }, [])

    if(loading){
        return <div> Carregando... </div>
    }

    if(error){
        return <div> Erro ao carregar os dados: {error.message} </div>
    }

    return(
        <div className={estilos.container}>
            <table className={estilos.tabela}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th>Localização</th>
                    <th>Responsavel</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Alterar dados</th>
                </tr>
                </thead>
                <tbody>
                    {sensores.map(sensor => {
                        <tr key={sensor.id}>
                            <td>{sensor.id}</td>
                            <td>{sensor.tipo}</td>
                            <td>{sensor.localizacao}</td>
                            <td>{sensor.responsavel}</td>
                            <td>{sensor.latitude}</td>
                            <td>{sensor.longitude}</td>
                            <td>Alterar Sensor</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}