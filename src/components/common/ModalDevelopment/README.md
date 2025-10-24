# ModalDevelopment Component

Development stage modal component with timeline and progress indicators.

## 📁 Klasör Yapısı

```
src/components/common/ModalDevelopment/
├── config.ts          # Component configuration
├── types.ts           # TypeScript type definitions
├── hooks.ts           # Custom React hooks
├── utils.ts           # Utility functions
├── TimelineDot.tsx    # Timeline dot component
├── index.tsx          # Main modal component
└── README.md          # Documentation
```

## 🚀 Kullanım

### Temel Kullanım
```tsx
import ModalDevelopment from '@/components/common/ModalDevelopment';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Launch App
      </button>
      
      <ModalDevelopment 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

### Header'da Kullanım
```tsx
// src/components/layout/Header/LaunchButton.tsx
import ModalDevelopment from '@/components/common/ModalDevelopment';

export default function LaunchButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Launch App
      </Button>
      
      <ModalDevelopment 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

## 🎯 Özellikler

- **Timeline Design**: Dikey çizgili timeline ile geliştirme aşamaları
- **Renkli Dots**: Gri (tamamlandı), Turuncu (devam ediyor), Yeşil (gelecek)
- **Dark Theme**: Modern koyu tema tasarımı (config/colors.ts'den)
- **Responsive**: Mobil ve desktop uyumlu
- **Accessibility**: ARIA labels ve keyboard navigation
- **Smooth Animations**: Fade in/out geçişleri
- **Click Outside**: Modal dışına tıklayarak kapatma
- **ESC Key**: ESC tuşu ile kapatma
- **Thin Design**: Resme uygun ince ve uzun tasarım

## 🔧 Konfigürasyon

### Development Phases
```typescript
phases: {
  initial: {
    status: 'completed',
    color: 'bg-gray-500',
    title: 'Grey dot: Initial Phase',
    description: 'Completed'
  },
  development: {
    status: 'current',
    color: 'bg-orange-500',
    title: 'Orange dot: Development Stage',
    description: 'We\'re currently at this stage...'
  },
  test: {
    status: 'upcoming',
    color: 'bg-green-500',
    title: 'Green dot: Test Stage',
    description: 'Access will be activated...'
  }
}
```

### Styling (config/colors.ts'den)
```typescript
classes: {
  overlay: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50',
  container: 'bg-black border border-gray-600 rounded-xl shadow-2xl',
  content: 'flex flex-col h-full'
}
```

### Animations
```typescript
animations: {
  duration: 'duration-300',
  enter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out',
  exit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-4 duration-200 ease-in',
  overlayEnter: 'animate-in fade-in-0 duration-300 ease-out',
  overlayExit: 'animate-out fade-out-0 duration-200 ease-in'
}
```

## 📊 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Whether the modal is open |
| `onClose` | `() => void` | - | Function to close the modal |
| `className` | `string` | `''` | Additional CSS classes |
| `testId` | `string` | `'modal-development'` | Test ID for testing |

## 🎨 Tasarım Prensipleri

- **Professional**: Enterprise-level kalite
- **Consistent**: Proje renk paleti ile uyumlu (config/colors.ts)
- **Accessible**: WCAG uyumlu
- **Responsive**: Tüm cihazlarda çalışır
- **Performant**: Optimize edilmiş animasyonlar
- **Thin Design**: Resme uygun ince ve uzun layout

## 🔍 Test Etme

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ModalDevelopment from '@/components/common/ModalDevelopment';

test('modal opens and closes correctly', () => {
  const onClose = jest.fn();
  
  render(
    <ModalDevelopment 
      isOpen={true} 
      onClose={onClose} 
    />
  );
  
  expect(screen.getByText('System Development Stage')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Close'));
  expect(onClose).toHaveBeenCalled();
});
```

## 📈 Performans

- **Lazy Loading**: Modal sadece açıkken render edilir
- **Memoization**: Gereksiz re-render'lar önlenir
- **Event Cleanup**: Memory leak'ler önlenir
- **Smooth Animations**: CSS transitions ve Tailwind animate-in/out
- **State Management**: useState ile visibility kontrolü

## 🎯 Sonuç

ModalDevelopment komponenti, geliştirme aşamasındaki uygulamalar için profesyonel bir modal deneyimi sağlar. Timeline tasarımı ile kullanıcılara net bir geliştirme süreci gösterir.

### ✨ Yeni Özellikler

- **Glass Overlay Effect**: Backdrop blur efekti ile modern görünüm
- **Dashed Timeline**: Resme uygun kesik çizgili timeline
- **Perfect Alignment**: Dot'lar ve çizgi mükemmel hizalama
- **Resme Uygun Spacing**: Referans resimdeki spacing'ler
- **Smooth Animations**: Fade in/out geçişleri
- **Project Colors**: config/colors.ts'den renk kullanımı
- **Enhanced Accessibility**: ARIA modal attribute