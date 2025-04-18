import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '管理後台',
  description: '系統管理區域',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '管理後台',
    description: '系統管理區域',
    type: 'website',
  },
  // 設置 canonical URL
  alternates: {
    canonical: getFullUrl('/admin'),
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
}