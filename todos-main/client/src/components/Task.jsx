import { useEffect, useState } from 'react';
import axios from "axios";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router-dom';

const Task = () => {
    let [data, setData] = useState([]);
    let navigate = useNavigate()
   

    useEffect(() => {
        console.log(`${import.meta.env.VITE_API_URL}`);
        console.log(`${import.meta.env.VITE_API_URL}/tasks`);
        console.log(axios.get(`${import.meta.env.VITE_API_URL}/tasks`));
        axios.get(`${import.meta.env.VITE_API_URL}/tasks/`).then((res) => {
            let tasks = res.data.tasks;
            console.log(`Data from axios.get to Fetch tasks`,res)
            setData(tasks);
        }).catch(er => {
            console.log(er)
        })
    }, []);


    let onChangeHandler = (e, taskId) => {
        let updateObject = {
            [e.target.name]: e.target.value
        }

        axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, updateObject).then((res) => {
            // Option 1: Re-fetch all tasks (simple, safe)

           axios.get(`${import.meta.env.VITE_API_URL}/tasks`).then((res) => {
                setData(res.data.tasks);
            }).catch((err) => {
                console.log(err.data.message)
            });
        })
    }

    let deleteTask = (e, taskId) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/`)
            .then(() => {
                // Remove deleted task from local state
                setData(prev => prev.filter(task => task._id !== taskId));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div>
                {data.map((task, idx) => {

                    const statusStyling = {
                        textDecoration: task.status === "completed" ? 'line-through #333' : 'none',
                        color: task.status === "pending" ? 'orange' :
                            task.status === "in-progress" ? 'green' : "blue",
                    };

                    const backgroundColorStyling = {
                        backgroundColor: task.status === "pending" ? '#eef12c55' :
                            task.status === "in-progress" ? '#22ff2266' : "#2244ff44"
                    }

                    const taskId = task._id;

                    return (
                        <div
                            key={idx}
                            className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border p-4 m-4 rounded-xl bg-white shadow-sm'
                            style={backgroundColorStyling}
                        >

                            <button onClick={(e) => { deleteTask(e, task._id) }} >
                                <DeleteForeverOutlinedIcon className='hover:text-red-600 cursor-pointer' titleAccess={`Delete Task :  ${task.title}`} />
                            </button>

                            {/* Left Section */}
                            <div className='flex items-start gap-4 w-full md:w-[70%]'>
                                <div className='flex flex-col'>
                                    <h2 className='text-xl font-semibold text-blue-600' style={statusStyling}>{task.title}</h2>
                                    <p className='text-gray-800 font-semibold'>{task.description}</p>
                                </div>
                            </div>

                            {/* Middle Section - Status & Priority */}
                            <div className='flex items-center gap-4'>
                                <select
                                    value={task.status}
                                    style={statusStyling}
                                    onChange={(e) => { onChangeHandler(e, task._id) }}
                                    name='status'
                                    className='px-2 py-1 rounded-md bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                >
                                    <option value="pending" className='text-yellow-400'>Pending</option>
                                    <option value="in-progress" className='text-green-600'>In Progress</option>
                                    <option value="completed" className='text-blue-700'>Completed</option>
                                </select>

                                <span className='px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full capitalize'>
                                    {task.priority}
                                </span>
                            </div>

                            {/* Right Section - Date */}
                            <div className='text-sm text-gray-500'>
                                {new Date(task.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )

}

export default Task;