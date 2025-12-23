import React, { useState } from 'react'
import { Modal } from '../../src/components/Modal/Modal'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from '../../src/components/Table/Table'
import { Drawer } from '../../src/components/Drawer/Drawer'
import { PricingTable, PricingPlan } from '../../src/components/PricingTable/PricingTable'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: 9,
      period: 'month',
      currency: '$',
      features: [
        { name: 'Up to 5 projects', included: true },
        { name: '5GB storage', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom domain', included: false },
        { name: 'Team members', value: '1' },
      ],
      ctaLabel: 'Get Started',
      ctaAction: () => {
        alert('Starter plan selected!');
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing teams and businesses',
      price: 29,
      period: 'month',
      currency: '$',
      popular: true,
      badge: 'Most Popular',
      features: [
        { name: 'Up to 5 projects', included: true },
        { name: '5GB storage', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Team members', value: 'Up to 10' },
      ],
      ctaLabel: 'Start Free Trial',
      ctaAction: () => {
        alert('Professional plan selected!');
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: 99,
      period: 'month',
      currency: '$',
      features: [
        { name: 'Up to 5 projects', included: true },
        { name: '5GB storage', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Team members', value: 'Unlimited' },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true },
      ],
      ctaLabel: 'Contact Sales',
      ctaAction: () => {
        alert('Enterprise plan selected!');
      },
    },
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
        position="left"
        size='md'
        className='bg-white'
        closeOnClickOutside={false}
        closeOnEsc={false}
      >
        <div className="p-6">
          <h2>Drawer Content</h2>
          <p>This is an example drawer</p>
        </div>
      </Drawer>

      {/* Pricing Tables with Different Variants */}
      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Pricing Table - Table Variant</h2>
        <PricingTable
          plans={pricingPlans}
          highlightedPlanId="professional"
          headerTitle="Pricing Plans"
          headerDescription="Choose the perfect plan for your needs. All plans include a 14-day free trial."
          variant="table"
        />
      </div>

      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Pricing Table - Cards Variant</h2>
        <PricingTable
          plans={pricingPlans}
          highlightedPlanId="professional"
          headerTitle="Pricing Plans"
          headerDescription="Choose the perfect plan for your needs. All plans include a 14-day free trial."
          variant="cards"
        />
      </div>

      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Pricing Table - Minimal Variant</h2>
        <PricingTable
          plans={pricingPlans}
          highlightedPlanId="professional"
          headerTitle="Pricing Plans"
          headerDescription="Choose the perfect plan for your needs. All plans include a 14-day free trial."
          variant="minimal"
        />
      </div>

      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Pricing Table - Featured Variant</h2>
        <PricingTable
          plans={pricingPlans}
          highlightedPlanId="professional"
          headerTitle="Pricing Plans"
          headerDescription="Choose the perfect plan for your needs. All plans include a 14-day free trial."
          variant="featured"
        />
      </div>
    </div>
  )
}

export default App
