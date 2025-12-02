import { useEffect, useRef, memo } from "react";
import { select } from "d3-selection";
import "d3-transition";
import { easeLinear } from "d3-ease";
import { SiGit, SiNodedotjs, SiYarn, SiVite, SiGithub } from "react-icons/si";
import { FaCodeBranch, FaCloudUploadAlt, FaGlobe } from "react-icons/fa";

type Node = {
  id: number;
  label: string;
  x: number;
  y: number;
  icon: string;
};

type Edge = {
  source: Node;
  target: Node;
  dashed: boolean;
};

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  git: SiGit,
  code: FaCodeBranch,
  node: SiNodedotjs,
  yarn: SiYarn,
  vite: SiVite,
  upload: FaCloudUploadAlt,
  github: SiGithub,
  globe: FaGlobe,
};

// Define steps and positions outside component (static data)
const padding = 100;
const nodeSpacingX = 240;
const nodeSpacingY = 160;

const steps = [
  { label: "Git Push", icon: "git" },
  { label: "Checkout Code", icon: "code" },
  { label: "Setup Node", icon: "node" },
  { label: "Install Deps", icon: "yarn" },
  { label: "Build", icon: "vite" },
  { label: "Upload Artifact", icon: "upload" },
  { label: "Deploy", icon: "github" },
  { label: "Live Site", icon: "globe" },
];

// Square layout: 2 blocks on each side, empty center
const positions = [
  { x: padding + nodeSpacingX * 0.5, y: padding }, // Git Push (top left)
  { x: padding + nodeSpacingX * 1.5, y: padding }, // Checkout (top right)
  { x: padding + nodeSpacingX * 2, y: padding + nodeSpacingY * 0.5 }, // Setup Node (right top)
  { x: padding + nodeSpacingX * 2, y: padding + nodeSpacingY * 1.5 }, // Install Deps (right bottom)
  { x: padding + nodeSpacingX * 1.5, y: padding + nodeSpacingY * 2 }, // Build (bottom right)
  { x: padding + nodeSpacingX * 0.5, y: padding + nodeSpacingY * 2 }, // Upload (bottom left)
  { x: padding, y: padding + nodeSpacingY * 1.5 }, // Deploy (left bottom)
  { x: padding, y: padding + nodeSpacingY * 0.5 }, // Live Site (left top)
];

export const PipelineDiagram = memo(() => {
  const svgRef = useRef<SVGSVGElement>(null);
  const intervalsRef = useRef<{ loop: number | null }>({
    loop: null,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current);
    const width = 800;
    const height = 600;

    // Capture ref values for cleanup function
    const svgElement = svgRef.current;
    const intervals = intervalsRef.current;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const nodes: Node[] = steps.map((step, i) => ({
      id: i + 1,
      label: step.label,
      icon: step.icon,
      x: positions[i].x,
      y: positions[i].y,
    }));

    // Define edges data
    const edges: Edge[] = [
      { source: nodes[0], target: nodes[1], dashed: false },
      { source: nodes[1], target: nodes[2], dashed: false },
      { source: nodes[2], target: nodes[3], dashed: false },
      { source: nodes[3], target: nodes[4], dashed: false },
      { source: nodes[4], target: nodes[5], dashed: false },
      { source: nodes[5], target: nodes[6], dashed: false },
      { source: nodes[6], target: nodes[7], dashed: false },
    ];

    // Draw edges as polylines with angles
    const edgeGroup = svg.append("g");

    // Icon circle dimensions (icon is in a circle now, not rectangle)
    const iconRadius = 40; // Radius of the circular icon container

    // Helper function to get connection point on circle edge
    const getConnectionPoint = (node: Node, targetNode: Node) => {
      const dx = targetNode.x - node.x;
      const dy = targetNode.y - node.y;
      const angle = Math.atan2(dy, dx);

      // Return point on circle perimeter in direction of target
      return {
        x: node.x + iconRadius * Math.cos(angle),
        y: node.y + iconRadius * Math.sin(angle),
      };
    };

    const edgeLines = edgeGroup
      .selectAll("polyline")
      .data(edges)
      .enter()
      .append("polyline")
      .attr("points", (d) => {
        const startPoint = getConnectionPoint(d.source, d.target);
        const endPoint = getConnectionPoint(d.target, d.source);

        // Determine if we need a corner
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;

        if (Math.abs(dx) > 50 && Math.abs(dy) > 50) {
          // Diagonal - add corner point
          // Create L-shaped connection
          return `${startPoint.x},${startPoint.y} ${endPoint.x},${startPoint.y} ${endPoint.x},${endPoint.y}`;
        } else {
          // Straight line
          return `${startPoint.x},${startPoint.y} ${endPoint.x},${endPoint.y}`;
        }
      })
      .attr("stroke", "#60a5fa")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("opacity", 1);

    // Add traveling dots on edges
    const dotGroup = svg.append("g");

    function animateDots() {
      // Clear existing dots
      dotGroup.selectAll("circle").remove();

      const polylineElements = edgeLines.nodes() as SVGPolylineElement[];
      const travelDuration = 1000; // Duration for dot to travel along one edge

      edges.forEach((edge, i) => {
        if (!edge.dashed) {
          const polylineElement = polylineElements[i];
          const totalLength = polylineElement.getTotalLength();

          const dot = dotGroup
            .append("circle")
            .attr("r", 6)
            .attr("fill", "#fbbf24")
            .style("opacity", 0);

          // Animate dot along the polyline path
          dot
            .transition()
            .delay(i * travelDuration)
            .duration(0)
            .style("opacity", 1)
            .transition()
            .duration(travelDuration)
            .ease(easeLinear)
            .attrTween("cx", () => {
              return (t: number) => {
                const point = polylineElement.getPointAtLength(t * totalLength);
                return String(point.x);
              };
            })
            .attrTween("cy", () => {
              return (t: number) => {
                const point = polylineElement.getPointAtLength(t * totalLength);
                return String(point.y);
              };
            })
            .transition()
            .duration(0)
            .style("opacity", 0)
            .remove();
        }
      });
    }

    // Nodes are now rendered as React components, not SVG
    // Start initial dot animation
    animateDots();

    // Loop dot animation continuously
    intervalsRef.current.loop = setInterval(() => {
      animateDots();
    }, 7 * 1000 + 500); // 7 edges × 1000ms + 500ms pause

    // Cleanup function - stops all intervals and D3 transitions
    return () => {
      // Clear interval
      if (intervals.loop) {
        clearInterval(intervals.loop);
        intervals.loop = null;
      }

      // Stop all D3 transitions to prevent animations from running after unmount
      if (svgElement) {
        select(svgElement).selectAll("*").interrupt();
      }
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center relative">
      <svg
        ref={svgRef}
        className="w-full max-w-full h-auto"
        style={{ maxHeight: "600px" }}
      />
      {/* Render icons as React components positioned over SVG */}
      {steps.map((step, i) => {
        const IconComponent = iconMap[step.icon];
        const position = positions[i];
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: `${(position.x / 800) * 100}%`,
              top: `${(position.y / 600) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="bg-blue-500 rounded-full p-4 flex items-center justify-center">
              <IconComponent size={32} color="#ffffff" />
            </div>
            <span className="text-white text-xs mt-2 text-center whitespace-nowrap">
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
});
