export interface IAnimatedScrollViewRef {
  current?: {
    getNode: () => {
      scrollTo: (prop: { [x: string]: number }) => any;
    };
  };
}
