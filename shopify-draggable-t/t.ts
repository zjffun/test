// import { Droppable, DragSensor, Sensors } from "@shopify/draggable";
import {
  Droppable,
  DragSensor,
  Sensors,
} from "@shopify/draggable/lib/draggable.bundle.js";

const droppable = new Droppable(document.querySelectorAll(".app"), {
  draggable: ".item",
  dropzone: ".dropzone",
  sensors: [DragSensor, Sensors.DragSensor],
});
