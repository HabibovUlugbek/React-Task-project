import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }else {
    return [];
  }
}

function App() {
  
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:"", type:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //Alert
      showAlert(true, "danger","Please enter value")
    } else if (name && isEditing) {
      //edit
      setList(list.map((item)=> {
        if(item.id === editID){
          return {...item ,title:name}
        }
        return item; 
      }));
      setName("");
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "success","Item value changed")
    }else {
      showAlert(true, "success","Added item")
      const newItem = {id:new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName("");
    }
  }
  
  const showAlert = (show=false,type="",msg="" ) => {
      setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true,'danger', "Deleted all item");
    setList([]);
  }

  const removedItem = (id) =>{
    showAlert(true, "danger","Removed item")
    setList(list.filter(item => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find(item => item.id  === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list" , JSON.stringify(list))    
  }, [list])

  return (
  <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Grocery bud</h3>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g egg" 
          value={name} 
          onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="submit-btn">
          {isEditing ? "Edit" : "Add"}
        </button>
      </div>
    </form>
    {
      list.length > 0  && (
        <div className="grocery-container">
            <List items={list} removedItem={removedItem} editItem={editItem} />
             <button onClick={clearList} className="clear-btn">Delete</button>
        </div>
      )
    }
  </section>
  );
}

export default App
