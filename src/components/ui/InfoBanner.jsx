import { Box, Flex, Text, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

const InfoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box bg="teal.500" color="white" py={2} px={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="sm">
        🚧 We’re still working on this site to bring you a better experience. Some features might be incomplete.
        </Text>
        <CloseButton onClick={() => setIsVisible(false)} />
      </Flex>
    </Box>
  );
};

export default InfoBanner;
