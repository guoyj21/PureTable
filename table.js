var PureTable = (function() {
  'use strict';

  var requiredColumns = [
    'first_name',
    'last_name',
    'company_name',
    'city'
  ];

  var containerID = 'table-container';


  function process(data) {
    var headers = [];
    requiredColumns.forEach(function(column) {
      headers.push({
        value: column
      });
    });

    var rows = [];
    data.forEach(function(d) {
      var fields = [];
      requiredColumns.forEach(function(column) {
        fields.push({
          value: d[column]
        });
      });

      rows.push({
        columns: fields
      });
    });

    d3.text('table.mustache', function(template) {
      var html = Mustache.render(template, {
        rows: rows,
        headers: headers
      });

      d3.select('#' + containerID).html(html);
    });
  }

  function row(d, i) {
    if (requiredColumns) {
      var _d = {};
      requiredColumns.forEach(function(column) {
        _d[column] = d[column];
      });
      return _d;
    }

    return d
  }

  function load(dataURL) {
    d3.csv(dataURL, row, process);
  }

  return {
    load: load
  }

})();


PureTable.load('us-500.csv').render('table-container');
