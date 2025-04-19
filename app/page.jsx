'use client';

import { useState } from 'react';
import UserForm from '@/components/Forms';
import UserTable from '@/components/Table';
import Button from '@/components/Buttons';
import Modal from '@/components/Modal';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, firstname: "Rorry", lastname: "Ramos", email: "Rorryramos@gmail.com" }
  ]);

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (userData) => {
    if (currentUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...user, ...userData } : user
      ));
    } else {
      // Add new user
      setUsers([...users, { id: Date.now(), ...userData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">User Management</h1>
          <Button 
            variant="primary" 
            onClick={() => handleOpenModal()}
          >
            + Add User
          </Button>
        </div>

        <UserTable 
          users={users} 
          onEdit={handleOpenModal} 
          onDelete={handleDelete} 
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UserForm
            user={currentUser}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default UsersPage;