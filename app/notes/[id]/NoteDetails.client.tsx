'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import styles from './NoteDetails.module.css';

export default function NoteDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading, please wait...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Something went wrong.</div>;
  }

  if (!note) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{note.title}</h1>
      <div className={styles.meta}>
        <span>{new Date(note.createdAt).toLocaleDateString()}</span> 
      </div>
      <p className={styles.content}>{note.content}</p>
    </div>
  );
}