import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        items: [
          { title: 'one', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'two', path: paths.dashboard.two, icon: ICONS.ecommerce },
          {
            title: 'three',
            path: paths.dashboard.three,
            icon: ICONS.analytics,
          },
        ],
      },

      // CONTENTS
      // ----------------------------------------------------------------------
      {
        subheader: 'CONTENTS',
        items: [
          {
            title: '비디오 관리',
            path: paths.content.root,
            icon: ICONS.user,
            children: [
              { title: '비디오 목록', path: paths.content.video.list },
              { title: '순위', path: paths.content.video.ranking },
            ],
          },
          {
            title: '리뷰 관리',
            path: paths.dashboard.group.root,
            icon: ICONS.user,
            children: [
              { title: '목록', path: paths.dashboard.group.root },
              { title: 'five', path: paths.dashboard.group.five },
              { title: 'six', path: paths.dashboard.group.six },
            ],
          },
        ],
      },
      // USER
      {
        subheader: 'USER',
        items: [
          {
            title: '사용자 목록',
            path: paths.dashboard.group.root,
            icon: ICONS.user,
          },
          {
            title: '차단 관리',
            path: paths.dashboard.group.root,
            icon: ICONS.user,
          },
          {
            title: '권한 관리',
            path: paths.dashboard.group.root,
            icon: ICONS.user,
          },
        ],
      },
    ],
    []
  );

  return data;
}
