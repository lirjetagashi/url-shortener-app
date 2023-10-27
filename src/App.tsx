import React, {useEffect, useState} from 'react';
import {Flex, Heading, Image, Text, Input, Button, Link, useToast} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

const SERVER_URL = 'http://localhost:5000'

function App() {
  const [enteredUrl, setEnteredUrl] = useState<string>('')
  const [shortenedUrls, setShortenedUrls] = useState<string[]>([])
  const toast = useToast()

    const fetchUrls = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error in getting data');
            }

            const data = await response.json();
            setShortenedUrls(data.urls.map((url: any) => url.short));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

  const shortenUrl = async (e: any) => {
      e.preventDefault();
      try {
          const response = await fetch(`${SERVER_URL}/shortenUrl`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({originalUrl: enteredUrl})
          })
          if(!response.ok) {
              throw new Error('Error occurred while shortening the link')
          }
          toast({
              status: "success",
              position: "top",
              description: "Successfully shortened URL!",
              duration: 2000
          })
          await fetchUrls()
          setEnteredUrl('')
      } catch (e) {
          console.error('Parse error', e)
      }
  }

  const deleteShortUrl = async (shortLink: string) => {
      try {
          await fetch(`${shortLink}`, {
              method: 'DELETE'
          })
          toast({
              status: "success",
              position: "top",
              description: "Successfully deleted URL!",
              duration: 2000
          })
          await fetchUrls()
      } catch (e: any) {
          console.error('Error deleting url', e)
          toast({
              status: "error",
              position: "top",
              description: `Error deleting URL - ${e.message}`,
              duration: 2000
          })
      }
  }

  useEffect(() => {
      fetchUrls()
  }, [])

  return (
    <>
        <Flex height={'100vh'}>
            <Flex width={'22%'} height={'100%'} backgroundColor={'#EFEFEF'} alignItems={'center'} flexDirection={'column'}>
                <Image src={'/AnchorzUp-logo.svg'} width={'150px'} height={'150px'} />
                <Flex flexDirection={'column'} gap={4}>
                    <Text fontWeight={'bold'} fontSize={'lg'} align={'center'}>My shortened URLs</Text>
                    {shortenedUrls.slice().reverse().map((url, index) => {
                        return (
                            <Flex key={index} justifyContent={'space-between'} gap={4}>
                                <Link target={'_blank'} fontSize={'sm'} color={'#5EB3E8'} textDecoration={'underline'} href={url}>{url}</Link>
                                <DeleteIcon cursor={'pointer'} color={'#5D5D5D'} onClick={() => deleteShortUrl(url)} />
                            </Flex>
                            )
                    })}
                </Flex>
            </Flex>
            <Flex flexDirection={'column'} alignItems={'flex-start'} p={'5em 7em'} gap={10}>
                <Heading>URL Shortener</Heading>
                <Flex flexDirection={'column'} gap={8}>
                    <Input
                        name={'Url'}
                        placeholder={'Paste the URL to be shortened'}
                        width={'md'}
                        height={'50px'}
                        border={'1px solid black'}
                        borderRadius={0}
                        fontSize={'20px'}
                        value={enteredUrl}
                        onChange={(e) => setEnteredUrl(e.target.value)}
                    />
                    <Button width={'150px'} height={'50px'} borderRadius={0} bg={'#92278F'} color={'white'} onClick={(e) => shortenUrl(e)}>Shorten URL</Button>
                </Flex>
            </Flex>
        </Flex>
    </>
  );
}

export default App;
