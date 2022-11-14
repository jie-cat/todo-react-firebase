import React, { useState, useEffect } from "react";
// react-icons
import { IoMdAdd } from "react-icons/io";
// Components
import Todo from "../components/Todo";
// Firebase
import {
  query,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
// auth
import { UserAuth } from "../contexts/AuthContext";

const style = {
  container: `bg-slate-100 max-w-xl m-auto rounded-lg p-5 mt-24`,
  heading: `text-4xl text-center py-2 font-bold`,
  form: `flex justify-between`,
  input: `w-full px-2 py-5 outline-none text-xl`,
  button: `p-4 bg-pink-500 ml-3 text-slate-100`,
  count: `text-center`,
};

const Home = () => {
  // 存todos資料
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const { user } = UserAuth();

  // Firebase CRUD
  // Create todo to firebase
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please input valid todo");
      return;
    }
    if (user?.email) {
      await addDoc(collection(db, user.email), {
        text: input,
        completed: false,
      });
      setInput("");
    } else {
      alert("Please login to save todo!");
    }

    setInput("");
  };

  // Read todo from Firebase
  useEffect(() => {
    const q = query(collection(db, `${user?.email}`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });

    return () => unsubscribe();
  }, [user?.email]);

  // Update todo checkbox in Firebase
  const toggleComplete = async (todo) => {
    const taskID = doc(db, `${user?.email}`, todo.id);

    await updateDoc(taskID, {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, user.email, id));
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.heading}>Todo App</h1>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={style.input}
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <IoMdAdd size={30} />
          </button>
        </form>
        <ul>
          {todo.map((item, index) => {
            return (
              <Todo
                task={item}
                key={index}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            );
          })}
        </ul>

        {todo.length < 1 ? null : (
          <p className={style.count}>{`You have ${todo.length} todo.`}</p>
        )}
      </div>
    </>
  );
};

export default Home;
