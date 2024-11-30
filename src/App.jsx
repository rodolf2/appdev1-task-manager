import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  IoIosCheckmarkCircleOutline,
  IoIosHourglass,
  IoIosTrash,
  IoIosAdd,
} from "react-icons/io";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const collectionRef = collection(db, "tasks");
      const querySnapshot = await getDocs(collectionRef);
      const tasks = querySnapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "tasks");

    const docRef = await addDoc(collectionRef, {
      title: title,
      description: description,
      status: "pending",
    });

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: docRef.id,
        title: title,
        description: description,
        status: "pending",
      },
    ]);

    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id) => {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleStatus = async (id) => {
    try {
      const itemRef = doc(db, "tasks", id);
      const currentTask = await getDoc(itemRef);
      const currentStatus = currentTask.data().status;
      const newStatus = currentStatus === "pending" ? "completed" : "pending";

      await updateDoc(itemRef, {
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="formStyle mb-4">
          {" "}
          <h3 className="text-lg font-bold mb-4">Add Task</h3>
          <form onSubmit={addTask} className="space-y-4">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              required
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="desc"
              placeholder="Description"
              value={description}
              required
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
            >
              <IoIosAdd className="mr-1" />
              Add Task
            </button>
          </form>
        </div>

        <div className="w-full max-w-md">
          {" "}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-3 mb-2 rounded shadow flex flex-col justify-between"
            >
              <div>
                <div className="mb-1">
                  <span className="font-semibold">Title:</span> {task.title}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {task.description}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Status:</span>
                  <button
                    onClick={() => handleStatus(task.id)}
                    className={`p-1 rounded hover:opacity-80 ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    } text-white flex items-center`}
                  >
                    {task.status === "completed" ? (
                      <>
                        <IoIosCheckmarkCircleOutline className="mr-1" />
                        {task.status}
                      </>
                    ) : (
                      <>
                        <IoIosHourglass className="mr-1" />
                        {task.status}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 flex items-center mx-auto mt-2"
              >
                <IoIosTrash className="mr-1" />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
