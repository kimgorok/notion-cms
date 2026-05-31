import { Header, type HeaderProps } from './header';
import { Footer, type FooterProps } from './footer';

export interface DefaultLayoutProps {
  children: React.ReactNode;
  header?: HeaderProps;
  footer?: FooterProps;
}

export function DefaultLayout({
  children,
  header,
  footer,
}: DefaultLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header {...header} />
      <main className="flex-1">{children}</main>
      <Footer {...footer} />
    </div>
  );
}
