const colors = ["red", "green", "blue", "goldenrod"];
const expenseData = {
  January: {
    shopping: 2000,
    food: 3500,
    ent: 1200,
    med: 1100
  },
  February: {
    shopping: 1000,
    food: 4500,
    ent: 2300,
    med: 1050
  },
  March: {
    shopping: 1500,
    food: 2500,
    ent: 900,
    med: 100
  },
  April: {
    shopping: 3000,
    food: 3200,
    ent: 1000,
    med: 600
  },
  May: {
    shopping: 2000,
    food: 3050,
    ent: 800,
    med: 1600
  },
  June: {
    shopping: 2400,
    food: 2050,
    ent: 1800,
    med: 600
  }
};

function renderRows() {
  function getRow(key) {
    const expenses = Object.values(expenseData[key]);

    return `
   <tr>
    <td>${key}</td>
    ${expenses
        .map(expense => {
          return `<td>${expense}</td>`;
        })
        .join("\n")}
   </tr>
 `;
  }

  function getRows() {
    let rows = "";

    for (let key in expenseData) {
      rows += getRow(key);
    }

    return rows;
  }

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = getRows();
}

window.onload = () => {
  renderRows();
  renderBars();
};

function renderBars() {
  let i = 0;
  const chart = document.querySelector(".chart .dataArea");
  const headings = document.querySelector(".chart .headings");
  const maxExpense = getMaxExpense(expenseData);

  for (let bar in expenseData) {
    chart.innerHTML += `<div class="bar bar${++i}"/>`;
    headings.innerHTML += `<div class="heading heading{++i}">${bar.toUpperCase()}</div>`;
    renderBackground(i, expenseData[bar], maxExpense);
  }

  document.querySelectorAll(".heading").forEach(heading => heading.style.width = Math.ceil(100 / Object.keys(expenseData).length) + "%");
}

function renderBackground(i, bar, maxExpense) {
  let cumulativePercent = 0;
  const percents = Object.values(bar).map(val => {
    cumulativePercent += getPercent(val, maxExpense);
    return cumulativePercent;
  });

  const background = `linear-gradient(to top,
 ${getGradientColors(colors, percents)}
)`;

  document.querySelector(".bar" + i).style.background = background;
}

function getGradientColors(colors, percents) {
  let colorsString = `${colors[0]} 0%,
 ${colors[0]} ${percents[0]}%,`;

  for (let i = 1; i < colors.length; i++) {
    colorsString += `${colors[i]} ${percents[i - 1]}%,
 ${colors[i]} ${percents[i]}%,`;
  }

  colorsString += `transparent ${percents[3]}%`;
  return colorsString;
}

function getPercent(val, maxVal) {
  return Math.floor(100 * val / maxVal);
}

function getMaxExpense(expenseData) {
  return Math.max(...Object.values(expenseData).map(data => sumFromObj(data)));
}

function sumFromObj(obj) {
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
}