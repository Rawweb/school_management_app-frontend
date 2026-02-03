export const getBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    return {
      label: segment.replace('-', ' '),
      path,
    };
  });
};
