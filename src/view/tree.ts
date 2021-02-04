import * as $ from 'jquery';
import * as d3 from 'd3';
import * as dagre from 'dagre';
import * as dagreD3 from 'dagre-d3';
import 'd3-zoom';
import { StoryEvents } from '../assets/StoryEvents';
import { Event } from '@src/model/Events';

export const createStoryTree = (choices: string[]) => {
    // Create a new directed graph
    var g = new dagre.graphlib.Graph();
    g.setGraph({}); // Set an object for the graph label
    g.setDefaultEdgeLabel(function () {
        return {};
    }); // Default to assigning a new object as a label for each new edge.

    // Add nodes to the graph
    StoryEvents.forEach(function (i: Event) {
        g.setNode(i.id, { label: i.name, width: 20 + i.name.length * 7 });
    });
    g.setNode('END1', { label: 'Lockdown ended', width: 120 });
    g.setNode('END2', { label: 'Flip-flopped', width: 120 });
    g.setNode('END3', { label: 'Some concessions', width: 120 });
    g.setNode('END4', { label: 'Lockdown remained', width: 120 });

    g.nodes().forEach(function (v) {
        var node = g.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
        node.height = 50;
        node.class = 'tree-node';
    });

    choices.forEach((it) => {
        g.node(it).class = 'tree-node-complete';
    });

    // Add edges to the graph.
    g.setEdge('lockdown01vaccine', 'open01business', { label: '<p class="tree-edge-label">Lifted lockdown <span class="badge badge-info">40%</span></p>', labelType: "html", lineInterpolate: "basis"});
    g.setEdge('lockdown01vaccine', 'lockdown02fatigue', { label: '<p class="tree-edge-label">Remained <span class="badge badge-info"> 60%</span></p>', labelType: "html", lineInterpolate: "basis" });
    g.setEdge('open01business', 'open02casesPeak', { label: '<p class="tree-edge-label">Spin <span class="badge badge-info"> 20%' , labelType: "html", lineInterpolate: "basis"});
    g.setEdge('open01business', 'open02casesPeak', { label: '<p class="tree-edge-label">Reconsidered <span class="badge badge-info"> 80%</span></p>', labelType: "html", lineInterpolate: "basis" });
    g.setEdge('lockdown02fatigue', 'open02casesPeak', { label: '<p class="tree-edge-label">Lifted <span class="badge badge-info"> 30%</span></p>' , labelType: "html", lineInterpolate: "basis"});
    g.setEdge('lockdown02fatigue', 'lockdown03wellbeing', { label: '<p class="tree-edge-label">Remained <span class="badge badge-info"> 70%</span></p>' , labelType: "html", lineInterpolate: "basis"});
    g.setEdge('open02casesPeak', 'END1', { label: '<p class="tree-edge-label">Remained <span class="badge badge-info"> 60%</span></p>' , labelType: "html", lineInterpolate: "basis"});
    g.setEdge('open02casesPeak', 'END2', { label: '<p class="tree-edge-label">Lifted <span class="badge badge-info"> 40%</span></p>', labelType: "html", lineInterpolate: "basis" });
    g.setEdge('lockdown03wellbeing', 'END3', { label: '<p class="tree-edge-label">Concessions <span class="badge badge-info"> 20%</span></p>' , labelType: "html", lineInterpolate: "basis"});
    g.setEdge('lockdown03wellbeing', 'END4', { label: '<p class="tree-edge-label">Remained <span class="badge badge-info"> 80%</span></p>', labelType: "html", lineInterpolate: "basis" });

    g.edges().forEach(function (v) {
        var edge = g.edge(v);
        edge.style = 'stroke: black; fill: none;';
    });

    //g.graph().rankDir = 'LR'; Layout left ot right instead of top to down

    // Render graph
    var svg = d3
        .select('#tree-div') // Select SVG to draw to
        .append('svg')
        .attr('height', $('#tree-div').height())
        .attr('width', $('#tree-div').width())
        .attr('preserveAspectRatio', 'none')
        .call(
            d3
                .zoom()
                .scaleExtent([0.25, 4])
                .on('zoom', function (event) {
                    inner.attr('transform', event.transform);
                })
        );
    var render = dagreD3.render(); // Render graph in SVG
    svg.call(render, g);
    const inner = svg.select('g'); // Select graph element on SVG for zoom
};
