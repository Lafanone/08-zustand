'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import css from '@/app/page.module.css';

interface NotesClientProps {
  tagParam: string;
}

export default function NotesClient({ tagParam }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const querySearch = debouncedSearch || undefined;
  const queryTag = tagParam === 'all' ? undefined : tagParam;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tagParam, page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 10, search: querySearch, tag: queryTag }),
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className={css.title}>
          {tagParam === 'all' ? 'All Notes' : `Category: ${tagParam}`}
        </h2>
        <button onClick={() => setIsModalOpen(true)} className={css.createBtn}>
          Create Note
        </button>
      </div>

      <SearchBox onSearch={setSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />
          <Pagination 
            currentPage={page} 
            totalPages={data.totalPages} 
            onPageChange={setPage} 
          />
        </>
      ) : (
        !isLoading && <p className={css.empty}>{`No notes found`}</p>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}