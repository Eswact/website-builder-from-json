function createDatatableDom(item) {
    let tfoot = '';
    if (item.tableOptions.footerCallback) {
        let totalColumns = item.columns.length;
        let footerLayout = item.options.footerColumns || [];

        tfoot += '<tfoot><tr>';
        for (let i = 0; i < totalColumns; i++) {
            let footerCol = footerLayout.find(col => col.column === i);
            if (footerCol) {
                tfoot += `<td colspan="${footerCol.colspan}"></td>`;
                i += footerCol.colspan - 1;
            }
            else {
                tfoot += `<td></td>`;
            }
        }
        tfoot += '</tr></tfoot>';
    }
    return `
      <div class="${item.containerClass}">
        <table id="${item.id}" class="display stripe hover" style="width:100%">${tfoot}</table>
      </div>`;
}
function generateDatatableScript(item) {
    return `
  var ${item.name};
  
  let ${item.id}Columns = [
    ${item.columns.map(col => `{
      order: ${col.order},
      title: "${col.title}",
      data: "${col.name}",
      name: "${col.name}",
      checkable: ${col.checkable},
      orderable: ${col.orderable},
      render: ${col.render ? col.render.toString() : 'null'},
      className: "${col.className || ''}"
    }`).join(',')}
  ];
  
  ${(item.filters && item.filters.data && item.filters.data.length > 0)
            ? `let ${item.id}Filters = { data: [${item.filters.data.map(filter => JSON.stringify(filter)).join(',')}] }`
            : ''}
  ${(item.filters && item.filters.beforeApply)
            ? `${item.id}Filters.beforeApply = ${item.filters.beforeApply.toString()};`
            : ''}
  ${(item.filters && item.filters.beforeReset)
            ? `${item.id}Filters.beforeReset = ${item.filters.beforeReset.toString()};`
            : ''}
  
  
  let ${item.id}Ajax = {
    url: "${item.ajax.url}",
    type: "${item.ajax.method || 'GET'}",
    dataSrc: ${item.ajax.dataSrc || "''"},
    data: function(d) {
      ${item.ajax.data && item.ajax.data.length > 0
            ? `${item.ajax.data.map(x => `d.${x.name} = ${x.value}`).join(';\n')}`
            : ''
        }
      ${(item.filters && item.filters.data && item.filters.data.length > 0)
            ? `datatableService.updateTableAjaxData("${item.name}", d, ${item.id}Filters.data);`
            : ''}
      ${(item.options && item.options.multiRowSelect && item.options.showSelectedRows)
            ? `datatableService.showSelectedRowsAjaxData("${item.name}", d, ${JSON.stringify(item.options.showSelectedRows)});`
            : ''}
    }
  };
  
  let ${item.id}TableOptions = {
    ${Object.entries(item.tableOptions).map(([key, value]) =>
                `${key}: ${typeof value === 'function' ? value.toString() : JSON.stringify(value)}`)
            .join(',\n')}
  };
  ${item.id}TableOptions.serverSide = ${item.serverSide};
  ${item.id}TableOptions.processing = ${item.serverSide};
  
  ${item.options && item.options["rightClick"]
            ? `let ${item.id}RightClick = [${item.options["rightClick"].map(x => (`{'name': ${JSON.stringify(x.name)}, 'click': ${x.click}}`)).join(',')}];`
            : `let ${item.id}RightClick = false`}
  ${item.options && item.options["keyFocus"]
            ? `let ${item.id}KeyFocusFunction = ${item.options["keyFocus"]};`
            : `let ${item.id}KeyFocusFunction = false`}
  ${item.options && item.options["key"]
            ? `let ${item.id}KeyFunction = ${item.options["key"]};`
            : `let ${item.id}KeyFunction = false`}
  ${(item.options)
            ? `let ${item.id}Options = ${JSON.stringify(item.options)}`
            : `let ${item.id}Options = {}`}
  
  ${item.id}Options["rightClick"] = ${item.id}RightClick;
  ${item.id}Options['keyFocus'] = ${item.id}KeyFocusFunction;
  ${item.id}Options['key'] = ${item.id}KeyFunction;
  
  ${item.options && item.options.customButtons && item.options.customButtons.length > 0
            ? item.options.customButtons.map((element, index) => {
                return `${item.id}Options.customButtons[${index}].onclick = ${element.onclick.toString()};`;
            }).join('\n')
            : ''
        }
  
  ${(item.operations)
            ? `let ${item.id}Operations = ${JSON.stringify(item.operations)}`
            : `let ${item.id}Operations = {}`}
  `;
}

module.exports = {
    createDatatableDom,
    generateDatatableScript
};