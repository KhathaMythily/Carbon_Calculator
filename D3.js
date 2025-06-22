
function drawChart(data) {
  const width = 400, height = 400;
  const colors = ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6", "#f1c40f"];
  const labels = ["Electricity", "Transport", "Diet", "Water Heating", "Water Use"];

  d3.select("#chart").selectAll("*").remove();
  d3.selectAll(".tooltip").remove();

  const svg = d3.select("#chart")
                .attr("width", width + 180)
                .attr("height", height);

  const group = svg.append("g")
                   .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie();
  const arc = d3.arc().innerRadius(90).outerRadius(150);

  const tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip");

  const paths = group.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("fill", (d, i) => colors[i])
    .attr("d", arc)
    .each(function(d) { this._current = d; })
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`${labels[d.index]}: ${data[d.index].toFixed(2)} kg CO₂`)
             .style("left", (event.pageX + 10) + "px")
             .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  paths.transition()
    .duration(800)
    .attrTween("d", function(d) {
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(1);
      return t => arc(interpolate(t));
    });

  // Add visible legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width + 10}, 20)`);

  labels.forEach((label, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 22})`);

    legendRow.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", colors[i]);

    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 11)
      .attr("fill", "#fff")
      .style("font-size", "13px")
      .text(`${label}: ${data[i].toFixed(2)} kg CO₂`);
  });
}
