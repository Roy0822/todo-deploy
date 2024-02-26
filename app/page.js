'use client';  //執行過程在client上顯示

import { useState, useRef } from "react";
/*
  const [variable, functionName] = useState(5); initial value of variable
    使用 useState 時，每次點擊都會重新渲染。

  const refContainer = useRef(initialValue); 綁定在某物件上

    ref回傳的是一個裡面只有 current 屬性的 ref object，可以得到首次 render 時的 DOM 節點
    變更 current 屬性時不會觸發重新 render
    使用 useRef() 時，只有首次渲染時會印出 render



    const newArrayName = array1.map((variable) => variable....  ); 
    建立新陣列，內容為array1所有元素經後面操作的值
    裡面用{}包起來，可以用javascript語法
*/

const ExampleTodos = [
  {
    id: 1,          //ID is in charge of identifying todo things
    name: "Calculus HW2",
    done: false,
  },
  {
    id: 2,
    name: "Side Project Figma",
    done: false,
  },
  {
    id: 3,
    name: "Course Slide",
    done: false,
  },
  {
    id: 4,
    name: "Write Blog Post",
    done: true,
  },
  {
    id: 5,
    name: "Test",
    done: true,
  },
];

export default function Home() {
  const [allTodos, setTodos] = useState(ExampleTodos);
  const inputRef = useRef(null);  //initialization

  function Todo({ todo }) {
    return (
      <div className={`horizon-card todo ${todo.done ? 'finished' : ''}`}>    
        <button className="checkbox" onClick={() => {
          const newTodos = allTodos.map((tempTodo) => {
            if (tempTodo.id === todo.id) {
              return {
                ...tempTodo,
                done: !tempTodo.done,
              }
            }
            return tempTodo;
          });
          setTodos(newTodos); //重新渲染
        }}></button>
        <div className="name">{todo.name}</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="title">TODO</div>
      <div className="horizon-card todo-creator">
        <button className="checkbox add-button" onClick={() => {
          if (inputRef.current.value !== "") {
            setTodos([{
            id: allTodos.length + 1,
            name: inputRef.current.value,
            done: false,
          }, ...allTodos])
          inputRef.current.value = '';    //after input, clean the input column
          }

        }}>+</button>


        
        <input
          ref={inputRef}
          type="text"
          className="input"
          placeholder="Create a new todo ..."
        />
      </div>
      <div className="todo-list">
        {allTodos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}
