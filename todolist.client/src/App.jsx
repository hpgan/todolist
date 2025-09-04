import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css';
function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}
function AppNew() {
    const [TodoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        populateTodoData();
    }, []);

    const contents = TodoList === undefined
        ? <p><em>Loading...</em></p>
        : <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {TodoList.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                    </tr>
                )}
            </tbody>
        </Table>;

    return (
        <Stack gap={3}>
            <div className="p-2">
                <h1 id="tableLabel">ToDo List</h1>
            </div>

            <div className="p-2">
                <p>List of all the ToDos.</p>
            </div>
            <div className="p-2">
                <Button variant="primary" onClick={populateTodoData} disabled={isLoading}>
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </Button>
            </div>
            <div className="p-2">
                {contents}
            </div>
        </Stack>

    );

    async function populateTodoData() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:81/TodoList/GetAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodoList(data);
            }

        } catch (error) {
            console.error('Error fetching ToDo data:', error);
        }
        finally {
            setLoading(false);
        }
    }

}


export default AppNew;