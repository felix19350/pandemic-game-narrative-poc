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
    g.setNode('START', { label: 'START', width: 100 });
    StoryEvents.forEach(function (i: Event) {
        g.setNode(i.id, { label: i.name, width: 20 + i.name.length * 7 });
    });
    g.setNode('END1', { label: 'Ending: Lockdown ended permanently', width: 300 });
    g.setNode('END2', { label: 'Ending: Lockdown lifted but then re-enforced', width: 350 });
    g.setNode('END3', { label: 'Ending: Lockdown remained in effect but concessions were made', width: 500 });
    g.setNode('END4', { label: 'Ending: Lockdown remained in effect throughout', width: 450 });

    g.nodes().forEach(function (v) {
        var node = g.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
        node.height = 50;
        node.style = 'fill: white;';
    });

    choices.forEach((it) => {
        g.node(it).style = 'fill: dodgerblue';
    });

    // Add edges to the graph.
    g.setEdge('START', 'lockdown01vaccine');
    g.setEdge('lockdown01vaccine', 'open01business', { label: 'lockdown01vaccine_lift' });
    g.setEdge('lockdown01vaccine', 'lockdown02fatigue', { label: 'lockdown01vaccine_continue' });
    g.setEdge('open01business', 'open02casesPeak', { label: 'open01business_spin' });
    g.setEdge('open01business', 'open02casesPeak', { label: 'open01business_reconsider' });
    g.setEdge('lockdown02fatigue', 'open02casesPeak', { label: 'lockdown02fatigue_lift' });
    g.setEdge('lockdown02fatigue', 'lockdown03wellbeing', { label: 'lockdown02fatigue_continue' });
    g.setEdge('open02casesPeak', 'END1', { label: 'open02casesPeak_continue' });
    g.setEdge('open02casesPeak', 'END2', { label: 'open02casesPeak_lift' });
    g.setEdge('lockdown03wellbeing', 'END3', { label: 'lockdown03wellbeing_relax' });
    g.setEdge('lockdown03wellbeing', 'END4', { label: 'lockdown03wellbeing_continue' });

    g.edges().forEach(function (v) {
        var edge = g.edge(v);
        edge.style = 'stroke: black; fill: none;';
    });

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
