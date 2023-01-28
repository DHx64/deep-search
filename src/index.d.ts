declare const deepSearch: (
  keyword: string | number,
  array: Array<any>,
  excluded?:
    | {
        props: Array<string>;
        isInAllNesting: boolean;
      }
    | undefined
) => Array<any>;
export default deepSearch;
