"use client";

import type { MouseEvent } from "react";

export function ConfirmSubmitButton({
  children,
  className,
  message,
  fieldName,
  confirmValues,
}: {
  children: React.ReactNode;
  className?: string;
  message: string;
  fieldName?: string;
  confirmValues?: string[];
}) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (fieldName && confirmValues?.length) {
      const form = event.currentTarget.form;
      const field = form?.elements.namedItem(fieldName);
      const value =
        field instanceof HTMLSelectElement ||
        field instanceof HTMLInputElement
          ? field.value
          : "";
      if (!confirmValues.includes(value)) return;
    }

    if (!window.confirm(message)) event.preventDefault();
  }

  return (
    <button type="submit" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
