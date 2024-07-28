import { Box, Text } from "@chakra-ui/react";

export default function Home() {
 
  return (
    <main >
      <Box m='30px auto' maxW='500px' borderBottom='2px solid black'>
        <Text fontSize="xl"  fontWeight="bold" >
          This is the home page
        </Text>
      </Box>
    </main>
  );
}
