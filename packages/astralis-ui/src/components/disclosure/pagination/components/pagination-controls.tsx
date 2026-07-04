import type { ReactNode } from "react";
import type { PaginationControlProps } from "../pagination.types";
import { usePagination } from "../pagination.context";
import { paginationControlVariants, controlIconSize } from "../pagination.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "../../../icon/internal-icons";

interface ControlButtonProps extends PaginationControlProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  defaultIcon: ReactNode;
}

function ControlButton({ icon, className = "", label, disabled, onClick, defaultIcon }: ControlButtonProps) {
  const { size, rounded } = usePagination();
  return (
    <li>
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={astralisMerge(paginationControlVariants({ size, rounded }), className)}
      >
        {icon ?? defaultIcon}
      </button>
    </li>
  );
}

export function PaginationPrev(props: PaginationControlProps) {
  const { page, setPage, size, disabled } = usePagination();
  return (
    <ControlButton
      {...props}
      label="Previous page"
      disabled={disabled || page <= 1}
      onClick={() => setPage(page - 1)}
      defaultIcon={<Icon size={controlIconSize[size]}><ChevronLeftIcon /></Icon>}
    />
  );
}

export function PaginationNext(props: PaginationControlProps) {
  const { page, totalPages, setPage, size, disabled } = usePagination();
  return (
    <ControlButton
      {...props}
      label="Next page"
      disabled={disabled || page >= totalPages}
      onClick={() => setPage(page + 1)}
      defaultIcon={<Icon size={controlIconSize[size]}><ChevronRightIcon /></Icon>}
    />
  );
}

export function PaginationFirst(props: PaginationControlProps) {
  const { page, setPage, size, disabled } = usePagination();
  return (
    <ControlButton
      {...props}
      label="First page"
      disabled={disabled || page <= 1}
      onClick={() => setPage(1)}
      defaultIcon={<Icon size={controlIconSize[size]}><ChevronsLeftIcon /></Icon>}
    />
  );
}

export function PaginationLast(props: PaginationControlProps) {
  const { page, totalPages, setPage, size, disabled } = usePagination();
  return (
    <ControlButton
      {...props}
      label="Last page"
      disabled={disabled || page >= totalPages}
      onClick={() => setPage(totalPages)}
      defaultIcon={<Icon size={controlIconSize[size]}><ChevronsRightIcon /></Icon>}
    />
  );
}
