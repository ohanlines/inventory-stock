'use state';

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>

            {/*
      <footer>
        <div className="text-center text-xs ">
          <p>
            ini footer paling keren
              Dibuat @ rumah pak Djamalis kamar paling pojok
          </p>
        </div>
      </footer>
               */}
    </html>
  )
}
