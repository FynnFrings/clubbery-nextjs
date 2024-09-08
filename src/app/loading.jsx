import Image from "next/image";

const Loading = () => {
	return (
		<div className="w-full h-screen gap-y-16 flex flex-col items-center justify-center">
			<Image src="/logo.png" alt="loading_image" width={90} height={90} />
			<div className="h-3 w-3/4 md:w-1/3 bg-transparent rounded-lg overflow-hidden">
				<div className="h-full w-1/2 bg-clubbery-orange animate-loader rounded-lg"></div>
			</div>
		</div>
	);
};

export default Loading;
