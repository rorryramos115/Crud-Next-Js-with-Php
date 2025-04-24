// create .env file put the url of your Api.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
    const response = await fetch(`${API_URL}get_user_details`);
    if ( !response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.message; 
}

export const addUser = async (userData) => {
    const response = await fetch(`${API_URL}add_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if ( !response.ok ) {
        throw new Error("Failed to add user.");
    }
    const data = await response.json();
    return data;
}

export const updateUser = async (userData) => {
    const response = await fetch(`${API_URL}update_user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if( !response.ok ) {
        throw new Error('Failed to update user.');
    }
    const data = response.json();
    return data;
}

export const deleteUser = async (user_id) => {
    const response = await fetch(`${API_URL}delete_user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }) 
    });

    if ( !response.ok ) {
        throw new Error('Failed to delete user.')
    }

    return response.json();
}