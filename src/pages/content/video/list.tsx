import { Helmet } from 'react-helmet-async';

import { VideoListView } from 'src/sections/video/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> video: list</title>
      </Helmet>

      <VideoListView />
    </>
  );
}
