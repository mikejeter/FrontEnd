import React, { useState, useEffect } from 'react'

const EditItemForm = props => {
  const [ item, setItem ] = useState(props.currentItem)

  useEffect(
    () => {
      setItem(props.currentItem)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateItem(item.id, item)
      }}
    >
      <label>Item Name</label>
      <input type="text" name="name" value={item.name} onChange={handleInputChange} />
      <label>Description</label>
      <input type="text" name="description" value={item.description} onChange={handleInputChange} />
      <label>Price</label>
      <input type="text" name="price" value={item.price} onChange={handleInputChange} />
      <button>Update item</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditItemForm