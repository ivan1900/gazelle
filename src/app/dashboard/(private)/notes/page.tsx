import NotesPage from '@/app/components/Notes/NotesPage';
import getNotesAction from '@/app/server/actions/note/getNotesAction';
import getTagsAction from '@/app/server/actions/note/getTagsAction';

export default async function NotesRoute() {
  const [initialNotes, initialTags] = await Promise.all([
    getNotesAction(),
    getTagsAction(),
  ]);

  return <NotesPage initialNotes={initialNotes} initialTags={initialTags} />;
}
