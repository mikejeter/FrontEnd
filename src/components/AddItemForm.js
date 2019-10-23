import React, { useState } from 'react'

const AddItemForm = props => {
	const initialFormState = { id: null, name: '', description: '', price:'' }
	const [ item, setItem ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setItem({ ...item, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!item.name || !item.description) return

				props.addItem(item)
				setItem(initialFormState)
			}}
		>
			<label>Item Name</label>
			<input type="text" name="name" value={item.name} onChange={handleInputChange} />
			<label>Description</label>
			<input type="text" name="description" value={item.description} onChange={handleInputChange} />
			<label>Price</label>
			<input type="text" name="price" value={item.price} onChange={handleInputChange} />
			<button>Add new item</button>
		</form>
	)
}

export default AddItemForm