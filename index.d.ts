type ContentRSS = {
  /**
   * ID
   */
  id: string;
  /**
   * content of history
   */
  content: string;
  /**
   * title history
   */
  title: string;
};
declare function getListBashOrg(rssUrl?: string): Promise<ContentRSS>;
declare namespace getListBashOrg {}

export = getListBashOrg;
