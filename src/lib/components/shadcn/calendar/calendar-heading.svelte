<script lang="ts">
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = CalendarPrimitive.HeadingProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.Heading
  let:headingValue
  class={cn("text-sm  bg-white dark:bg-[#000]", className)}
  {...$$restProps}
>
  <slot {headingValue}>
    {headingValue}
  </slot>
</CalendarPrimitive.Heading>
