const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderList = (container, template, count) => {
  for (let i = 0; i < count; i++) {
    render(container, template);
  }
};

export {render, renderList};
