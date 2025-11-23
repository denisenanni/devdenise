import { useEffect, useRef, useState, memo } from "react";
import * as d3 from "d3";

type Node = {
  id: number;
  label: string;
  x: number;
  y: number;
};

type Edge = {
  source: Node;
  target: Node;
  dashed: boolean;
};

export const PipelineDiagram = memo(() => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!svgRef.current || isRendered) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 260;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Define nodes data
    const nodes: Node[] = [
      { id: 1, label: "Local Dev:\nReact + Vite", x: 70, y: 80 },
      { id: 2, label: "Git Push\nto Main", x: 200, y: 80 },
      { id: 3, label: "GitHub Actions\nBuild", x: 330, y: 80 },
      { id: 4, label: "Static Site\n(dist)", x: 460, y: 80 },
      { id: 5, label: "Deploy to\ngh-pages", x: 590, y: 80 },
      { id: 6, label: "GitHub Pages\nLive Site", x: 720, y: 80 },
      { id: 7, label: "Optional:\nDocker Container", x: 330, y: 180 },
    ];

    // Define edges data
    const edges: Edge[] = [
      { source: nodes[0], target: nodes[1], dashed: false },
      { source: nodes[1], target: nodes[2], dashed: false },
      { source: nodes[2], target: nodes[3], dashed: false },
      { source: nodes[3], target: nodes[4], dashed: false },
      { source: nodes[4], target: nodes[5], dashed: false },
      { source: nodes[2], target: nodes[6], dashed: true },
    ];

    // Create arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#60a5fa");

    // Draw edges
    const edgeGroup = svg.append("g");

    edgeGroup
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x + 60)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x - 60)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "#60a5fa")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d) => (d.dashed ? "5,5" : "0"))
      .attr("marker-end", "url(#arrowhead)");

    // Draw nodes
    const nodeGroup = svg.append("g");

    const nodeElements = nodeGroup
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Add rectangles for nodes
    nodeElements
      .append("rect")
      .attr("x", -60)
      .attr("y", -20)
      .attr("width", 120)
      .attr("height", 40)
      .attr("rx", 6)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2);

    // Add text labels
    nodeElements.each(function (d: Node) {
      const lines = d.label.split("\n");
      const textElement = d3
        .select(this)
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "12px")
        .attr("font-weight", "500");

      if (lines.length === 1) {
        textElement.attr("dy", "0.35em").text(lines[0]);
      } else {
        lines.forEach((line: string, i: number) => {
          textElement
            .append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? "-0.3em" : "1.2em")
            .text(line);
        });
      }
    });

    setIsRendered(true);
  }, [isRendered]);

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        ref={svgRef}
        className="w-full max-w-full h-auto"
        style={{ maxHeight: "250px" }}
      />
    </div>
  );
});
