# @cisseui/react-components

A modern React component library featuring Table, Modal, and Drawer components. Built with TypeScript and styled with Tailwind CSS.

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
import { Modal, Drawer, Table } from '@cisseui/react-components';
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

#### Features

- 🎨 Modern design with hover states and transitions
- 🌙 Dark mode support out of the box
- 📱 Responsive with horizontal scrolling
- ♿ Semantic HTML and ARIA attributes
- 🎯 TypeScript support with full type definitions
- 🎨 Customizable via Tailwind classes

#### Available Components

- `Table`: Main container component
- `TableHead`: Table header section
- `TableHeadCell`: Header cell with distinct styling
- `TableBody`: Table body section
- `TableRow`: Table row with hover and selection states
- `TableCell`: Standard table cell

#### Props

##### Table Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Table content |

##### TableHead Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Header content |

##### TableHeadCell Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Cell content |

##### TableCell Props
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

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Controls the visibility of the modal |
| onClose | () => void | - | Callback when modal is closed |
| title | string | - | Modal title |
| children | ReactNode | - | Modal content |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Modal size |

### Drawer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Controls the visibility of the drawer |
| onClose | () => void | - | Callback when drawer is closed |
| title | string | - | Drawer title |
| children | ReactNode | - | Drawer content |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | 'right' | Drawer position |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Drawer size |

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📝 License

MIT 
