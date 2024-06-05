import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material/Select';
import { Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

import { IVideoTableFilters } from 'src/types/video';

// ----------------------------------------------------------------------
type Props = {
  params: IVideoTableFilters;
  onToolbarSubmit: (params: IVideoTableFilters) => void;
  //
  videoTypeOptions: {
    label: string;
    value: string;
  }[];
  videoIsConfirmOptions: {
    label: string;
    value: string;
  }[];
  videoIsDeleteOptions: {
    label: string;
    value: string;
  }[];
};

export default function VideoTableToolbar({
  params,
  onToolbarSubmit,
  videoTypeOptions,
  videoIsConfirmOptions,
  videoIsDeleteOptions,
}: Props) {
  // const popover = usePopover();

  const [videoType, setVideoType] = useState<string>(params.videoType);
  const [keyword, setKeyword] = useState<string | null>(params.keyword);
  const [isConfirm, setIsConfirm] = useState<string>(params.isConfirm);
  const [isDelete, setIsDelete] = useState<string>(params.isDelete);
  // const [videoId, setVideoId] = useState<number | null>(filters.videoId);
  // const [platformId, setPlatformId] = useState<string | null>(filters.platformId);
  // const [orderBy, setOrderBy] = useState<string | null>(filters.orderBy);

  const handleVideoTypeChange = useCallback((event: SelectChangeEvent<string>) => {
    setVideoType(event.target.value);
  }, []);

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  const handleIsConfirmChange = useCallback((event: SelectChangeEvent<string>) => {
    setIsConfirm(event.target.value);
  }, []);

  const handleIsDeleteChange = useCallback((event: SelectChangeEvent<string>) => {
    setIsDelete(event.target.value);
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchParams: IVideoTableFilters = { ...params };
    if (videoType) searchParams.videoType = videoType;
    if (keyword) searchParams.keyword = keyword;
    if (isConfirm) searchParams.isConfirm = isConfirm;
    if (isDelete) searchParams.isDelete = isDelete;

    onToolbarSubmit(searchParams);
  };

  return (
    <>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>비디오 타입</InputLabel>
        <Select
          value={videoType}
          onChange={handleVideoTypeChange}
          input={<OutlinedInput label="비디오 타입" />}
          sx={{ textTransform: 'capitalize' }}
          renderValue={(selected) => {
            const selectOption = videoTypeOptions.find((option) => option.value === selected);
            return selectOption ? selectOption.label : '';
          }}
        >
          {videoTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="타이틀 검색"
        value={keyword}
        onChange={handleKeywordChange}
        sx={{ minWidth: 150 }}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>관리자 승인</InputLabel>
        <Select
          value={isConfirm}
          onChange={handleIsConfirmChange}
          input={<OutlinedInput label="관리자 승인" />}
          sx={{ textTransform: 'capitalize' }}
          renderValue={(selected) => {
            const selectOption = videoIsConfirmOptions.find((option) => option.value === selected);
            return selectOption ? selectOption.label : '';
          }}
        >
          {videoIsConfirmOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>노출 여부</InputLabel>
        <Select
          value={isDelete}
          onChange={handleIsDeleteChange}
          input={<OutlinedInput label="노출 여부" />}
          sx={{ textTransform: 'capitalize' }}
          renderValue={(selected) => {
            const selectOption = videoIsDeleteOptions.find((option) => option.value === selected);
            return selectOption ? selectOption.label : '';
          }}
        >
          <MenuItem value="true">비노출</MenuItem>
          <MenuItem value="false">노출</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit} sx={{ px: 3, py: 2 }}>
        검색
      </Button>
    </>
  );
}
