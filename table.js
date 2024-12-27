

async function render_table (table_name) {
    let tableData=[]
    let tableHeaders=[]
   
    const csvUrl = `data/${table_name}.csv`;
    const data = await fetch(csvUrl)
        .then(response => response.text())
        .then(str => Papa.parse(str)["data"])
        .catch(err => console.log(err));

    
    tableHeaders=structuredClone([data[0]])
    data.shift()
    tableData=structuredClone(data)

    DataTable.defaults.layout = {
        topStart: null,
        topEnd: null,
        bottomStart: null,
        bottomEnd: null
    };
    let table = new DataTable('#ginTable',{
        data: tableData,
        responsive: true,
        layout:{
            top: ['pageLength', 'search', 'buttons'],
            bottom: ['info', 'paging']
        },
        buttons:["csv"]
    });
}
