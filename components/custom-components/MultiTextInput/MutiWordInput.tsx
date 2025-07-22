import React, { useState, useRef, useEffect, KeyboardEventHandler } from 'react';
import {
  Box,
  Input,
  Flex,
  Badge,
 
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { MultiWordInputProps } from './MultiWordInput.types';


const MultiWordInput:React.FC<MultiWordInputProps>=({
  wordList,
  onWordsChange
})=> {
  const [words, setWords] = useState<string[]>(wordList);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on the input field whenever words are added or removed
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onWordsChange(words)
  }, [words]);
  

  // Function to add a word to the badges
  const addWord = (word:string) => {
   const trimmedWord = word.trim();
    if (trimmedWord!="" && !words.includes(trimmedWord)) {
          setWords([...words, trimmedWord]);        
    }
    // Clear the input after adding
    setInputValue(''); 
  };

  // Function to remove a word from the badges
  const removeWord = (wordToRemove:string) => {
    setWords(words.filter((word) => word !== wordToRemove));
  };

  // Handle key presses in the input field
  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' ) {
      event.preventDefault(); // Prevent default space/enter behavior
      addWord(inputValue);
    } else if (event.key === 'Backspace' && inputValue === '' && words.length > 0) {
      // If backspace is pressed and input is empty, remove the last badge
      removeWord(words[words.length - 1]);
    }
  };
 

  return (
   
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={2}
          bg="white"
          width="100%"
        >
          <Flex flexWrap="wrap" gap={2} mb={3}>
            {words.map((word, index) => (
             word!=""?
              <Badge
                colorPalette={'blue'}
                key={index}
                size="lg"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                py={1}
                px={3}
              >{word}
                <MdClose onClick={() => removeWord(word)} />
              </Badge>:""
            ))}
            <Input
            
              ref={inputRef}
              value={inputValue}
              onChange={(e)=> setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={words.length === 0 ? "Add dog's sub breeds here, you can add many by pressing enter..." : ""}
              variant={'outline'} // Make the input blend in
              flex="1" // Allow input to take remaining space
              minW="120px" // Minimum width for the input
              py={1}
              px={2}
              css={{
                border:'none'
              }}
              focusRing={'none'}
              _placeholder={{ color: 'gray.900' }}
            />
          </Flex>
        </Box>
  );
}

export default MultiWordInput;
