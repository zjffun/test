declare module "@shopify/draggable/lib/draggable.bundle.js" {
  export * from "@shopify/draggable";
}

// declare module "@shopify/draggable" {
//   interface DraggableOptions {
//     draggable?: string;
//     distance?: number;
//     handle?:
//       | string
//       | NodeList
//       | HTMLElement[]
//       | HTMLElement
//       | ((currentElement: HTMLElement) => HTMLElement);
//     delay?: number | DelayOptions;
//     plugins?: Array<typeof AbstractPlugin>;
//     sensors?: Array<typeof Sensor>;
//     classes?: { [key in DraggableClassNames]: string | string[] };
//     announcements?: AnnouncementOptions;
//     collidables?: Collidables;
//     mirror?: MirrorOptions;
//     scrollable?: ScrollableOptions;
//     swapAnimation?: SwapAnimationOptions;
//     sortAnimation?: SortAnimationOptions;
//   }

//   export type Droppable = String;

//   export class FixedDraggable<EventListType = DraggableEventNames> {
//     constructor(containers: DraggableContainer, options?: DraggableOptions);
//   }
// }
