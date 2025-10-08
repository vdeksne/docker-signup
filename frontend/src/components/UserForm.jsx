import React, { useState, useEffect } from 'react'

/**
 * UserForm component allows creating or editing a user.
 * 
 * Props:
 * - onSubmit: function to call with { name, email } when form is submitted
 * - initial: optional object { name, email } for editing an existing user
 * - onCancel: optional function to call when cancel button is clicked (edit mode)
 * 
 * State:
 * - name: stores the user's name input
 * - email: stores the user's email input
 * 
 * Behavior:
 * - If `initial` is provided, pre-fills the form for editing
 * - On submit, calls `onSubmit` with the current name and email
 * - Shows a Cancel button in edit mode
 */
export default function UserForm({ onSubmit, initial = null, onCancel }) {
    // State for form fields
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // Effect to update form fields when `initial` changes
    useEffect(() => {
        if (initial) {
            setName(initial.name || '')
            setEmail(initial.email || '')
        } else {
            setName('')
            setEmail('')
        }
    }, [initial])

    // Handles form submission
    function submit(e) {
        e.preventDefault()
        onSubmit({ name, email })
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: 20 }}>
            <div className="row">
                <div className="col">
                    <label>
                        Name: 
                        <input
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="col">
                    <label>
                        Email: 
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
            </div>
            <div style={{ marginTop: 8 }}>
                <button type="submit">{initial ? 'Update' : 'Register'}</button>
                {initial && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ marginLeft: 8 }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}
