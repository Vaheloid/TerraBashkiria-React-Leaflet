import { Box, HStack, Center, Text} from '@chakra-ui/react';

import Sidebar from '../menu/Sidebar';
export default function Header() {
    return (
        <Box bg={"#7B83CE"} w="100%" p="3" color="white" shadow="lg" zIndex={1000}>
            <HStack>
                <Sidebar />
                <Box bg={'white'} w="400px" p="1" color="black" borderRadius={'xl'}>
                    <Center>
                        <Text textStyle={'2xl'} fontWeight={'black'} fontFamily="Inter">
                            ГИС "ТерраБашкирия"
                        </Text>
                    </Center>
                </Box>
            </HStack>
        </Box>
    );
}