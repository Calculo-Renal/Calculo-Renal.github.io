export const metadata = {
    title: {
        default: "Cálculo Renal",
        template: "%s | Cálculo Renal"
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    )
}
