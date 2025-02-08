import React, { useState } from 'react'
import { Modal } from '../../src/components/Modal/Modal'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from '../../src/components/Table/Table'
import { Drawer } from '../../src/components/Drawer/Drawer'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">React UI Components Demo</h1>
      
      <div className="mb-8">
        <button 
          onClick={() => setIsOpen(true)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Open Modal
        </button>
        <button onClick={() => setDrawerOpen(true)}>Open Drawer</button>
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          title="User Details"
          size="lg"
          className='bg-white'
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">Modal Content</h2>
            <p className="text-gray-600 mb-4">This modal shows the details of our users.</p>
          </div>
        </Modal>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Users Table</h2>
        <Table bordered className=''>
          <TableHead>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Drawer 
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Example Drawer"
        position="right"
        size='md'
        className='bg-white'
      >
        <div className="p-6">
          <h2>Drawer Content</h2>
          <p>This is an example drawer</p>
        </div>
      </Drawer>
    </div>
  )
}

export default App
