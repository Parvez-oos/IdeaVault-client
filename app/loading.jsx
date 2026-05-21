export default function Loading() {
    return (
        <div className="max-w-300 mx-auto px-6 py-10 min-h-[80vh]">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-10">
                <div className="w-64 h-10 bg-(--muted) animate-pulse rounded-full"></div>
                <div className="flex gap-4">
                    <div className="w-32 h-10 bg-(--muted) animate-pulse rounded-full"></div>
                    <div className="w-32 h-10 bg-(--muted) animate-pulse rounded-full"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-(--card) border border-(--border) rounded-xl overflow-hidden">
                        <div className="h-40 bg-(--muted) animate-pulse"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-4 bg-(--muted) animate-pulse rounded w-3/4"></div>
                            <div className="h-4 bg-(--muted) animate-pulse rounded w-1/4"></div>
                            <div className="pt-4 flex justify-between">
                                <div className="h-3 bg-(--muted) animate-pulse rounded w-1/5"></div>
                                <div className="h-3 bg-(--muted) animate-pulse rounded w-1/5"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}