let table;

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  const data = obj;

  // Initialize DataTable
  const columns = [
    { title: "Asset Tag", data: "fieldData.AssetTag" },
    { title: "Asset Type", data: "fieldData.assettype_name" },
    { title: "Client Name", data: "fieldData.client_name" },
    { title: "Inventory Number", data: "fieldData.inventory_number" },
    { title: "Site", data: "fieldData.site_name" },
    { title: "Username", data: "fieldData.username" }
  ];

  
  // Initialize DataTable
  table = $("#table").DataTable({
    columns,
    data,
    paging: false,
    colReorder: true,
    dom: "lrti",
    fixedHeader: {
      header: true,
      footer: true,
    },
    scrollCollapse: true,
    scrollX: true,
    scrollY: "80vh",
  });

  // Custom search input event listener
  document
    .getElementById("custom-search")
    .addEventListener("input", function () {
      table.search(this.value).draw();
    });

  // Filtering and highlighting logic
  const headerItems = document.querySelectorAll(".header-item");

  function applyFilter(filterFunction) {
    table.clear();
    table.rows.add(filterFunction ? data.filter(filterFunction) : data).draw();
  }

  function setActive(item) {
    headerItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  }


  $('#table tbody').on('click', 'tr', function (e) {
    if (!$(e.target).is('button, a, input')) {
      const rowData = table.row(this).data();
      const build = {};
      build.data = rowData;
      build.mode = 'card';
      const dataExport = JSON.stringify(build);
      FileMaker.PerformScriptWithOption("Manage: Client API", dataExport, "0");
    }
  });
  

  };
  
