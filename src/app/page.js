import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/tetris');
  return null;
}