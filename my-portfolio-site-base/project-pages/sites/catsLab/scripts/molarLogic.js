const screenHeight = window.innerHeight;
// const mainElement = document.querySelector('.main');
// mainElement.style.height = `${screenHeight - 180}px`;

const button = document.getElementById('sendButton');
const input = document.getElementById('userInput');

let periodicTable = {};

async function loadPeriodicTable() {
    try {
        const response = await fetch('../files/filtered_data_r.csv'); // Загрузка CSV файла
        const csvText = await response.text(); // Преобразование CSV в текст
        periodicTable = csvToObject(csvText); // Преобразование CSV в объекты
        console.log(periodicTable);
    } catch (error) {
        console.error('Ошибка загрузки файла CSV:', error);
    }
}

function csvToObject(csvText) {
    const rows = csvText.split('\n');
    const headers = rows[0].split(',');

    const elementObject = {};

    rows.slice(1).forEach(row => {
        if (!row.trim()) return;
        const values = row.split(',');
        const symbol = values[0].trim();
        const atomicMass = parseFloat(values[1].trim());
        const name = values[2]?.trim();
        if (symbol && !isNaN(atomicMass)) {
            elementObject[symbol] = { 
                atomicMass: atomicMass, 
                name: name 
            };
        }
    });

    return elementObject;
}
  
function convertToPeriodicTable(elements) {
    elements.forEach(element => {
      const mass = element?.atomicMass?.replace(/[()]/g, '') ?? 'Неизвестно';
      console.log(`Элемент: ${element.name}, Масса: ${mass}`);
    });
}

function extractElements(formula) {
     // Шаблон для поиска элементов и их коэффициентов
    const elementPattern = /([A-Z][a-z]?)(\d*)/g;
    const multiplierPattern = /\(([^)]+)\)(\d+)/g;

    // Разворачиваем скобки с учётом множителей
    while (true) {
        const match = multiplierPattern.exec(formula);
        if (!match) break;
        
        const [fullMatch, insideBrackets, multiplier] = match;
        const expandedPart = insideBrackets.replace(elementPattern, (element, name, count) => 
            name + (count ? count * multiplier : multiplier)
        );
        formula = formula.replace(fullMatch, expandedPart);
    }

    const elementCount = {};
    formula.replace(elementPattern, (match, element, count) => {
        const quantity = count ? parseInt(count) : 1;
        elementCount[element] = (elementCount[element] || 0) + quantity;
    });

    return elementCount;
}

function calculateMolarMass(elementCount) {
    let result = { totalMass: 0 };

    let totalMass = 0;
  
    // debugger
    for (const element in elementCount) {
        const count = elementCount[element];
        const elementMass = periodicTable[element].atomicMass;

        if (elementMass) {
            const totalElementMass = elementMass * count;
            result[element] = { 
                totalElementMass : totalElementMass,
                name: periodicTable[element].name,
                atomCount: count
            }
            result.totalMass += totalElementMass;
        } else {
            console.warn(`Элемент ${element} не найден!`); 
        }
    }
  
    return result;
}

function generateElementList(result) {
    const resultSection = document.getElementById('result_section');
    resultSection.innerHTML = '';

    const parentDiv = document.createElement('div');
    parentDiv.className = "continer_block";
    resultSection.appendChild(parentDiv);

    const sectionTextDiv = document.createElement('div');
    sectionTextDiv.className = "section_text";
    parentDiv.appendChild(sectionTextDiv);

    const p1 = document.createElement('p');
    p1.className = "section_text t1";
    p1.textContent = "Общая молярная масса";
    sectionTextDiv.appendChild(p1);

    const p2 = document.createElement('p');
    p2.className = "section_text t2";
    p2.textContent = `${result.totalMass.toFixed(3)} g/mol`;
    sectionTextDiv.appendChild(p2);

    const sectionContentTextDiv = document.createElement('div');
    sectionContentTextDiv.className = "section_text t2 t3";
    parentDiv.appendChild(sectionContentTextDiv);

    const p3 = document.createElement('p');
    p3.textContent = "Информация о каждом элементе";
    sectionContentTextDiv.appendChild(p3);

    for (const element in result) {
        if (element !== 'totalMass') {
            const elementData = result[element];

            const ul1 = document.createElement('ul');
            ul1.style.marginBlockStart = "0";
            ul1.style.marginBlockEnd = "0";

            const li1 = document.createElement('li');
            li1.textContent = `${element}`;
            ul1.appendChild(li1);

            const ul2 = document.createElement('ul');
            ul2.style.listStyle = "disc";

            const li11 = document.createElement('li');
            li11.textContent = `Название: ${elementData.name}`;
            ul2.appendChild(li11);

            const li12 = document.createElement('li');
            li12.textContent = `Масса в соединении: ${elementData.totalElementMass}`;
            ul2.appendChild(li12);

            const li13 = document.createElement('li');
            li13.textContent = `Количество атомов: ${elementData.atomCount}`;
            ul2.appendChild(li13);

            const li14 = document.createElement('li');
            li14.textContent = `Процент массы: ${(elementData.totalElementMass / result.totalMass * 100).toFixed(3)}%`;
            ul2.appendChild(li14);

            li1.appendChild(ul2);

            sectionContentTextDiv.appendChild(ul1);
        }
    }
}

button.addEventListener('click', () => {
	const value = input.value;
    const elementCount = extractElements(value);
    const result = calculateMolarMass(elementCount);
    console.log(result);
    generateElementList(result);
});

input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		const value = input.value;
        event.preventDefault();
    	const elementCount = extractElements(value);
        const result = calculateMolarMass(elementCount);
        console.log(result);
        generateElementList(result);
	}
});

loadPeriodicTable();