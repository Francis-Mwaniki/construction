// components/DeleteComponent.js

import { useState } from 'react';
import toast from 'react-hot-toast';

interface DeleteComponentProps {
    onDelete: () => void;
    }


const DeleteComponent = ({ onDelete }: DeleteComponentProps) => {
  const [confirmInput, setConfirmInput] = useState('');

  const handleDelete = () => {
    // Check if the confirmation input matches the expected value
    if (confirmInput === 'DELETE') {
      onDelete();
    } else {
      toast.error('Incorrect confirmation input',
      {style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      duration: 4000,
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      }}
        );
    }
  };

  return (
    <div className="bg-white p-4  rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Confirm Deactivate</h2>
      <p className="mb-4">To confirm deactivate, type <strong className=' font-extrabold text-red-600'>DEACTIVATE</strong> in the input below:</p>

      <input
        type="text"
        value={confirmInput}
        placeholder='DEACTIVATE'
        onChange={(e) => setConfirmInput(e.target.value)}
        className="border rounded p-2 mb-4 border-red-300"
      />

      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Deactivate
        </button>
        <button
          onClick={() => setConfirmInput('')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteComponent;