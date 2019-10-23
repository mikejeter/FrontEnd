import React, { useState, Fragment } from 'react'
import AddItemForm from './components/AddItemForm'
import EditItemForm from './components/EditItemForm'
import ItemTable from './tables/ItemTable'

const App = () => {
	// Data
	const itemsData = [
		{ id: 1, name: 'Eggs', description: 'Animal Products', price: '$2.00' },
		{ id: 2, name: 'Goat Meat', description: 'Livestock', price: '$10.00' },
		{ id: 3, name: 'Exotic Chicken', description: 'Poultry', price: '$6.50' },
	]

	const initialFormState = { id: null, name: '', description: '', price: '' }

	// Setting state
	const [ items, setItems ] = useState(itemsData)
	const [ currentItem, setCurrentItem ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addItem = item => {
		item.id = items.length + 1
		setItems([ ...items, item ])
	}

	const deleteItem = id => {
		setEditing(false)

		setItems(items.filter(item => item.id !== id))
	}

	const updateItem = (id, updatedItem) => {
		setEditing(false)

		setItems(items.map(item => (item.id === id ? updatedItem : item)))
	}

	const editRow = item => {
		setEditing(true)

		setCurrentItem({ id: item.id, name: item.name, description: item.description, price: item.price })
	}

	return (
		<div className="container">
			<h1>African Marketplace Product List</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit item</h2>
							<EditItemForm
								editing={editing}
								setEditing={setEditing}
								currentItem={currentItem}
								updateItem={updateItem}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add item</h2>
							<AddItemForm addItem={addItem} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View items</h2>
					<ItemTable items={items} editRow={editRow} deleteItem={deleteItem} />
				</div>
			</div>
		</div>
	)
}

export default App
