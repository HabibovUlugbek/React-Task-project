import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items ,removedItem , editItem}) => {
  return (

  <div className="grocery-list">
    {items.map((item) => {
      const {id, title} = item;
        return(
          <article key={id} className="grocery-item">
              <p className="title">{title}</p>
              <div className="btn-container">
                <button type="button" onClick={() => editItem(id)} className="edit-btn"><FaEdit /></button>
                <button type="button" onClick={() => removedItem(id)} className="delete-btn"><FaTrash /></button>
              </div>
        </article>
        )
    })}
  </div>
  );
}

export default List
