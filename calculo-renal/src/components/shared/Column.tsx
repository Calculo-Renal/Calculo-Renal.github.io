export default function Column({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col justify-center gap-2 mb-4">
            {children}
        </div>
    )
}
