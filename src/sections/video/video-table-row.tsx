import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import { fTime, fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellVideo({ params }: ParamsProps) {
  const { thumbnail } = params.row;
  const thumbnailUrl = `https://storage.reviewniverse.net/${thumbnail[0].url}`;

  const handleClick = (param: ParamsProps) => {
    console.log(param);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ py: 2, width: 1 }}
      onClick={() => handleClick(params.row)}
    >
      <Avatar
        alt={params.row.title}
        src={thumbnailUrl}
        variant="rounded"
        sx={{ width: 64, height: 64, mr: 2 }}
      />

      <ListItemText
        disableTypography
        primary={
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={params.row.onViewRow}
            sx={{ cursor: 'pointer' }}
          >
            {params.row.title}
          </Link>
        }
        secondary={
          <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
            {params.row.type === '10' ? '영화' : '시리즈'} | {params.row.notice_age} |{' '}
            {params.row.release} | {params.row.runtime}
          </Box>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}

export function RenderCellViewCount({ params }: ParamsProps) {
  return (
    <Stack sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={params.row.view_count}
        variant="determinate"
        color="inherit"
        sx={{ mb: 1, height: 6, maxWidth: 80 }}
      />
      {params.row.view_count}
    </Stack>
  );
}

export function RenderCellLikeCount({ params }: ParamsProps) {
  return (
    <Stack sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={params.row.like_count}
        variant="determinate"
        color="inherit"
        sx={{ mb: 1, height: 6, maxWidth: 80 }}
      />
      {params.row.like_count}
    </Stack>
  );
}

export function RenderCellReviewCount({ params }: ParamsProps) {
  return (
    <Stack sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={params.row.review_count}
        variant="determinate"
        color="inherit"
        sx={{ mb: 1, height: 6, maxWidth: 80 }}
      />
      {params.row.review_count}
    </Stack>
  );
}

export function RenderCellConfirm({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={(params.row.is_confirm === true && 'info') || 'default'}>
      {params.row.is_confirm ? '승인' : '미승인'}
    </Label>
  );
}

export function RenderCellDelete({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={(params.row.is_delete === true && 'info') || 'default'}>
      {params.row.is_confirm ? '삭제' : '운영중'}
    </Label>
  );
}

export function RenderCellCreatedAt({ params }: ParamsProps) {
  return (
    <ListItemText
      primary={fDate(params.row.createdAt)}
      secondary={fTime(params.row.createdAt)}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellStock({ params }: ParamsProps) {
  return (
    <Stack sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={(params.row.available * 100) / params.row.quantity}
        variant="determinate"
        color={
          (params.row.inventoryType === 'out of stock' && 'error') ||
          (params.row.inventoryType === 'low stock' && 'warning') ||
          'success'
        }
        sx={{ mb: 1, height: 6, maxWidth: 80 }}
      />
      {!!params.row.available && params.row.available} {params.row.inventoryType}
    </Stack>
  );
}
