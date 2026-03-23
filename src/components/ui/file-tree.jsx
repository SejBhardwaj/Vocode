import { useState } from "react";

const getFileIcon = (extension) => {
  const iconMap = {
    tsx: { color: "#60a5fa", icon: "⚛" },
    ts:  { color: "#818cf8", icon: "◆" },
    jsx: { color: "#38bdf8", icon: "⚛" },
    js:  { color: "#fbbf24", icon: "◆" },
    css: { color: "#c084fc", icon: "◈" },
    json:{ color: "#fb923c", icon: "{}" },
    md:  { color: "#94a3b8", icon: "◊" },
    svg: { color: "#34d399", icon: "◐" },
    png: { color: "#4ade80", icon: "◑" },
    html:{ color: "#f87171", icon: "◇" },
  };
  return iconMap[extension] || { color: "#94a3b8", icon: "◇" };
};

function FileItem({ node, depth }) {
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState(false);
  const isFolder = node.type === "folder";
  const fileIcon = getFileIcon(node.extension);

  return (
    <div className="select-none">
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center gap-1.5 py-0.5 rounded-md cursor-pointer transition-all duration-150"
        style={{
          paddingLeft: `${depth * 14 + 8}px`,
          paddingRight: 8,
          background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
        }}
      >
        {/* Tree line */}
        {depth > 0 && (
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(depth - 1) * 14 + 16}px`, background: "rgba(255,255,255,0.08)" }}
          />
        )}

        {/* Chevron / spacer */}
        <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
          {isFolder ? (
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "rgba(255,255,255,0.4)" }}>
              <path d="M1 1L5 4L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <span style={{ fontSize: 9, color: fileIcon.color }}>{fileIcon.icon}</span>
          )}
        </div>

        {/* Folder / file icon */}
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
          {isFolder ? (
            <svg width="14" height="12" viewBox="0 0 16 14" fill="#fbbf24" opacity={hovered ? 1 : 0.75}>
              <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
            </svg>
          ) : (
            <svg width="11" height="13" viewBox="0 0 14 16" fill={fileIcon.color} opacity={hovered ? 1 : 0.7}>
              <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V14.5C0 15.3284 0.671573 16 1.5 16H12.5C13.3284 16 14 15.3284 14 14.5V4.5L9.5 0H1.5Z" />
              <path d="M9 0V4.5H14" fill="white" fillOpacity="0.25" />
            </svg>
          )}
        </div>

        {/* Name */}
        <span className="text-xs font-mono truncate" style={{ color: hovered ? "#fff" : isFolder ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)" }}>
          {node.name}
        </span>
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileItem key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ data, className = "" }) {
  return (
    <div className={`font-mono ${className}`}>
      <div className="space-y-0.5">
        {data.map((node) => (
          <FileItem key={node.name} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
}
