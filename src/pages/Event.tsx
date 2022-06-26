import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Video } from '../components/Video';

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`;

interface Lesson {
  id: string;
  title: string;
  slug: string;
  availableAt: string;
  lessonType: 'live' | 'class';
}

interface GetLessonsQueryResponse {
  lessons: Lesson[];
}

export function Event() {
  const navigate = useNavigate();
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
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
            <Sidebar lessons={data?.lessons} />
          </>
        )}
      </main>
    </div>
  );
}
