export default function LoadingScreen () {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="animate-spin rounded-full bg-gradient-to-tr from-teal-100 to-cyan-500 p-2">
                <div className="rounded-full bg-white p-8">
                </div>
            </div>
        </div>
    )
}
