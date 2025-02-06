# React UI Components

A modern collection of reusable React components including Table, Modal, and Drawer. Built with TypeScript and CSS.

## 🚀 Fonctionnalités

- 📱 **Responsive** - Tous les composants sont optimisés pour mobile
- 🌗 **Thème Sombre** - Support complet du mode sombre
- 🎨 **Personnalisable** - Styles facilement modifiables via Tailwind CSS
- 📦 **Léger** - Bundle size optimisé
- 🔒 **Type-safe** - Écrit en TypeScript avec des types complets
- ♿️ **Accessible** - Suit les meilleures pratiques ARIA

## 📦 Installation

Installez le package en utilisant votre gestionnaire de packages préféré :

### pnpm
```bash
pnpm add @cisseui/react-components
```

### npm
```bash
npm install @cisseui/react-components
```

### yarn
```bash
yarn add @cisseui/react-components
```

## 🛠️ Utilisation

```tsx
import { useState } from 'react';
import { Table, Modal, Drawer } from '@cisseui/react-components';

// Modal Example
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <div className="p-4">
          <h2>Modal Content</h2>
          <p>This is an example modal content.</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </>
  );
}

// Drawer Example
function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Open Drawer
      </button>

      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position="right"
        size="md"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Drawer Content</h2>
          <p>This is an example drawer content.</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Drawer
          </button>
        </div>
      </Drawer>
    </>
  );
}

// Table Example
function TableExample() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      stickyHeader
      hoverable
      striped
    />
  );
}

// Full Example with All Components
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal
        </button>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open Drawer
        </button>
      </div>

      {/* Table */}
      <Table
        data={[
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ]}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        stickyHeader
        hoverable
        striped
      />

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <div className="p-4">
          <h2>Welcome!</h2>
          <p>This is an example modal with a button to open/close it.</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Modal
          </button>
        </div>
      </Modal>

      {/* Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        position="right"
        size="md"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Drawer
          </button>
        </div>
      </Drawer>
    </div>
  );
}

## 🎨 Personnalisation

Les composants utilisent CSS pour le styling. Vous pouvez personnaliser l'apparence en :

1. Étendant les classes CSS dans votre configuration
2. Utilisant la prop `className` sur n'importe quel composant
3. Modifiant les variables CSS du thème

```js
// styles.css
:root {
  --primary-color: #3498db;
  --secondary-color: #f1c40f;
}
```

## 📝 Contribution

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 🙏 Remerciements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
