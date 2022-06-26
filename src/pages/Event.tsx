import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Video } from '../components/Video';

import { Lesson, useGetLessonsQuery } from '../graphql/generated';

export function Event() {
  const navigate = useNavigate();
  const { data } = useGetLessonsQuery();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) {
      if (data) navigate(`/event/lesson/${data?.lessons[0].slug}`);
    }
  }, [data]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-1'>
        {data?.lessons && (
          <>
            {slug ? (
              <Video lessonSlug={slug} />
            ) : (
              <Video lessonSlug={data?.lessons[0].slug} />
            )}
            <Sidebar lessons={data?.lessons as Lesson[]} />
          </>
        )}
      </main>
    </div>
  );
}
