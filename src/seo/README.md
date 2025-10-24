# SEO Module

Bu modül, IF Funds web sitesi için kapsamlı SEO optimizasyonu sağlar.

## 📁 Klasör Yapısı

```
src/seo/
├── config/           # SEO konfigürasyon dosyaları
│   └── seo.ts       # Ana SEO konfigürasyonu
├── components/       # SEO React komponentleri
│   ├── SEOMetadata.tsx      # Metadata yönetimi
│   └── StructuredData.tsx   # JSON-LD structured data
├── hooks/            # SEO React hooks
│   └── useSEO.ts    # SEO yönetimi hooks
├── lib/              # SEO yardımcı fonksiyonları
│   ├── sitemap.ts    # Sitemap ve robots.txt
│   ├── seo-test.ts   # SEO test utilities
│   └── api-utils.ts  # API endpoint utilities
├── types/            # TypeScript tip tanımları
│   └── global.d.ts   # Global tip tanımları
├── index.ts          # Merkezi export dosyası
├── README.md         # Dokümantasyon
└── examples.ts       # Kullanım örnekleri
```

## 🌐 API Endpoints

SEO modülü aşağıdaki API endpoint'lerini sağlar:

- `GET /api/seo/sitemap.xml` - Sitemap XML dosyası
- `GET /api/seo/robots.txt` - Robots.txt dosyası  
- `GET /api/seo/manifest.json` - PWA manifest dosyası

## 🚀 Kullanım

### Temel Import
```typescript
import { SEO_CONFIG, generatePageMetadata, useSEO } from '@/seo';
```

### Sayfa Metadata
```typescript
import { generatePageMetadata } from '@/seo/config/seo';

export const metadata = generatePageMetadata('home');
```

### Structured Data
```typescript
import { OrganizationStructuredData } from '@/seo/components/StructuredData';

<OrganizationStructuredData />
```

### SEO Hooks
```typescript
import { useSEO } from '@/seo/hooks/useSEO';

const { updateTitle, updateDescription } = useSEO();
```

### API Utilities
```typescript
import { createSitemapResponse } from '@/seo/lib/api-utils';

// API route'unda kullanım
export async function GET() {
  return createSitemapResponse();
}
```

## 🎯 Özellikler

- **Modüler Yapı**: Tüm SEO dosyaları tek klasörde
- **TypeScript Desteği**: Tam tip güvenliği
- **React Hooks**: SEO yönetimi için hooks
- **Structured Data**: JSON-LD schema.org uyumlu
- **Sitemap**: Otomatik sitemap.xml oluşturma
- **Robots.txt**: Arama motoru yönergeleri
- **Open Graph**: Sosyal medya optimizasyonu
- **Twitter Cards**: Twitter paylaşım optimizasyonu
- **Analytics**: Google Analytics ve Facebook Pixel entegrasyonu
- **Performance**: Core Web Vitals tracking
- **API Endpoints**: SEO dosyaları için API route'ları

## 📊 SEO Test

```typescript
import { runAllSEOTests } from '@/seo/lib/seo-test';

runAllSEOTests();
```

## 🔧 Konfigürasyon

Ana konfigürasyon `config/seo.ts` dosyasında bulunur:

- Site bilgileri
- Metadata ayarları
- Open Graph konfigürasyonu
- Twitter Cards ayarları
- Structured data şemaları
- Analytics konfigürasyonu

## 📈 Performans

- Lazy loading ile optimize edilmiş
- Caching ile hızlı yanıt
- Compression ile küçük boyut
- TypeScript ile tip güvenliği

## 🎨 Tasarım Prensipleri

- **Modüler**: Kolay genişletilebilir
- **Profesyonel**: Enterprise-level kalite
- **Performanslı**: Hızlı ve optimize
- **Kapsamlı**: Tüm SEO faktörleri
- **Test edilebilir**: Otomatik doğrulama
- **Organize**: API endpoint'leri dahil