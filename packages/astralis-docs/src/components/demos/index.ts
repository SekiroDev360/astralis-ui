import type { ComponentType } from "react";
import { ButtonDemo } from "./button/button-demo";
import { ButtonVariants } from "./button/button-variants";
import { ButtonColorSchemes } from "./button/button-color-schemes";
import { ButtonSizes } from "./button/button-sizes";
import { ButtonRounded } from "./button/button-rounded";
import { ButtonIcons } from "./button/button-icons";
import { ButtonLoading } from "./button/button-loading";
import { ButtonFullWidth } from "./button/button-full-width";
import { ButtonAsLink } from "./button/button-as-link";
import { ButtonGroupDemo } from "./button-group/button-group-demo";
import { ButtonGroupAttached } from "./button-group/button-group-attached";
import { ButtonGroupOrientation } from "./button-group/button-group-orientation";
import { ButtonGroupSpacing } from "./button-group/button-group-spacing";
import { ButtonGroupDisabled } from "./button-group/button-group-disabled";
import { ThemeToggleDemo } from "./theme-toggle/theme-toggle-demo";
import { ThemeToggleLabel } from "./theme-toggle/theme-toggle-label";
import { ThemeToggleVariants } from "./theme-toggle/theme-toggle-variants";
import { BoxDemo } from "./box/box-demo";
import { BoxStyleProps } from "./box/box-style-props";
import { BoxResponsive } from "./box/box-responsive";
import { BoxAs } from "./box/box-as";
import { FlexDemo } from "./flex/flex-demo";
import { FlexAlign } from "./flex/flex-align";
import { FlexItem } from "./flex/flex-item";
import { FlexResponsive } from "./flex/flex-responsive";
import { StackDemo } from "./stack/stack-demo";
import { StackHorizontal } from "./stack/stack-horizontal";
import { StackDirection } from "./stack/stack-direction";
import { GridDemo } from "./grid/grid-demo";
import { GridSpan } from "./grid/grid-span";
import { GridResponsive } from "./grid/grid-responsive";
import { GridTemplate } from "./grid/grid-template";
import { CenterDemo } from "./center/center-demo";
import { CenterBadges } from "./center/center-badges";
import { ContainerDemo } from "./container/container-demo";
import { ContainerSizes } from "./container/container-sizes";
import { AspectRatioDemo } from "./aspect-ratio/aspect-ratio-demo";
import { AspectRatioRatios } from "./aspect-ratio/aspect-ratio-ratios";
import { FloatDemo } from "./float/float-demo";
import { FloatPlacements } from "./float/float-placements";
import { SeparatorDemo } from "./separator/separator-demo";
import { SeparatorVertical } from "./separator/separator-vertical";
import { SeparatorVariants } from "./separator/separator-variants";
import { TextDemo } from "./text/text-demo";
import { TextSizes } from "./text/text-sizes";
import { TextWeights } from "./text/text-weights";
import { TextTruncation } from "./text/text-truncation";
import { TextStyling } from "./text/text-styling";
import { HeadingDemo } from "./heading/heading-demo";
import { HeadingSizeOverride } from "./heading/heading-size-override";
import { BlockquoteDemo } from "./blockquote/blockquote-demo";
import { BlockquoteVariants } from "./blockquote/blockquote-variants";
import { CodeDemo } from "./code/code-demo";
import { CodeVariants } from "./code/code-variants";
import { CodeBlockDemo } from "./code-block/code-block-demo";
import { CodeBlockVariants } from "./code-block/code-block-variants";
import { HighlightDemo } from "./highlight/highlight-demo";
import { HighlightVariants } from "./highlight/highlight-variants";
import { ListDemo } from "./list/list-demo";
import { ListStyleTypes } from "./list/list-style-types";
import { ListIcons } from "./list/list-icons";
import { AccordionDemo } from "./accordion/accordion-demo";
import { AccordionVariants } from "./accordion/accordion-variants";
import { AccordionMultiple } from "./accordion/accordion-multiple";
import { AccordionControlled } from "./accordion/accordion-controlled";
import { AccordionCustom } from "./accordion/accordion-custom";
import { CarouselDemo } from "./carousel/carousel-demo";
import { CarouselAutoplay } from "./carousel/carousel-autoplay";
import { CarouselMulti } from "./carousel/carousel-multi";
import { CarouselFade } from "./carousel/carousel-fade";
import { PaginationDemo } from "./pagination/pagination-demo";
import { PaginationVariants } from "./pagination/pagination-variants";
import { PaginationFull } from "./pagination/pagination-full";
import { PaginationControlled } from "./pagination/pagination-controlled";
import { IconDemo } from "./icon/icon-demo";
import { IconSizes } from "./icon/icon-sizes";
import { IconColors } from "./icon/icon-colors";
import { IconCustom } from "./icon/icon-custom";
import { TabsDemo } from "./tabs/tabs-demo";
import { TabsVariants } from "./tabs/tabs-variants";
import { TabsVertical } from "./tabs/tabs-vertical";
import { TabsFitted } from "./tabs/tabs-fitted";
import { StepsDemo } from "./steps/steps-demo";
import { StepsVariants } from "./steps/steps-variants";
import { StepsVertical } from "./steps/steps-vertical";
import { StepsClickable } from "./steps/steps-clickable";
import { ModalDemo } from "./modal/modal-demo";
import { ModalSizes } from "./modal/modal-sizes";
import { ModalControlled } from "./modal/modal-controlled";
import { DrawerDemo } from "./drawer/drawer-demo";
import { DrawerPlacements } from "./drawer/drawer-placements";
import { TooltipDemo } from "./tooltip/tooltip-demo";
import { TooltipSides } from "./tooltip/tooltip-sides";
import { PopoverDemo } from "./popover/popover-demo";
import { PopoverPlacement } from "./popover/popover-placement";
import { InputDemo } from "./input/input-demo";
import { InputVariants } from "./input/input-variants";
import { InputTypes } from "./input/input-types";
import { InputGroupDemo } from "./input/input-group";
import { FieldDemo } from "./field/field-demo";
import { FieldError } from "./field/field-error";
import { CheckboxDemo } from "./checkbox/checkbox-demo";
import { CheckboxGroup } from "./checkbox/checkbox-group";
import { CheckboxStates } from "./checkbox/checkbox-states";
import { RadioDemo } from "./radio/radio-demo";
import { RadioHorizontal } from "./radio/radio-horizontal";
import { SwitchDemo } from "./switch/switch-demo";
import { SwitchStates } from "./switch/switch-states";
import { SelectDemo } from "./select/select-demo";
import { SelectSearchable } from "./select/select-searchable";
import { SelectStates } from "./select/select-states";
import { MultiSelectDemo } from "./multi-select/multi-select-demo";
import { MultiSelectMax } from "./multi-select/multi-select-max";
import { PinInputDemo } from "./pin-input/pin-input-demo";
import { PinInputMask } from "./pin-input/pin-input-mask";
import { SliderDemo } from "./slider/slider-demo";
import { SliderMarks } from "./slider/slider-marks";
import { SliderRange } from "./slider/slider-range";
import { CardDemo } from "./card/card-demo";
import { CardVariants } from "./card/card-variants";
import { TagDemo } from "./tag/tag-demo";
import { TagCheckable } from "./tag/tag-checkable";
import { AlertDemo } from "./alert/alert-demo";
import { ComboboxDemo } from "./combobox/combobox-demo";
import { TextareaDemo } from "./textarea/textarea-demo";
import { NumberInputDemo } from "./number-input/number-input-demo";
import { LinkDemo } from "./link/link-demo";
import { MenuDemo } from "./menu/menu-demo";
import { MenuPlacement } from "./menu/menu-placement";
import { ToastDemo } from "./toast/toast-demo";
import { ToastOptions } from "./toast/toast-options";
import { KbdDemo } from "./kbd/kbd-demo";
import { BreadcrumbDemo } from "./breadcrumb/breadcrumb-demo";
import { BreadcrumbSeparator } from "./breadcrumb/breadcrumb-separator";
import { AlertVariants } from "./alert/alert-variants";
import { ProgressDemo } from "./progress/progress-demo";
import { ProgressCircle } from "./progress/progress-circle";
import { SkeletonDemo } from "./skeleton/skeleton-demo";
import { SkeletonLoaded } from "./skeleton/skeleton-loaded";
import { SpinnerDemo } from "./spinner/spinner-demo";
import { SpinnerSchemes } from "./spinner/spinner-schemes";
import { BadgeDemo } from "./badge/badge-demo";
import { BadgeVariants } from "./badge/badge-variants";
import { AvatarDemo } from "./avatar/avatar-demo";
import { AvatarGroup } from "./avatar/avatar-group";
import { AvatarSizes } from "./avatar/avatar-sizes";
import { ImageDemo } from "./image/image-demo";
import { ImagePreview } from "./image/image-preview";
import { ImageFallback } from "./image/image-fallback";
import { DataListDemo } from "./data-list/data-list-demo";
import { DataListVertical } from "./data-list/data-list-vertical";
import { CalendarDemo } from "./calendar/calendar-demo";
import { CalendarRange } from "./calendar/calendar-range";
import { TableDemo } from "./table/table-demo";
import { StatDemo } from "./stat/stat-demo";
import { TimelineDemo } from "./timeline/timeline-demo";
import { TimelineVariants } from "./timeline/timeline-variants";
import { MarqueeDemo } from "./marquee/marquee-demo";
import { MarqueeReverse } from "./marquee/marquee-reverse";
import { QrCodeDemo } from "./qr-code/qr-code-demo";
import { QrCodeStates } from "./qr-code/qr-code-states";

export interface DemoEntry {
  component: ComponentType;
  /** Path relative to src/components/demos — shown verbatim in the Code tab. */
  file: string;
}

export const demos = {
  "button-demo": { component: ButtonDemo, file: "button/button-demo.tsx" },
  "button-variants": { component: ButtonVariants, file: "button/button-variants.tsx" },
  "button-color-schemes": { component: ButtonColorSchemes, file: "button/button-color-schemes.tsx" },
  "button-sizes": { component: ButtonSizes, file: "button/button-sizes.tsx" },
  "button-rounded": { component: ButtonRounded, file: "button/button-rounded.tsx" },
  "button-icons": { component: ButtonIcons, file: "button/button-icons.tsx" },
  "button-loading": { component: ButtonLoading, file: "button/button-loading.tsx" },
  "button-full-width": { component: ButtonFullWidth, file: "button/button-full-width.tsx" },
  "button-as-link": { component: ButtonAsLink, file: "button/button-as-link.tsx" },
  "button-group-demo": { component: ButtonGroupDemo, file: "button-group/button-group-demo.tsx" },
  "button-group-attached": { component: ButtonGroupAttached, file: "button-group/button-group-attached.tsx" },
  "button-group-orientation": { component: ButtonGroupOrientation, file: "button-group/button-group-orientation.tsx" },
  "button-group-spacing": { component: ButtonGroupSpacing, file: "button-group/button-group-spacing.tsx" },
  "button-group-disabled": { component: ButtonGroupDisabled, file: "button-group/button-group-disabled.tsx" },
  "theme-toggle-demo": { component: ThemeToggleDemo, file: "theme-toggle/theme-toggle-demo.tsx" },
  "theme-toggle-label": { component: ThemeToggleLabel, file: "theme-toggle/theme-toggle-label.tsx" },
  "theme-toggle-variants": { component: ThemeToggleVariants, file: "theme-toggle/theme-toggle-variants.tsx" },
  "box-demo": { component: BoxDemo, file: "box/box-demo.tsx" },
  "box-style-props": { component: BoxStyleProps, file: "box/box-style-props.tsx" },
  "box-responsive": { component: BoxResponsive, file: "box/box-responsive.tsx" },
  "box-as": { component: BoxAs, file: "box/box-as.tsx" },
  "flex-demo": { component: FlexDemo, file: "flex/flex-demo.tsx" },
  "flex-align": { component: FlexAlign, file: "flex/flex-align.tsx" },
  "flex-item": { component: FlexItem, file: "flex/flex-item.tsx" },
  "flex-responsive": { component: FlexResponsive, file: "flex/flex-responsive.tsx" },
  "stack-demo": { component: StackDemo, file: "stack/stack-demo.tsx" },
  "stack-horizontal": { component: StackHorizontal, file: "stack/stack-horizontal.tsx" },
  "stack-direction": { component: StackDirection, file: "stack/stack-direction.tsx" },
  "grid-demo": { component: GridDemo, file: "grid/grid-demo.tsx" },
  "grid-span": { component: GridSpan, file: "grid/grid-span.tsx" },
  "grid-responsive": { component: GridResponsive, file: "grid/grid-responsive.tsx" },
  "grid-template": { component: GridTemplate, file: "grid/grid-template.tsx" },
  "center-demo": { component: CenterDemo, file: "center/center-demo.tsx" },
  "center-badges": { component: CenterBadges, file: "center/center-badges.tsx" },
  "container-demo": { component: ContainerDemo, file: "container/container-demo.tsx" },
  "container-sizes": { component: ContainerSizes, file: "container/container-sizes.tsx" },
  "aspect-ratio-demo": { component: AspectRatioDemo, file: "aspect-ratio/aspect-ratio-demo.tsx" },
  "aspect-ratio-ratios": { component: AspectRatioRatios, file: "aspect-ratio/aspect-ratio-ratios.tsx" },
  "float-demo": { component: FloatDemo, file: "float/float-demo.tsx" },
  "float-placements": { component: FloatPlacements, file: "float/float-placements.tsx" },
  "separator-demo": { component: SeparatorDemo, file: "separator/separator-demo.tsx" },
  "separator-vertical": { component: SeparatorVertical, file: "separator/separator-vertical.tsx" },
  "separator-variants": { component: SeparatorVariants, file: "separator/separator-variants.tsx" },
  "text-demo": { component: TextDemo, file: "text/text-demo.tsx" },
  "text-sizes": { component: TextSizes, file: "text/text-sizes.tsx" },
  "text-weights": { component: TextWeights, file: "text/text-weights.tsx" },
  "text-truncation": { component: TextTruncation, file: "text/text-truncation.tsx" },
  "text-styling": { component: TextStyling, file: "text/text-styling.tsx" },
  "heading-demo": { component: HeadingDemo, file: "heading/heading-demo.tsx" },
  "heading-size-override": { component: HeadingSizeOverride, file: "heading/heading-size-override.tsx" },
  "blockquote-demo": { component: BlockquoteDemo, file: "blockquote/blockquote-demo.tsx" },
  "blockquote-variants": { component: BlockquoteVariants, file: "blockquote/blockquote-variants.tsx" },
  "code-demo": { component: CodeDemo, file: "code/code-demo.tsx" },
  "code-variants": { component: CodeVariants, file: "code/code-variants.tsx" },
  "code-block-demo": { component: CodeBlockDemo, file: "code-block/code-block-demo.tsx" },
  "code-block-variants": { component: CodeBlockVariants, file: "code-block/code-block-variants.tsx" },
  "highlight-demo": { component: HighlightDemo, file: "highlight/highlight-demo.tsx" },
  "highlight-variants": { component: HighlightVariants, file: "highlight/highlight-variants.tsx" },
  "list-demo": { component: ListDemo, file: "list/list-demo.tsx" },
  "list-style-types": { component: ListStyleTypes, file: "list/list-style-types.tsx" },
  "list-icons": { component: ListIcons, file: "list/list-icons.tsx" },
  "accordion-demo": { component: AccordionDemo, file: "accordion/accordion-demo.tsx" },
  "accordion-variants": { component: AccordionVariants, file: "accordion/accordion-variants.tsx" },
  "accordion-multiple": { component: AccordionMultiple, file: "accordion/accordion-multiple.tsx" },
  "accordion-controlled": { component: AccordionControlled, file: "accordion/accordion-controlled.tsx" },
  "accordion-custom": { component: AccordionCustom, file: "accordion/accordion-custom.tsx" },
  "carousel-demo": { component: CarouselDemo, file: "carousel/carousel-demo.tsx" },
  "carousel-autoplay": { component: CarouselAutoplay, file: "carousel/carousel-autoplay.tsx" },
  "carousel-multi": { component: CarouselMulti, file: "carousel/carousel-multi.tsx" },
  "carousel-fade": { component: CarouselFade, file: "carousel/carousel-fade.tsx" },
  "pagination-demo": { component: PaginationDemo, file: "pagination/pagination-demo.tsx" },
  "pagination-variants": { component: PaginationVariants, file: "pagination/pagination-variants.tsx" },
  "pagination-full": { component: PaginationFull, file: "pagination/pagination-full.tsx" },
  "pagination-controlled": { component: PaginationControlled, file: "pagination/pagination-controlled.tsx" },
  "icon-demo": { component: IconDemo, file: "icon/icon-demo.tsx" },
  "icon-sizes": { component: IconSizes, file: "icon/icon-sizes.tsx" },
  "icon-colors": { component: IconColors, file: "icon/icon-colors.tsx" },
  "icon-custom": { component: IconCustom, file: "icon/icon-custom.tsx" },
  "tabs-demo": { component: TabsDemo, file: "tabs/tabs-demo.tsx" },
  "tabs-variants": { component: TabsVariants, file: "tabs/tabs-variants.tsx" },
  "tabs-vertical": { component: TabsVertical, file: "tabs/tabs-vertical.tsx" },
  "tabs-fitted": { component: TabsFitted, file: "tabs/tabs-fitted.tsx" },
  "steps-demo": { component: StepsDemo, file: "steps/steps-demo.tsx" },
  "steps-variants": { component: StepsVariants, file: "steps/steps-variants.tsx" },
  "steps-vertical": { component: StepsVertical, file: "steps/steps-vertical.tsx" },
  "steps-clickable": { component: StepsClickable, file: "steps/steps-clickable.tsx" },
  "modal-demo": { component: ModalDemo, file: "modal/modal-demo.tsx" },
  "modal-sizes": { component: ModalSizes, file: "modal/modal-sizes.tsx" },
  "modal-controlled": { component: ModalControlled, file: "modal/modal-controlled.tsx" },
  "drawer-demo": { component: DrawerDemo, file: "drawer/drawer-demo.tsx" },
  "drawer-placements": { component: DrawerPlacements, file: "drawer/drawer-placements.tsx" },
  "tooltip-demo": { component: TooltipDemo, file: "tooltip/tooltip-demo.tsx" },
  "tooltip-sides": { component: TooltipSides, file: "tooltip/tooltip-sides.tsx" },
  "popover-demo": { component: PopoverDemo, file: "popover/popover-demo.tsx" },
  "popover-placement": { component: PopoverPlacement, file: "popover/popover-placement.tsx" },
  "input-demo": { component: InputDemo, file: "input/input-demo.tsx" },
  "input-variants": { component: InputVariants, file: "input/input-variants.tsx" },
  "input-types": { component: InputTypes, file: "input/input-types.tsx" },
  "input-group": { component: InputGroupDemo, file: "input/input-group.tsx" },
  "field-demo": { component: FieldDemo, file: "field/field-demo.tsx" },
  "field-error": { component: FieldError, file: "field/field-error.tsx" },
  "checkbox-demo": { component: CheckboxDemo, file: "checkbox/checkbox-demo.tsx" },
  "checkbox-group": { component: CheckboxGroup, file: "checkbox/checkbox-group.tsx" },
  "checkbox-states": { component: CheckboxStates, file: "checkbox/checkbox-states.tsx" },
  "radio-demo": { component: RadioDemo, file: "radio/radio-demo.tsx" },
  "radio-horizontal": { component: RadioHorizontal, file: "radio/radio-horizontal.tsx" },
  "switch-demo": { component: SwitchDemo, file: "switch/switch-demo.tsx" },
  "switch-states": { component: SwitchStates, file: "switch/switch-states.tsx" },
  "select-demo": { component: SelectDemo, file: "select/select-demo.tsx" },
  "select-searchable": { component: SelectSearchable, file: "select/select-searchable.tsx" },
  "select-states": { component: SelectStates, file: "select/select-states.tsx" },
  "multi-select-demo": { component: MultiSelectDemo, file: "multi-select/multi-select-demo.tsx" },
  "multi-select-max": { component: MultiSelectMax, file: "multi-select/multi-select-max.tsx" },
  "pin-input-demo": { component: PinInputDemo, file: "pin-input/pin-input-demo.tsx" },
  "pin-input-mask": { component: PinInputMask, file: "pin-input/pin-input-mask.tsx" },
  "slider-demo": { component: SliderDemo, file: "slider/slider-demo.tsx" },
  "slider-marks": { component: SliderMarks, file: "slider/slider-marks.tsx" },
  "slider-range": { component: SliderRange, file: "slider/slider-range.tsx" },
  "card-demo": { component: CardDemo, file: "card/card-demo.tsx" },
  "card-variants": { component: CardVariants, file: "card/card-variants.tsx" },
  "tag-demo": { component: TagDemo, file: "tag/tag-demo.tsx" },
  "tag-checkable": { component: TagCheckable, file: "tag/tag-checkable.tsx" },
  "alert-demo": { component: AlertDemo, file: "alert/alert-demo.tsx" },
  "combobox-demo": { component: ComboboxDemo, file: "combobox/combobox-demo.tsx" },
  "textarea-demo": { component: TextareaDemo, file: "textarea/textarea-demo.tsx" },
  "number-input-demo": { component: NumberInputDemo, file: "number-input/number-input-demo.tsx" },
  "link-demo": { component: LinkDemo, file: "link/link-demo.tsx" },
  "menu-demo": { component: MenuDemo, file: "menu/menu-demo.tsx" },
  "menu-placement": { component: MenuPlacement, file: "menu/menu-placement.tsx" },
  "toast-demo": { component: ToastDemo, file: "toast/toast-demo.tsx" },
  "toast-options": { component: ToastOptions, file: "toast/toast-options.tsx" },
  "kbd-demo": { component: KbdDemo, file: "kbd/kbd-demo.tsx" },
  "breadcrumb-demo": { component: BreadcrumbDemo, file: "breadcrumb/breadcrumb-demo.tsx" },
  "breadcrumb-separator": { component: BreadcrumbSeparator, file: "breadcrumb/breadcrumb-separator.tsx" },
  "alert-variants": { component: AlertVariants, file: "alert/alert-variants.tsx" },
  "progress-demo": { component: ProgressDemo, file: "progress/progress-demo.tsx" },
  "progress-circle": { component: ProgressCircle, file: "progress/progress-circle.tsx" },
  "skeleton-demo": { component: SkeletonDemo, file: "skeleton/skeleton-demo.tsx" },
  "skeleton-loaded": { component: SkeletonLoaded, file: "skeleton/skeleton-loaded.tsx" },
  "spinner-demo": { component: SpinnerDemo, file: "spinner/spinner-demo.tsx" },
  "spinner-schemes": { component: SpinnerSchemes, file: "spinner/spinner-schemes.tsx" },
  "badge-demo": { component: BadgeDemo, file: "badge/badge-demo.tsx" },
  "badge-variants": { component: BadgeVariants, file: "badge/badge-variants.tsx" },
  "avatar-demo": { component: AvatarDemo, file: "avatar/avatar-demo.tsx" },
  "avatar-group": { component: AvatarGroup, file: "avatar/avatar-group.tsx" },
  "avatar-sizes": { component: AvatarSizes, file: "avatar/avatar-sizes.tsx" },
  "image-demo": { component: ImageDemo, file: "image/image-demo.tsx" },
  "image-preview": { component: ImagePreview, file: "image/image-preview.tsx" },
  "image-fallback": { component: ImageFallback, file: "image/image-fallback.tsx" },
  "data-list-demo": { component: DataListDemo, file: "data-list/data-list-demo.tsx" },
  "data-list-vertical": { component: DataListVertical, file: "data-list/data-list-vertical.tsx" },
  "calendar-demo": { component: CalendarDemo, file: "calendar/calendar-demo.tsx" },
  "calendar-range": { component: CalendarRange, file: "calendar/calendar-range.tsx" },
  "table-demo": { component: TableDemo, file: "table/table-demo.tsx" },
  "stat-demo": { component: StatDemo, file: "stat/stat-demo.tsx" },
  "timeline-demo": { component: TimelineDemo, file: "timeline/timeline-demo.tsx" },
  "timeline-variants": { component: TimelineVariants, file: "timeline/timeline-variants.tsx" },
  "marquee-demo": { component: MarqueeDemo, file: "marquee/marquee-demo.tsx" },
  "marquee-reverse": { component: MarqueeReverse, file: "marquee/marquee-reverse.tsx" },
  "qr-code-demo": { component: QrCodeDemo, file: "qr-code/qr-code-demo.tsx" },
  "qr-code-states": { component: QrCodeStates, file: "qr-code/qr-code-states.tsx" },
} satisfies Record<string, DemoEntry>;
