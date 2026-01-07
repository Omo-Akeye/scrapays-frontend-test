import { useEffect, useState } from 'react';
import {
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack
} from '@chakra-ui/react';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, desc: string) => void;
  initialData?: { name: string; description: string } | null; 
  isLoading?: boolean; 
}

export default function BookFormModal({ isOpen, onClose, onSubmit, initialData, isLoading }: BookFormModalProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setDesc(initialData?.description || '');
    } else {
     
      if (!initialData) {
        setName('');
        setDesc('');
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!name || !desc) return;
    onSubmit(name, desc);

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter='blur(2px)' />
      <ModalContent borderRadius="xl" p={2}>
        <ModalHeader borderBottomWidth="1px">
          {initialData ? 'Edit Book' : 'Add New Book'}
        </ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        
        <ModalBody py={6}>
          <VStack spacing={5}>
            <FormControl isDisabled={isLoading}>
              <FormLabel fontWeight="bold" color="gray.700">Book Title</FormLabel>
              <Input 
                placeholder="e.g. The Great Gatsby" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                focusBorderColor="teal.500"
                size="lg"
              />
            </FormControl>

            <FormControl isDisabled={isLoading}>
              <FormLabel fontWeight="bold" color="gray.700">Description </FormLabel>
              <Textarea 
                placeholder="Description..." 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                focusBorderColor="teal.500"
                size="lg"
                rows={4}
                resize="none"
              />
            </FormControl>

            <HStack width="full" justify="flex-end" spacing={3} pt={4}>
              <Button onClick={onClose} variant="ghost" isDisabled={isLoading}>Cancel</Button>
              <Button 
                colorScheme="teal" 
                onClick={handleSubmit}
                px={8}
                isLoading={isLoading} 
                loadingText={initialData ? 'Updating...' : 'Saving...'} 
              >
                {initialData ? 'Update Book' : 'Save Book'}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}