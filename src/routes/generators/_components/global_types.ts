import { Accessor, Setter } from "solid-js";

export interface Signal<T> {
  get: Accessor<T>;
  set: Setter<T>;
}
