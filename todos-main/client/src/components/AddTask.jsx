import { useState } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const AddTask = () => {
  const navigate = useNavigate();
  let [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });
  let [msg, setMsg] = useState(null);
  let [error, setError] = useState(null);
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') return;
  setOpen(false);
  setMsg(null);
  setError(null);
};


  let onChangeHandler = (event) => {
    const { name, value } = event.target;

    setForm((prevObj) => ({
      ...prevObj,
      [name]: value
    }));
  };

  let onSubmitHandler = (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/tasks/`, form)
      .then((res) => {
        console.log(`Responce when posting the task`,res)
        setMsg(res.data.message);
        setError(null);
        setForm({
          title: "",
          description: "",
          status: "pending",
          priority: "medium",
        });
        handleClick(); // 👈 Trigger snackbar    
        setTimeout(() => {
          navigate("/")
        }, 1000)    
      })
      .catch((err) => {
        setMsg(null);
        console.log(`Error while posting the task`,err)
        setError(err.response?.data?.message || "Something went wrong!");
        handleClick(); // 👈 Trigger snackbar
      });
  };


  let showSuccessErrorMsg = (msgType, msg) => {
    return <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // 👈 This is the key part
    >
      <Alert
        onClose={handleClose}
        severity={msgType}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {msg}
      </Alert>
    </Snackbar>
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg flex justify-center flex-col items-center">

      {
        msg && showSuccessErrorMsg("success", msg)
      }
      {
        error && showSuccessErrorMsg("error", error)
      }



      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Task</h2>
      <form className="w-[70%]" onSubmit={onSubmitHandler}>
        {/* Title */}
        <div className='py-2'>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChangeHandler}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className='py-2'>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border rounded-lg"
          ></textarea>
        </div>

        {/* Status */}
        <div className='py-2'>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className='py-3'>
          <label className="block font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Task
        </button>

      </form>
    </div>
  );
};

export default AddTask;
