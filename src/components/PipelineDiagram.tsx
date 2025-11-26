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
    const width = 800;
    const height = 600;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Define nodes in circular layout - matching actual deploy.yml workflow
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 240;
    const angleStep = (2 * Math.PI) / 8;
    const startAngle = -Math.PI / 2; // Start at top

    const labels = [
      "Git Push\nto Main",
      "Checkout\nCode",
      "Setup Node\n& Corepack",
      "Install Deps\n(yarn)",
      "Build\n(Vite)",
      "Upload\nArtifact",
      "Deploy to\nGH Pages",
      "Live Site",
    ];

    const nodes: Node[] = labels.map((label, i) => ({
      id: i + 1,
      label,
      x: centerX + radius * Math.cos(startAngle + i * angleStep),
      y: centerY + radius * Math.sin(startAngle + i * angleStep),
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

    // Draw edges as curved arcs
    const edgeGroup = svg.append("g");

    const edgeLines = edgeGroup
      .selectAll("path")
      .data(edges)
      .enter()
      .append("path")
      .attr("d", (d) => {
        // Calculate the angle and distance for the arc
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx);

        // Offset points with more spacing (70px from center instead of 60px)
        const offset = 70;
        const x1 = d.source.x + offset * Math.cos(angle);
        const y1 = d.source.y + offset * Math.sin(angle);
        const x2 = d.target.x - offset * Math.cos(angle);
        const y2 = d.target.y - offset * Math.sin(angle);

        // Calculate arc radius (distance between points)
        const arcRadius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        // Create an arc path (sweep-flag=1 for clockwise)
        return `M ${x1},${y1} A ${arcRadius},${arcRadius} 0 0,1 ${x2},${y2}`;
      })
      .attr("stroke", "#60a5fa")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("stroke-dasharray", (d) => (d.dashed ? "5,5" : "0"))
      .attr("marker-end", "url(#arrowhead)")
      .each(function (d) {
        const path = d3.select(this);
        const pathNode = this as SVGPathElement;
        const length = pathNode.getTotalLength();

        // Set initial dash offset for animation
        if (!d.dashed) {
          path
            .attr("stroke-dasharray", `${length} ${length}`)
            .attr("stroke-dashoffset", length);
        }
      });

    // Animate stroke dash (drawing effect)
    function animateEdges() {
      const cycleDuration = 1200;
      edgeLines.each(function (d, i) {
        const path = d3.select(this);
        if (!d.dashed) {
          const pathNode = this as SVGPathElement;
          const length = pathNode.getTotalLength();

          path
            .attr("stroke-dashoffset", length)
            .transition()
            .duration(600)
            .delay(i * cycleDuration + 500) // Start after block appears
            .ease(d3.easeCubicInOut)
            .attr("stroke-dashoffset", 0);
        }
      });
    }

    // Add traveling dots on edges
    const dotGroup = svg.append("g");

    function animateDots() {
      // Clear existing dots
      dotGroup.selectAll("circle").remove();

      // Get all path elements
      const pathElements = edgeLines.nodes() as SVGPathElement[];
      const cycleDuration = 1200;

      edges.forEach((edge, i) => {
        if (!edge.dashed) {
          const pathElement = pathElements[i];
          const pathLength = pathElement.getTotalLength();

          const dot = dotGroup
            .append("circle")
            .attr("r", 4)
            .attr("fill", "#64ffda")
            .style("opacity", 0);

          // Animate dot along the curved path
          dot
            .transition()
            .delay(i * cycleDuration + 600) // Start shortly after arrow starts
            .duration(0)
            .style("opacity", 1)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attrTween("cx", () => {
              return (t: number) => {
                const point = pathElement.getPointAtLength(t * pathLength);
                return String(point.x);
              };
            })
            .attrTween("cy", () => {
              return (t: number) => {
                const point = pathElement.getPointAtLength(t * pathLength);
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

    // Add pulse effect to arrows
    function pulseArrows() {
      edgeLines
        .filter((d) => !d.dashed)
        .transition()
        .duration(1000)
        .ease(d3.easeSinInOut)
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeSinInOut)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.7);
    }

    // Draw nodes
    const nodeGroup = svg.append("g");

    const nodeElements = nodeGroup
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("opacity", 0);

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

    // Synchronized sequential animation: block → arrow → dot → next block
    // Timing: Each cycle takes 1200ms (500ms block + 700ms arrow/dot)
    const cycleDuration = 1200;

    nodeElements
      .transition()
      .duration(500)
      .delay((_d, i) => i * cycleDuration)
      .ease(d3.easeCubicOut)
      .style("opacity", 1);

    // Start initial animations (start immediately with first block)
    animateEdges();
    animateDots();

    // Loop animations (wait for full sequence to complete: 8 blocks × 1200ms)
    const fullSequenceDuration = 8 * cycleDuration;
    const loopInterval = setInterval(() => {
      animateEdges();
      animateDots();
      pulseArrows();
    }, fullSequenceDuration + 2000); // Add 2s pause before repeating

    // Pulse arrows continuously
    const pulseInterval = setInterval(() => {
      pulseArrows();
    }, 3000);

    setIsRendered(true);

    // Cleanup
    return () => {
      clearInterval(loopInterval);
      clearInterval(pulseInterval);
    };
  }, [isRendered]);

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        ref={svgRef}
        className="w-full max-w-full h-auto"
        style={{ maxHeight: "600px" }}
      />
    </div>
  );
});
