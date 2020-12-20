import { Sortable } from "@shopify/draggable";

const sortable = new Sortable(document.querySelectorAll("ul"), {
  draggable: "li",
});

// The type of the first argument is SortableEventNames
sortable.on("sortable:sort", (evt) => {
  // The type of evt is SortableSortEvent
});

// The type of the first argument is SortableEventNames
sortable.on("drag:out:container", (evt) => {
  // The type of evt is DragOutContainerEvent
});
