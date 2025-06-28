import React from 'react';
import { ColorPicker } from './ColorPicker';

const page = () => {
	return (
		<div className="bg-black w-full h-full p-20 gap-20 overflow-hidden flex-col flex justify-center items-center">
			<div className="relative max-w-4xl w-full">
				<ColorPicker />
				<ColorPicker zeroUi />
			</div>
		</div>
	);
};

export default page;
