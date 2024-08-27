'use client';

import React from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Notes from './Notes';
import NotesPopup from './NotesPopup';

const DraggableGrid = () => {
  const [parent, notes] = useDragAndDrop([
    { id: 'note-1', component: <Notes text='computer11' image='/b1.avif' /> },
    { id: 'note-2', component: <Notes text='computer22' image='/b2.avif' /> },
    { id: 'note-3', component: <Notes text='computer33' image='/b3.avif' /> },
    { id: 'note-4', component: <Notes text='computer44' image='/b4.avif' /> },
    { id: 'note-5', component: <Notes text='computer55' image='/b5.avif' /> },
    { id: 'note-6', component: <Notes text='computer66' image='/b6.avif' /> },
  ]);

  return (
    <Box p={4} bg="gray.800" borderRadius="md" boxShadow="md">
        <NotesPopup />
      <SimpleGrid columns={[1, 2, 3]} spacing={4} ref={parent}>
        {notes.map((note) => (
          <Box
            className="draggable-note"
            data-label={note.id}
            key={note.id}
            css={{ cursor: 'grab' }}
          >
            {note.component}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DraggableGrid;
