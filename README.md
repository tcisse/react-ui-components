# @cisseui/react-components

A modern React component library featuring Table, Modal, Drawer, and PricingTable components. Built with TypeScript and styled with Tailwind CSS.

## 📚 Documentation

### Table des matières

1. [Installation](#-installation)
2. [Quick Start](#-quick-start)
3. [Components](#-components)
   - [Modal Component](#modal-component)
   - [Drawer Component](#drawer-component)
   - [Table Component](#table-component)
   - [PricingTable Component](#pricingtable-component)
4. [Features](#-features)
5. [Customization](#-customization)
6. [Props](#-props)
   - [Table Props](#table)
   - [TableHead Props](#tablehead)
   - [TableHeadCell Props](#tableheadcell)
   - [TableCell Props](#tablecell)
7. [License](#-license)

## 📦 Installation

```bash
npm install @cisseui/react-components
# or
yarn add @cisseui/react-components
# or
pnpm add @cisseui/react-components
```

## 🚀 Quick Start

```tsx
import { Modal, Drawer, Table, PricingTable } from '@cisseui/react-components';
```

## 🛠️ Components

### Modal Component

A flexible modal dialog component with customizable content, animations, and backdrop.

```tsx
import { Modal } from '@cisseui/react-components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <div className="p-6">
          <h2>Modal Content</h2>
          <p>This is an example modal dialog</p>
        </div>
      </Modal>
    </>
  );
}
```

### Drawer Component

A sliding drawer component that can appear from any edge of the screen.

```tsx
import { Drawer } from '@cisseui/react-components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      
      <Drawer 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Drawer"
        position="right"
      >
        <div className="p-6">
          <h2>Drawer Content</h2>
          <p>This is an example drawer</p>
        </div>
      </Drawer>
    </>
  );
}
```

### Table Component

A modern and flexible table component with support for custom styling, dark mode, and responsive design.

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from '@cisseui/react-components';

function App() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <Table>
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
  );
}
```

### PricingTable Component

A flexible pricing comparison table component with multiple layout variants, perfect for SaaS pricing pages.

```tsx
import { PricingTable, PricingPlan } from '@cisseui/react-components';

function App() {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals',
      price: 9,
      period: 'month',
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: true },
        { name: 'Feature 3', included: false },
      ],
      ctaLabel: 'Get Started',
      ctaAction: () => console.log('Starter selected'),
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for teams',
      price: 29,
      period: 'month',
      popular: true,
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: true },
        { name: 'Feature 3', included: true },
      ],
      ctaLabel: 'Start Free Trial',
      ctaAction: () => console.log('Pro selected'),
    },
  ];

  return (
    <PricingTable
      plans={plans}
      variant="cards" // 'table' | 'cards' | 'minimal' | 'featured'
      highlightedPlanId="pro"
      headerTitle="Choose Your Plan"
      headerDescription="Select the perfect plan for your needs"
    />
  );
}
```

#### Variants

- **`table`** (default): Classic comparison table with feature rows, perfect for detailed feature comparison
- **`cards`**: Modern card-based layout with side-by-side plans, great for modern websites
- **`minimal`**: Clean and minimal design, ideal for a subtle and elegant look
- **`featured`**: Prominent featured plan at the top with other plans below, perfect for highlighting a recommended plan

#### Props

##### PricingTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| plans | PricingPlan[] | - | Array of pricing plans to display |
| variant | 'table' \| 'cards' \| 'minimal' \| 'featured' | 'table' | Layout variant |
| highlightedPlanId | string | - | ID of the plan to highlight |
| className | string | - | Additional CSS classes |
| showHeader | boolean | true | Show header section |
| headerTitle | string | 'Choose Your Plan' | Header title |
| headerDescription | string | - | Header description |

##### PricingPlan

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | Unique identifier for the plan |
| name | string | - | Plan name |
| description | string | - | Plan description |
| price | string \| number | - | Plan price |
| period | string | - | Billing period (e.g., 'month', 'year') |
| currency | string | '$' | Currency symbol |
| features | PricingFeature[] | - | Array of plan features |
| ctaLabel | string | - | Call-to-action button label |
| ctaAction | () => void | - | Callback when CTA is clicked |
| popular | boolean | false | Mark plan as popular |
| badge | string | - | Custom badge text |

##### PricingFeature

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | Feature name |
| included | boolean | true | Whether feature is included |
| value | string \| ReactNode | - | Custom value to display instead of checkmark |

#### Props

##### Table
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Table content |

##### TableHead
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Header content |

##### TableHeadCell
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Cell content |

##### TableCell
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Cell content |

## ✨ Features

- 🎨 Modern design with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive and mobile-friendly
- ♿ Accessible (ARIA compliant)
- 🔒 TypeScript support
- 🎯 Zero-dependency (except for React and Tailwind)
- 🚀 Tree-shakeable
- 📦 Small bundle size

## 🎨 Customization

All components can be customized using:

1. **Tailwind Classes**: Use the `className` prop to extend or override default styles
2. **Theme**: Components automatically adapt to your Tailwind theme configuration
3. **Props**: Each component has specific props for customization

## 🔧 Props

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Controls the visibility of the modal |
| onClose | () => void | - | Callback when modal is closed |
| title | string | - | Modal title |
| children | ReactNode | - | Modal content |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Modal size |

### Drawer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Controls the visibility of the drawer |
| onClose | () => void | - | Callback when drawer is closed |
| title | string | - | Drawer title |
| children | ReactNode | - | Drawer content |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | 'right' | Drawer position |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Drawer size |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
