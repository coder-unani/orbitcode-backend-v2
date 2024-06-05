import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { VideoDetailView } from 'src/sections/video/view';

// ----------------------------------------------------------------------

export default function Page() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> video: list</title>
      </Helmet>

      <VideoDetailView id={`${id}`} />
    </>
  );
}
