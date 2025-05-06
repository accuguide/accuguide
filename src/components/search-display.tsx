import { SearchDisplayProps } from "@/types";

export default function SearchDisplay({
  displayType,
  id,
  googleId,
  name,
  address,
  type,
}: SearchDisplayProps) {
  const [firstLine, ...rest] = address.split(", ");
  const capitalizedType = type
    .split("_") // Split the type by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with spaces
  function handleClick() {
    if (displayType === "google") {
      window.location.href = `/entity/${googleId}`;
    } else {
      window.location.href = `/entity/${id}`;
    }
  }

  return (
    <div className="mb-2 cursor-pointer" onClick={handleClick}>
      <h2>{name}</h2>
      <p>{capitalizedType}</p>
      <p>
        {firstLine}
        <br />
        {rest.join(", ")}
      </p>{" "}
    </div>
  );
}
