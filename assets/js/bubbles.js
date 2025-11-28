document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('immersive-bubble-container');
    if (!container) return; // Only run on homepage

    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select("#immersive-bubble-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background", "transparent");

    // Define Profile Picture Pattern
    const defs = svg.append("defs");
    defs.append("pattern")
        .attr("id", "profile-pic")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", window.profilePic);

    // Load data
    const data = window.projectData;
    if (!data) return;

    // Nodes & Links
    let nodes = [];
    let links = [];

    // 1. Central Node (Profile)
    const centerNode = {
        id: "center",
        name: window.siteTitle,
        r: 60,
        type: "center",
        fx: width / 2,
        fy: height / 2
    };
    nodes.push(centerNode);

    data.forEach((category, catIndex) => {
        // 2. Category Nodes (Orbiting Center)
        const catNode = {
            id: category.category,
            name: category.category,
            r: 45,
            type: "category",
            color: "rgba(255, 255, 255, 0.6)",
            stroke: "#fff",
            textColor: "#1d1d1f"
        };
        nodes.push(catNode);
        links.push({ source: "center", target: category.category, distance: 180 });

        category.items.forEach((item) => {
            // 3. Project Nodes (Orbiting Category)
            const projNode = {
                id: item.title,
                name: item.title,
                subtitle: item.subtitle || "",
                description: item.description,
                tech: item.tech,
                link: item.link,
                r: 30,
                type: "project",
                color: "rgba(255, 255, 255, 0.9)",
                stroke: "#fff",
                textColor: "#1d1d1f"
            };
            nodes.push(projNode);
            links.push({ source: category.category, target: item.title, distance: 80 });
        });
    });

    // Simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.distance))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("collide", d3.forceCollide().radius(d => d.r + 10).iterations(3))
        .force("center", d3.forceRadial(100, width / 2, height / 2).strength(0.1));

    // Draw Links
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "rgba(255,255,255,0.4)")
        .attr("stroke-width", 1);

    // Draw Nodes
    const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Node Circles
    node.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => d.type === "center" ? "url(#profile-pic)" : d.color)
        .attr("stroke", d => d.stroke || "none")
        .attr("stroke-width", d => d.type === "center" ? 4 : 2)
        .style("cursor", d => d.type === "project" ? "pointer" : "default")
        .style("filter", "drop-shadow(0 4px 12px rgba(0,0,0,0.1))");

    // Labels
    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", d => d.type === "center" ? 80 : ".35em") // Move label below profile pic
        .style("pointer-events", "none")
        .style("font-family", "'SF Pro Display', sans-serif")
        .style("font-size", d => d.type === "center" ? "24px" : (d.type === "category" ? "14px" : "11px"))
        .style("font-weight", d => d.type === "center" ? "700" : (d.type === "category" ? "600" : "400"))
        .style("fill", "#1d1d1f")
        .text(d => d.name)
        .call(wrap, 80);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("padding", "16px")
        .style("border-radius", "12px")
        .style("max-width", "300px")
        .style("z-index", 1000);

    // Interactions
    node.on("mouseover", function (event, d) {
        if (d.type === "project") {
            d3.select(this).select("circle")
                .transition().duration(200)
                .attr("r", d.r + 10)
                .attr("fill", "#fff");

            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`
                <h3 style="margin:0 0 4px;font-size:16px;">${d.name}</h3>
                <p style="margin:0 0 8px;font-size:12px;color:#666;">${d.subtitle}</p>
                <p style="margin:0 0 8px;font-size:13px;line-height:1.4;">${d.description}</p>
                <span style="font-size:11px;color:#0071e3;font-weight:600;background:rgba(0,113,227,0.1);padding:2px 6px;border-radius:4px;">${d.tech}</span>
            `)
                .style("left", (event.pageX + 20) + "px")
                .style("top", (event.pageY - 20) + "px");
        }
    })
        .on("mouseout", function (d) {
            if (d.type === "project") {
                d3.select(this).select("circle")
                    .transition().duration(200)
                    .attr("r", d.r)
                    .attr("fill", d.color);
                tooltip.transition().duration(200).style("opacity", 0);
            }
        })
        .on("click", function (event, d) {
            if (d.type === "project" && d.link) {
                window.open(d.link, '_blank');
            }
        });

    // Tick
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        centerNode.fx = width / 2;
        centerNode.fy = height / 2;
        simulation.force("center", d3.forceRadial(100, width / 2, height / 2));
        simulation.alpha(0.3).restart();
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        if (d.type !== "center") {
            d.fx = null;
            d.fy = null;
        }
    }

    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1,
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }
});
