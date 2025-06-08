export default function Skeleton() {
	return (
		<div class="min-h-screen bg-gray-100 flex flex-col">
			{/* Header */}
			<header class="bg-white shadow-md p-4">
				<div class="h-6 w-32 bg-gray-300 rounded"></div>
			</header>

			{/* Main Content */}
			<div class="flex flex-1">
				{/* Sidebar */}
				<aside class="w-64 bg-white shadow-md p-4">
					<div class="space-y-4">
						<div class="h-4 w-48 bg-gray-300 rounded"></div>
						<div class="h-4 w-40 bg-gray-300 rounded"></div>
						<div class="h-4 w-36 bg-gray-300 rounded"></div>
					</div>
				</aside>

				{/* Main Section */}
				<main class="flex-1 p-6">
					<div class="space-y-6">
						<div class="h-6 w-64 bg-gray-300 rounded"></div>
						<div class="h-4 w-full bg-gray-300 rounded"></div>
						<div class="h-4 w-full bg-gray-300 rounded"></div>
						<div class="h-4 w-3/4 bg-gray-300 rounded"></div>
					</div>
				</main>
			</div>
		</div>
	);
}
