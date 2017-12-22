import * as d3 from 'd3';

export function createNodes(rawData) {
  const maxAmount = d3.max(rawData, d => d.numMentions);

  // Sizes bubbles based on area.
  // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
    .exponent(0.5)
    .range([2, 85])
    .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  let id = 0;
  const myNodes = rawData.map(({ tag, numMentions, type }) => {
    id++;
    let newTag = tag;
    if (tag.length > 10) {
      newTag = `${tag.substring(0, 9)}...`;
    }
    return {
      id: id.toString(),
      radius: radiusScale(numMentions),
      numMentions,
      tag: newTag,
      fullName: tag,
      type,
      x: Math.random() * 900,
      y: Math.random() * 600,
    };
  });

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
}

export const fillColor = d3.scaleOrdinal().domain(['low', 'medium', 'high']).range(['#d84b2a', '#beccae', '#7aa25c']);
