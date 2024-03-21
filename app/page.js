'use client';  //執行過程在client上顯示

import { useState, useRef, useEffect } from "react";

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qukpvxlkhstaagtdpwau.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY /*環境變數將key擋起來 */
const supabase = createClient(supabaseUrl, supabaseKey)
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

export default function Home() {
  const [allTodos, setTodos] = useState([]);
  const inputRef = useRef(null);  //initialization
  useEffect(() => {
    async function FetchTodos() { //async:等待完成後再執行下一行
      let { data: todos, error } = await supabase
      .from('todos')
        .select('*')  
      
      setTodos(todos);
    }
    FetchTodos();
   }, []);

  function Todo({ todo }) {
    return (
      <div className={`horizon-card todo ${todo.done ? 'finished' : ''}`}>    
        <button className="checkbox" onClick={async () => {
          const { data, error } = await supabase
          .from('todos')
          .update({ done: !todo.done })
          .eq('id', todo.id)
          .select()
          


          const newTodos = allTodos.map((tempTodo) => {
            if (tempTodo.id === todo.id) {
              return data[0];
            }
            return tempTodo;
          }); 
          setTodos(newTodos);
        }}></button>
        <div className="name">{todo.name}</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="title">TODO</div>
      <div className="horizon-card todo-creator">
        <button className="checkbox add-button" onClick={async () => {

          if (inputRef.current.value !== "") {
            const {data} = await supabase
            .from('todos')
            .insert([
            { done: false ,name: inputRef.current.value},
          ])
            .select() //新增後直接讀取值
          console.log(data)
          setTodos([data[0], ...allTodos]); //重新渲染
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
