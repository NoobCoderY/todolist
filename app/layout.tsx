import Header from "./Header"
export const metadata = {
  title: 'To do APP',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     
      <body>
        <Header/>
        {children}</body>
    </html>
  )
}
