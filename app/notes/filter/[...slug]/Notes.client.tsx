'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from '@/app/page.module.css';

interface NotesClientProps {
  tagParam: string;
}

export default function NotesClient({ tagParam }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');


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
          <Link href="/notes/action/create" className={css.createBtn} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Create Note +
          </Link>
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

      
    </div>
  );
}