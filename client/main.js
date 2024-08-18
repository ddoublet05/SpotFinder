const parkingdiv = document.querySelectorAll(".parkinginfo");
const titel = document.querySelectorAll(".parkingtitel > h3");
const filterSelect = document.querySelector('#filter');

fetch('https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=13', {})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        for (let i = 0; i < data.total_count; i++) {
            titel[i].textContent = data.results[i].name;

            const p1 = document.createElement('p');
            const type1 = data.results[i].type;
            p1.textContent = `Type: ${type1}`;
            parkingdiv[i].appendChild(p1);

            const p2 = document.createElement('p');
            p2.className = 'p2';
            const cap1 = data.results[i].availablecapacity;
            p2.textContent = `Beschikbare plaatsen: ${cap1}`;
            parkingdiv[i].appendChild(p2);

            const p3 = document.createElement('p');
            const d1 = data.results[i].description;
            p3.textContent = `Beschrijving: ${d1}`;
            parkingdiv[i].appendChild(p3);
            console.log(titel[i]);
        }

        filterSelect.addEventListener('change', () => {
            for (let i = 0; i < parkingdiv.length; i++) {
                console.log('hello');
                if (filterSelect.value === 'Toon alles') {
                    parkingdiv[i].style.display = 'block';
                } else {
                    const parkingType = parkingdiv[i].querySelector('.p2');
                    if (parkingType.textContent.includes(filterSelect.value)) {
                        parkingdiv[i].style.display = 'block';
                    } else {
                        parkingdiv[i].style.display = 'none';
                    }
                }
            }
        });
    })

    .catch(error => {
        console.error('Fetch error:', error);
    });