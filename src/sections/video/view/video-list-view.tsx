import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useSearchVideos } from 'src/api/video';
import { VIDEO_TYPE_OPTIONS, VIDEO_ISDELETE_OPTIONS, VIDEO_ISCONFIRM_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
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
  videoType: '10',
  keyword: '',
  isConfirm: 'false',
  isDelete: 'false',
  videoId: 0,
  platformId: '',
  orderBy: '',
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function VideoListView() {
  const [searchParams, setSearchParams] = useState<IVideoTableFilters>(defaultFilters);
  // const [filters, setFilters] = useState(defaultFilters);
  const { searchResults, searchLoading } = useSearchVideos(searchParams);

  useEffect(() => {
    if (searchResults.length) {
      setTableData(searchResults);
    } else {
      setTableData([]);
    }
  }, [searchResults]);

  const handleToolbarSubmit = (params: IVideoTableFilters) => {
    setSearchParams(params);
    console.log('call handleToolbarSubmit');
  };

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();

  const [tableData, setTableData] = useState<IVideo[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: searchParams,
  });

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
          rows={dataFiltered}
          columns={columns}
          loading={searchLoading}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 50, page: 1 },
            },
          }}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectedRowIds(newSelectionModel);
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

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }: { inputData: IVideo[]; filters: IVideoTableFilters }) {
  const { videoType, keyword } = filters;

  return inputData;
}
