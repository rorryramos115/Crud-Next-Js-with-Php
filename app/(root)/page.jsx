'use client';

import { useEffect, useState } from 'react';
import UserForm from '@/components/Forms';
import Table from '@/components/Table';
import Button from '@/components/Buttons';
import Modal from '@/components/Modal';
import { getUsers, addUser, updateUser, deleteUser } from '@/lib/api';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [])

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
    setError(null)
  };

  const handleSubmit = async (userData) => {
    try {
      setIsLoading(true);
      if (currentUser) {
        const updateData = { ...userData, user_id: currentUser.user_id };
        updateUser(updateData);
        
        // this method comented is get data or update in real time, if you want to add this kind of method
        // you need to implement the real time database or backend or use Polling method, 
        // !!note Polling method is not recommended in medium to large project
        // setUsers(users.map(user => 
        //   user.user_id === currentUser.user_id ? updatedUser : user
        // ));
      } else {
        addUser(userData);
        // this method comented is get data or update in real time, if you want to add this kind of method
        // you need to implement the real time database or backend or use Polling method, 
        // !!note Polling method is not recommended in medium to large project
        // const newUser = await addUser(userData); 
        // setUsers([...users, newUser]);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && users.length === 0) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  console.log("Fetch user data: ", users)

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className='text-center font-bold text-5xl text-white mb-10'>Crud Next Js/Php</h1>
      <div className="w-full max-w-4xl bg-gray-400 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">User Management</h1>
          <Button 
            variant="primary" 
            onClick={() => handleOpenModal()}
          >
            + Add User
          </Button>
        </div>

        {isLoading && <div className='text-center p-4'>Processing....</div>}

        <Table 
          users={users} 
          onEdit={handleOpenModal} 
          onDelete={handleDelete} 
          isLoading={isLoading}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UserForm
            user={currentUser}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            isLoading={isLoading}
            error={error}
          />
        </Modal>
      </div>
    </div>
  );
};

export default UsersPage;