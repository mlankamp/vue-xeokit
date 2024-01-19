import type { ITreeViewRenderService } from '@xeokit/xeokit-sdk/types/plugins/TreeViewPlugin/renderService';

const renderService: ITreeViewRenderService = {
  createRootNode: () => {
    return document.createElement('ul');
  },
  createNodeElement: (node, expandHandler, checkHandler, contextmenuHandler, titleClickHandler) => {
    const nodeElement = document.createElement('li');
    nodeElement.id = node.nodeId;

    if (node.xrayed) {
      nodeElement.classList.add('xrayed-node');
    }

    const wrapperDiv = document.createElement('div');
    nodeElement.appendChild(wrapperDiv);

    if (node.children.length > 0) {
      const switchElement = document.createElement('button');
      switchElement.id = `sw-${node.nodeId}`;
      switchElement.classList.add('v-icon', 'notranslate', 'theme--light', 'v-icon--size-default', 'v-icon--clickable', 'mdi', 'mdi-menu-right');
      if (expandHandler) switchElement.addEventListener('click', expandHandler);
      wrapperDiv.appendChild(switchElement);
    } else {
      const divElement = document.createElement('div');
      divElement.classList.add('v-treeview-node__level');
      wrapperDiv.appendChild(divElement);
    }

    const checkbox = document.createElement('input');
    checkbox.id = `cb-${node.nodeId}`;
    checkbox.type = 'checkbox';
    checkbox.checked = node.checked;
    checkbox.style.pointerEvents = 'all';
    if (checkHandler) checkbox.addEventListener('change', checkHandler);
    wrapperDiv.appendChild(checkbox);

    // const iconType = ifcIcons[node.type];
    // if (iconType) {
    //   const icon = document.createElement('i');
    //   icon.classList.add('v-ifcicon', 'mdi', iconType);
    //   icon.title = node.type;
    //   wrapperDiv.appendChild(icon);
    // } else {
    //   console.warn(`No icon for type ${node.type}`);
    // }

    const span = document.createElement('span');
    span.textContent = node.title;
    wrapperDiv.appendChild(span);

    if (contextmenuHandler) {
      span.oncontextmenu = contextmenuHandler;
    }

    if (titleClickHandler) {
      span.onclick = titleClickHandler;
    }

    return nodeElement;
  },
  createDisabledNodeElement: (rootName) => {
    const li = document.createElement('li');

    const switchElement = document.createElement('a');
    switchElement.href = '#';
    switchElement.textContent = '!';
    switchElement.classList.add('warn');
    switchElement.classList.add('warning');
    li.appendChild(switchElement);

    const span = document.createElement('span');
    span.textContent = rootName;
    li.appendChild(span);

    return li;
  },
  addChildren: (element, nodes) => {
    const ul = document.createElement('ul');
    nodes.forEach((nodeElement) => {
      ul.appendChild(nodeElement);
    });

    element.parentElement?.parentElement?.appendChild(ul);
  },
  expand: (element, expandHandler, collapseHandler) => {
    element.classList.remove('mdi-menu-right');
    element.classList.add('mdi-menu-down');
    element.removeEventListener('click', expandHandler);
    element.addEventListener('click', collapseHandler);
  },
  collapse: (element, expandHandler, collapseHandler) => {
    if (!element) {
      return;
    }
    const parent = element.parentElement?.parentElement;
    if (!parent) {
      return;
    }
    const ul = parent.querySelector('ul');
    if (!ul) {
      return;
    }
    parent.removeChild(ul);
    element.classList.remove('mdi-menu-down');
    element.classList.add('mdi-menu-right');
    element.removeEventListener('click', collapseHandler);
    element.addEventListener('click', expandHandler);
  },
  isExpanded: (element) => {
    const parentElement = element.parentElement?.parentElement;
    return parentElement?.getElementsByTagName('li')[0] !== undefined;
  },
  getId: (element) => {
    const parentElement = element.parentElement?.parentElement;
    return parentElement?.id;
  },
  getIdFromCheckbox: (element) => {
    return element.id.replace('cb-', '');
  },
  getSwitchElement: (nodeId) => {
    return document.getElementById(`sw-${nodeId}`);
  },
  isChecked: (element: HTMLInputElement) => {
    return element.checked;
  },
  setCheckbox: (nodeId, checked) => {
    const checkbox = document.getElementById(`cb-${nodeId}`) as HTMLInputElement;
    if (checkbox) {
      if (checked !== checkbox.checked) {
        checkbox.checked = checked;
      }
    }
  },
  setXRayed: () => {
    // not implemented
  },
  setHighlighted: () => {
    // not implemented
  }
};

export default renderService;
