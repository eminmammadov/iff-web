'use client';

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import Entrance from '@/components/sections/Entrance';
import ToolsSection from '@/components/sections/Tools';

export default function Home() {
  // Sayfa yüklendiğinde scroll pozisyonunu sıfırla
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <Partners />
      <Entrance />
      <ToolsSection />
    </main>
  );
}
