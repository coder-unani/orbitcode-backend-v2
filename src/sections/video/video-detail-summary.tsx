import { useForm } from 'react-hook-form';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import { IVideo } from 'src/types/video';

// ----------------------------------------------------------------------

type Props = {
  video: IVideo;
};

export default function VideoDetailSummary({ video }: Props) {
  const router = useRouter();

  const {
    id,
    type,
    title,
    synopsis,
    release,
    runtime,
    notice_age,
    rating,
    like_count,
    view_count,
    review_count,
    platform_code,
    platform_id,
    genre,
    actor,
    staff,
    watch,
    thumbnail,
    review,
    created_at,
    updated_at,
  } = video;

  const defaultValues = {
    id,
    type,
    title,
    synopsis,
    release,
    runtime,
    notice_age,
    rating,
    like_count,
    view_count,
    review_count,
    platform_code,
    platform_id,
    genre,
    actor,
    staff,
    watch,
    thumbnail,
    review,
  };

  const methods = useForm({
    defaultValues,
  });

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  return (
    <Stack spacing={3} sx={{ pt: 3 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h5">{title}</Typography>
      </Stack>
      <Typography variant="body2">{synopsis}</Typography>
      <Divider sx={{ borderStyle: 'solid' }} />
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          구분
        </Typography>
        <Typography variant="body2">
          {type === '10' ? '영화' : ''}
          {type === '11' ? '시리즈' : ''}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          장르
        </Typography>
        <Typography variant="body2">{genre.map((item) => item.name).join(', ')}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          런타임
        </Typography>
        <Typography variant="body2">{runtime}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          관람 등급
        </Typography>
        <Typography variant="body2">{notice_age}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          출연
        </Typography>
        <Typography variant="body2">{actor.map((item) => item.name).join(', ')}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          제작
        </Typography>
        <Typography variant="body2">{staff.map((item) => item.name).join(', ')}</Typography>
      </Stack>
    </Stack>
  );
}
