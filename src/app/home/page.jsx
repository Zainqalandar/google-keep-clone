import DraggableGrid from '@/components/ui/DraggableGrid';
import MegaNotes from '@/components/ui/MegaNotes';
import Notes from '@/components/ui/Notes';
import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

const Home = () => {
	return (
		<div>
			{/* <MegaNotes /> */}
			{/* <Grid templateColumns="repeat(5, 1fr)" gap={6}>
				<GridItem w="100%">
					<Notes />
				</GridItem>
			</Grid> */}
      <DraggableGrid />
		</div>
	);
};

export default Home;
