import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetVideo } from 'src/api/video';
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import VideoDetailToolbar from '../video-detail-toolbar';
import VideoDetailsSummary from '../video-detail-summary';
import VideoDetailSynopsis from '../video-detail-synopsis';
import VideoDetailsCarousel from '../video-detail-carousel';
import { ProductDetailsSkeleton } from '../product-skeleton';

// ---------------------------------------------------------------------
// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function VideoDetailsView({ id }: Props) {
  const { video, videoLoading, videoError } = useGetVideo(id);

  console.log(video);

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const [publish, setPublish] = useState('');

  // useEffect(() => {
  //   if (video) {
  //     setPublish(video?.publish);
  //   }
  // }, [video]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${videoError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.content.video.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderVideo = video && (
    <>
      <VideoDetailToolbar
        backLink={paths.content.video.root}
        editLink={paths.content.video.edit(`${video?.id}`)}
        liveLink={paths.content.video.detail(`${video?.id}`)}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <VideoDetailsCarousel video={video} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <VideoDetailsSummary video={video} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Card>
          <VideoDetailSynopsis synopsys={video?.synopsis} />
        </Card>
      </Box>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {videoLoading && renderSkeleton}

      {videoError && renderError}

      {video && renderVideo}
    </Container>
  );
}
