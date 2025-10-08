import React from 'react'

export default function UserList({ users, onEdit, onDelete }) {
    if (!users || users.length === 0) return <div className="empty">No users registered yet.</div>

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u.id}>
                            <td>{i + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td className="actions">
                                <button onClick={() => onEdit(u)}>Edit</button>
                                <button onClick={() => onDelete(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className="json-output">
                <h3>Registered Users (Raw JSON)</h3>
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </section>
        </>
    )
}
