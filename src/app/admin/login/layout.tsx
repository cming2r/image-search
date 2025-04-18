import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: '管理後台登入',
  description: '系統管理員登入',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '管理後台登入',
    description: '系統管理員登入',
    type: 'website',
  },
  // 設置 canonical URL
  alternates: {
    canonical: getFullUrl('/admin/login'),
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  );
}