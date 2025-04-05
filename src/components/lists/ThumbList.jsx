import { Tooltip } from "primereact/tooltip";
export default function ThumbList({ item }) {
  const [before, after] = item.title.split(item.highlight);

  return (
    <>
      <Tooltip target=".has-tooltip" />

      <li className="my-list cursor-pointer d-flex gap-2 align-items-start mb-3">
        <img src={item.image} alt={item.highlight} />
        <div
          className="has-tooltip"
          data-pr-tooltip={item.title}
          data-pr-position="top"
        >
          {before}
          <strong>{item.highlight}</strong>
          {after}
        </div>
      </li>
    </>
  );
}
