# React UI Components

Une collection moderne de composants React réutilisables, comprenant Table, Modal et Drawer. Construite avec TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- 📱 **Responsive** - Tous les composants sont optimisés pour mobile
- 🌗 **Thème Sombre** - Support complet du mode sombre
- 🎨 **Personnalisable** - Styles facilement modifiables via Tailwind CSS
- 📦 **Léger** - Bundle size optimisé
- 🔒 **Type-safe** - Écrit en TypeScript avec des types complets
- ♿️ **Accessible** - Suit les meilleures pratiques ARIA

## 📦 Installation

Tout d'abord, créez ou éditez `.npmrc` à la racine de votre projet :

```
@tcisse:registry=https://npm.pkg.github.com
```

Ensuite, installez le package en utilisant votre gestionnaire de packages préféré :

### pnpm
```bash
pnpm add @tcisse/react-components
```

### npm
```bash
npm install @tcisse/react-components
```

### yarn
```bash
yarn add @tcisse/react-components
```

## 🛠️ Utilisation

### Table Component

Un composant de table moderne avec support pour les en-têtes fixes, le tri, et plus encore.

```tsx
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@cisseui/react-ui-components';

function UserTable() {
  return (
    <Table striped hoverable>
      <TableHeader sticky>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead align="right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell align="right">
            <button>Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

#### Props de Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| stickyHeader | boolean | false | Fixe l'en-tête lors du défilement |
| striped | boolean | false | Ajoute des rayures alternées aux lignes |
| hoverable | boolean | false | Ajoute un effet hover aux lignes |
| compact | boolean | false | Réduit l'espacement |
| bordered | boolean | false | Ajoute des bordures |

### Modal Component

Un composant modal flexible avec support pour différentes tailles et animations.

```tsx
import { Modal } from '@cisseui/react-ui-components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Titre du Modal"
      size="md"
    >
      <p>Contenu du modal...</p>
    </Modal>
  );
}
```

#### Props de Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | - | Contrôle la visibilité |
| onClose | function | - | Callback de fermeture |
| title | string | - | Titre du modal |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Taille du modal |
| closeOnClickOutside | boolean | true | Ferme au clic extérieur |
| closeOnEsc | boolean | true | Ferme avec la touche Echap |

### Drawer Component

Un composant drawer/sidebar avec support pour différentes positions et tailles.

```tsx
import { Drawer } from '@cisseui/react-ui-components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      size="md"
    >
      <div className="p-4">
        <h2>Menu</h2>
        <nav>{/* ... */}</nav>
      </div>
    </Drawer>
  );
}
```

#### Props de Drawer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | - | Contrôle la visibilité |
| onClose | function | - | Callback de fermeture |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | 'right' | Position du drawer |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Taille du drawer |
| overlay | boolean | true | Affiche un overlay sombre |

## 🎨 Personnalisation

Les composants utilisent Tailwind CSS pour le styling. Vous pouvez personnaliser l'apparence en :

1. Étendant les classes Tailwind dans votre configuration
2. Utilisant la prop `className` sur n'importe quel composant
3. Modifiant les variables CSS du thème

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          // ...
          900: '#0f172a',
        },
      },
    },
  },
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
- [Tailwind CSS](https://tailwindcss.com/)
