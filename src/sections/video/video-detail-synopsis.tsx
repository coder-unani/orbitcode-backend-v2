import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  synopsys: string;
};

export default function VideoDetailSynopsis({ synopsys }: Props) {
  return (
    <Markdown
      children={synopsys}
      sx={{
        p: 3,
        '& p, li, ol': {
          typography: 'body2',
        },
        '& ol': {
          p: 0,
          display: { md: 'flex' },
          listStyleType: 'none',
          '& li': {
            '&:first-of-type': {
              minWidth: 240,
              mb: { xs: 0.5, md: 0 },
            },
          },
        },
      }}
    />
  );
}
