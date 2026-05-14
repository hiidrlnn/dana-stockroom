import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ChevronDownIcon({ className }: Props) {
  return (
    <svg
      className={cn(className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon({ className }: Props) {
  return (
    <svg
      className={cn(className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <path
        d="M10 10C11.8409 10 13.3333 8.50761 13.3333 6.66667C13.3333 4.82572 11.8409 3.33334 10 3.33334C8.15905 3.33334 6.66666 4.82572 6.66666 6.66667C6.66666 8.50761 8.15905 10 10 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.33334 16.6667C3.33334 13.9052 6.31811 11.6667 10 11.6667C13.6819 11.6667 16.6667 13.9052 16.6667 16.6667"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SettingsIcon({ className }: Props) {
  return (
    <svg
      className={cn(className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.6193 11.3807 7.5 10 7.5C8.6193 7.5 7.5 8.6193 7.5 10C7.5 11.3807 8.6193 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M16.6667 10.0001C16.6667 9.55842 16.6316 9.12512 16.5639 8.70373L18.3333 7.33341L16.6667 4.44452L14.5833 5.27785C13.9239 4.75844 13.1646 4.36488 12.3333 4.12008L12.0833 1.66675H7.91666L7.66666 4.12008C6.83542 4.36488 6.0761 4.75844 5.41666 5.27785L3.33333 4.44452L1.66666 7.33341L3.43611 8.70373C3.36842 9.12512 3.33333 9.55842 3.33333 10.0001C3.33333 10.4419 3.36842 10.8752 3.43611 11.2966L1.66666 12.6669L3.33333 15.5559L5.41666 14.7225C6.0761 15.2419 6.83542 15.6355 7.66666 15.8803L7.91666 18.3336H12.0833L12.3333 15.8803C13.1646 15.6355 13.9239 15.2419 14.5833 14.7225L16.6667 15.5559L18.3333 12.6669L16.5639 11.2966C16.6316 10.8752 16.6667 10.4419 16.6667 10.0001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon({ className }: Props) {
  return (
    <svg
      className={cn(className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <path
        d="M5.83334 8.33333V6.66667C5.83334 4.36548 7.69882 2.5 10 2.5C12.3012 2.5 14.1667 4.36548 14.1667 6.66667V8.33333"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="4.16666"
        y="8.33334"
        width="11.6667"
        height="9.16667"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function LogoutIcon({ className }: Props) {
  return (
    <svg
      className={cn(className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <path
        d="M7.5 17.5H5.83333C4.91286 17.5 4.16666 16.7538 4.16666 15.8333V4.16667C4.16666 3.24619 4.91286 2.5 5.83333 2.5H7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M11.6667 14.1667L15.8333 10L11.6667 5.83334"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15.8333 10H8.33333"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
