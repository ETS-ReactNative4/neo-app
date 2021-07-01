let navigationService = {
  navigation: {}
};

export const setNavigationService = _navigation => {
  return (navigationService.navigation = _navigation);
};

export default navigationService;
