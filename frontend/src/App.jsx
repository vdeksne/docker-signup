import React, { useEffect, useState } from 'react'
import api from './api'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

// Main App component
export default function App() {
    // State for user list and currently editing user
    const [users, setUsers] = useState([])
    const [editing, setEditing] = useState(null)

    // Loads users from API and updates state
    async function load() {
        try {
            const u = await api.fetchUsers()
            setUsers(u)
        } catch (e) {
            console.error(e)
        }
    }

    // Load users on initial render
    useEffect(() => {
        load()
    }, [])

    // Handles creating a new user
    async function handleCreate(payload) {
        try {
            await api.createUser(payload)
            await load() // Refresh user list
        } catch (e) {
            alert(e.message)
        }
    }

    // Handles updating an existing user
    async function handleUpdate(payload) {
        try {
            await api.updateUser(editing.id, payload)
            setEditing(null) // Exit edit mode
            await load() // Refresh user list
        } catch (e) {
            alert(e.message)
        }
    }

    // Handles deleting a user
    async function handleDelete(id) {
        if (!confirm('Delete user?')) return
        try {
            await api.deleteUser(id)
            await load() // Refresh user list
        } catch (e) {
            alert(e.message)
        }
    }

    // Render form and user list
    return (
        <div className="app">
            <h1>User Registration</h1>
            {/* UserForm handles both create and update, depending on editing state */}
            <UserForm
                onSubmit={editing ? handleUpdate : handleCreate}
                initial={editing}
                onCancel={() => setEditing(null)}
            />

            <h2>Registered users</h2>
            {/* UserList displays users and provides edit/delete actions */}
            <UserList
                users={users}
                onEdit={(u) => setEditing(u)}
                onDelete={handleDelete}
            />
        </div>
    )
}
