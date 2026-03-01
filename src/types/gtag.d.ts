interface Window {
  gtag?: (
    command: "event",
    eventName: string,
    eventParams?: {
      event_category?: string;
      event_label?: string;
      value?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    },
  ) => void;
}
