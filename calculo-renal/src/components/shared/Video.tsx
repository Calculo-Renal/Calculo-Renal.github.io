interface VideoProps {
    src: string,
    loop: boolean
}

export default function Video({ src, loop }: VideoProps) {
    return (
        <video
            src={src}
            loop={loop}
            controls
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "smooth"
            }}
        />
    )
}