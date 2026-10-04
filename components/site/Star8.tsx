export function Star8({ color = "#C29A5B" }: { color?: string }) {
  return (
    <svg className="x-star8" viewBox="-13 -13 26 26" aria-hidden="true">
      <path
        d="M0.00,-12.50 2.37,-5.73 8.84,-8.84 5.73,-2.37 12.50,0.00 5.73,2.37 8.84,8.84 2.37,5.73 0.00,12.50 -2.37,5.73 -8.84,8.84 -5.73,2.37 -12.50,0.00 -5.73,-2.37 -8.84,-8.84 -2.37,-5.73Z"
        fill={color}
      />
    </svg>
  );
}
