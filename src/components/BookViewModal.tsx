import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import type { Book } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null; 
}

export default function BookViewModal({ isOpen, onClose, book }: Props) {
  if (!book) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay backdropFilter='blur(2px)' />
      <ModalContent borderRadius="xl" p={4}>
        <ModalHeader fontSize="2xl" color="teal.600">{book.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="md" color="gray.600" style={{ whiteSpace: 'pre-wrap' }}>
            {book.description}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}