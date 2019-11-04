const iconContexts = require.context('.', false, /\.vue$/);

const requireAll = context => context.keys().map(context);

export const icons = {};
requireAll(iconContexts).forEach(({ default: icon }) => {
  icons[icon.__file.match(/src\/icons\/(\w+)\.vue/)[1]] = icon;
});

export const {
  SearchIcon,
  UserIcon,
  CloseIcon,
  HomeIcon,
  ExploreIcon,
  PeopleIcon,
  NotificationIcon,
  MenuIcon,
  UploadImageIcon,
  DotsIcon,
  LikeIcon,
  PostCommentIcon,
} = icons;
