
let tableData=[]
let tableHeaders=[]
document.addEventListener("DOMContentLoaded", async function(event) { 
    const csvUrl = 'data/ginlist.csv';
    const data = await fetch(csvUrl)
        .then(response => response.text())
        .then(str => Papa.parse(str)["data"])
        .catch(err => console.log(err));

    
    tableHeaders=structuredClone([data[0]])
    data.shift()
    tableData=structuredClone(data)
    
    createTable(tableData)
});

function createTable(data){
    
    const thead= document.querySelector("#ginTable thead")
    thead.innerHTML = '';
    appendElementToTable("head", thead, tableHeaders)


    const tbody= document.querySelector("#ginTable tbody")
    tbody.innerHTML = '';
    appendElementToTable("body",tbody,data)
}

function filterTable()  {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;

    // Filter data by search input and category
    let filteredData = tableData.filter(row => {
        const nameMatches = row[0].toLowerCase().includes(searchInput);
        const categoryMatches = selectedCategory === '' || row[1] === selectedCategory;
        return nameMatches && categoryMatches;
    });
    createTable(filteredData)
}

function appendElementToTable(type,tableElement, data){
    data.forEach( rowData =>{
        const tr = document.createElement("tr")

        rowData.forEach(cellData => {
            const cell = type === "body" ? document.createElement("td") : document.createElement("th")
            cell.textContent = cellData
            tr.appendChild(cell)
        })
        tableElement.appendChild(tr)
    })
}
