import React from 'react';
import { Flex, Heading, Image, Text, Input, Button} from "@chakra-ui/react";

function App() {
  // const [shortenedUrls, setShortenedUrls] = useState<string[]>([])

  return (
    <>
        <Flex height={'100vh'}>
            <Flex width={'20%'} height={'100%'} backgroundColor={'#EFEFEF'} alignItems={'center'} flexDirection={'column'}>
                <Image src={'/AnchorzUp-logo.svg'} width={'150px'} height={'150px'} />
                <Text fontWeight={'bold'} fontSize={'lg'}>My shortened URLs</Text>
            </Flex>
            <Flex flexDirection={'column'} alignItems={'flex-start'} p={'5em 7em'} gap={10}>
                <Heading>URL Shortener</Heading>
                <Flex flexDirection={'column'} gap={8}>
                    <Input placeholder={'Paste the URL to be shortened'} width={'md'} height={'50px'} border={'1px solid black'} borderRadius={0} fontSize={'20px'} />
                    <Button width={'150px'} height={'50px'} borderRadius={0} bg={'#92278F'} color={'white'}>Shorten URL</Button>
                </Flex>
            </Flex>
        </Flex>
    </>
  );
}

export default App;
