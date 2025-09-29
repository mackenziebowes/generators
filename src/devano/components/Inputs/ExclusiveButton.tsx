import { JSX, Switch, Match } from "solid-js";
import { Button } from "~/devano/atoms";

export interface ExclusiveButtonInstance
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  condition: boolean;
  trigger: Function;
  label: string;
}

export const ExclusiveButton = (props: ExclusiveButtonInstance) => {
  return (
    <Switch>
      <Match when={props.condition}>
        <Button outline>{props.label}</Button>
      </Match>
      <Match when={!props.condition}>
        <Button onclick={() => props.trigger()}>{props.label}</Button>
      </Match>
    </Switch>
  );
};
