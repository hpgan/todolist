import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DatePicker from 'react-datepicker';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';


function App() {
    const [TodoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingRow, SetEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const handleEdit = (rowId) => {
        SetEditingRow(rowId);
        const rowToEdit = TodoList.find(item => item.id === rowId);
        setEditedData(rowToEdit);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const handleStartDateChange = (date) => {
        setEditedData({
            ...editedData,
            startDate: date.toISOString(),
        });
    };
    const handleEndDateChange = (date) => {
        setEditedData({
            ...editedData,
            endDate: date.toISOString(),
        });
    };

    const handleSave = async (rowId) => {
        const updatedData = TodoList.map((row) => row.id === rowId ? { ...editedData } : row);
        setTodoList(updatedData);
        await UpdateTodo(rowId, editedData);
        SetEditingRow(null);
    };
    const handleCancel = () => {
        SetEditingRow(null);
    };



    useEffect(() => {
        populateTodoData();
    }, []);

    const contents = TodoList === undefined
        ? <p><em>Loading...</em></p>
        : <div>
            {error && (
                <Alert variant="danger" onClose={() => populateTodoData()} dismissible>
                    <p>Error fetching data</p>
                    <p>{error}</p>
                </Alert>
            )}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {TodoList.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {editingRow === item.id ? (
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={editedData.title || ''} // Ensure value is not undefined
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.title
                                )}
                            </td>
                            <td>
                                {editingRow === item.id ? (
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={editedData.description || ''}
                                        onChange={handleChange}
                                    />

                                ) : (item.description)}
                            </td>
                            <td>
                                {
                                    editingRow === item.id ? (
                                     
                                            <DatePicker
                                                selected={new Date(editedData.startDate)}
                                                onChange={handleStartDateChange}
                                                dateFormat="dd MMM yyyy"
                                            />
                                      
                                    ) : (formatDate(item.startDate)
                                    )
                                }
                            </td>
                            <td>
                                {
                                    editingRow === item.id ? (
                                        <Form.Group controlId='endDate'>
                                            <DatePicker
                                                selected={new Date(editedData.endDate)}
                                                onChange={handleEndDateChange}
                                                dateFormat="dd MMM yyyy"
                                            />
                                        </Form.Group>
                                    ) : (formatDate(item.endDate)
                                    )
                                }
                            </td>
                            <td>
                                {editingRow === item.id ? (
                                    <>
                                        <Button variant="dark" size="sm" className="me-2" onClick={() => handleSave(item.id)}>Save</Button>
                                        <Button variant="dark" size="sm" onClick={handleCancel}>Cancel</Button>
                                    </>
                                ) : (
                                    <Button variant="dark" size="sm" className="me-2" onClick={() => handleEdit(item.id)}>Edit</Button>
                                )
                                }

                            </td>
                            <td>
                                <Button variant="dark" size="sm" className="me-2" onClick={() => DeleteTodo(item.id)}>delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>;

    return (
        <Stack gap={3}>
            <div className="p-2">
                <h1 id="tableLabel">ToDo List</h1>
                <small>Developed by Marcus Gan (2025 Sept)</small><br />
                <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small><br/>
                <small>The API is: {import.meta.env.VITE_API_URL}</small>
            </div>

            <div className="p-2">
                <p>List of all the ToDos.</p>
            </div>
            <div>
                <ButtonGroup>
                    <Button variant="dark" onClick={populateTodoData} disabled={isLoading}>
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button variant="dark" onClick={CreateTodo} >
                        Create
                    </Button>
                </ButtonGroup>
            </div>
            <div className="p-2">
                {contents}
            </div>
        </Stack>

    );

    async function populateTodoData() {
        setLoading(true);
        setError(null);
        try {
            var url = import.meta.env.VITE_API_URL + '/TodoList/GetAll';
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok && response.status==200) {
                const data = await response.json();
                setTodoList(data);
            }
            if (response.status == 204) {
                setTodoList([]);
                var responseTxt = await response.text();
                setError('Error on retrive Todo. ' + responseTxt);
            }

        } catch (error) {
            console.error('Error fetching ToDo data:', error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function CreateTodo() {
        setLoading(true);
        try {
            var url = import.meta.env.VITE_API_URL + '/TodoList/Create';
            const newTodo = {
                title: 'New Task',
                description: 'New Description',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString()
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newTodo)
            });
            if (response.ok) {
                await populateTodoData();
            }
            if (response.status == 400) {
                var responseTxt = await response.text();
                setError('Error creating ToDo.' + responseTxt);
            }
        } catch (error) {
            console.error('Error creating ToDo:', error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function DeleteTodo(id) {
        setLoading(true);
        try {
            var url = import.meta.env.VITE_API_URL + '/TodoList/Delete/' + id;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok) {
                await populateTodoData();
            }
            if (response.status == 400) {
                var responseTxt = await response.text();
                setError('Error deleting ToDo.' + responseTxt);
            }
            if (response.status == 404) {
                var responseTxt = await response.text();
                setError('Error deleting ToDo.' + responseTxt);

            }
        } catch (error) {
            console.error('Error deleting ToDo:', error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function UpdateTodo(id, updatedTodo) {
        setLoading(true);
        try {
            var url = import.meta.env.VITE_API_URL + '/TodoList/Update/' + id;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(updatedTodo)
            });
            if (response.ok) {
                await populateTodoData();
            }
            if (response.status == 400) {
                var responseTxt = await response.text();
                setError('Error updating ToDo.' + responseTxt);
             
            }

        } catch (error) {
            console.error('Error updating ToDo:', error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}


export default App;