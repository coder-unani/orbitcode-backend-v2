import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useSearchVideos } from 'src/api/video';
import { VIDEO_TYPE_OPTIONS, VIDEO_ISDELETE_OPTIONS, VIDEO_ISCONFIRM_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { IVideo, IVideoTableFilters } from 'src/types/video';

import VideoTableToolbar from '../video-table-toolbar';
import {
  RenderCellVideo,
  RenderCellDelete,
  RenderCellConfirm,
  RenderCellViewCount,
  RenderCellLikeCount,
  RenderCellReviewCount,
} from '../video-table-row';

// ----------------------------------------------------------------------

const defaultFilters: IVideoTableFilters = {
  page: 1,
  pageSize: 50,
  videoType: '10',
  keyword: '',
  isConfirm: 'false',
  isDelete: 'false',
  videoId: 0,
  platformId: '',
  orderBy: '',
};

// ----------------------------------------------------------------------

export default function VideoListView() {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState<IVideoTableFilters>(defaultFilters);
  const [tableData, setTableData] = useState<IVideo[]>([]);

  const { searchResults, searchLoading } = useSearchVideos(searchParams);

  useEffect(() => {
    setTableData(searchResults.list);
  }, [searchResults]);

  const handleViewRow = useCallback(
    (videoId: number) => {
      router.push(paths.content.video.detail(videoId.toString()));
    },
    [router]
  );

  const handleToolbarSubmit = (params: IVideoTableFilters) => {
    setSearchParams((prev) => ({
      ...prev,
      videoType: params.videoType,
      keyword: params.keyword,
      isConfirm: params.isConfirm,
      isDelete: params.isDelete,
    }));
    console.log('call handleToolbarSubmit');
  };

  const settings = useSettingsContext();

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: '비디오 정보',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <RenderCellVideo params={params} />,
    },
    {
      field: 'view_count',
      headerName: '조회수',
      width: 90,
      renderCell: (params) => <RenderCellViewCount params={params} />,
    },
    {
      field: 'like_count',
      headerName: '좋아요',
      width: 90,
      renderCell: (params) => <RenderCellLikeCount params={params} />,
    },
    {
      field: 'review_count',
      headerName: '리뷰',
      width: 90,
      renderCell: (params) => <RenderCellReviewCount params={params} />,
    },
    {
      field: 'is_confirm',
      headerName: '관리자 승인',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: VIDEO_ISCONFIRM_OPTIONS,
      renderCell: (params) => <RenderCellConfirm params={params} />,
    },
    {
      field: 'is_delete',
      headerName: '노출 여부',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: VIDEO_ISDELETE_OPTIONS,
      renderCell: (params) => <RenderCellDelete params={params} />,
    },
  ];

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Content', href: paths.content.root },
          {
            name: 'Video',
            href: paths.content.video.root,
          },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.content.video.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Video
          </Button>
        }
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />

      <Card
        sx={{
          height: { xs: 800, md: 2 },
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={tableData}
          rowCount={searchResults.total}
          columns={columns}
          loading={searchLoading}
          getRowHeight={() => 'auto'}
          pagination
          paginationMode="server"
          paginationModel={{
            page: searchParams.page - 1,
            pageSize: searchParams.pageSize,
          }}
          onPaginationModelChange={(newModel) => {
            setSearchParams((prev) => ({
              ...prev,
              page: newModel.page >= 0 ? newModel.page + 1 : 0,
              pageSize: newModel.pageSize,
            }));
          }}
          pageSizeOptions={[20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                page: searchParams.page,
                pageSize: searchParams.pageSize,
              },
            },
          }}
          onCellClick={(params) => {
            handleViewRow(params.row.id);
          }}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <VideoTableToolbar
                  params={searchParams}
                  onToolbarSubmit={handleToolbarSubmit}
                  videoTypeOptions={VIDEO_TYPE_OPTIONS}
                  videoIsConfirmOptions={VIDEO_ISCONFIRM_OPTIONS}
                  videoIsDeleteOptions={VIDEO_ISDELETE_OPTIONS}
                />

                <Stack
                  spacing={1}
                  flexGrow={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <GridToolbarExport />
                </Stack>
              </GridToolbarContainer>
            ),
            noRowsOverlay: () => <EmptyContent title="No Data" />,
            noResultsOverlay: () => <EmptyContent title="No results found" />,
          }}
        />
      </Card>
    </Container>
  );
}
