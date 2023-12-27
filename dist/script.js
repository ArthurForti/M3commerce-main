  let items = [];
    let filteredItems = [];
    let renderCount = determineRenderCount();

    function determineRenderCount() {
      return window.innerWidth <= 450 ? 4 : 9;
    }

    window.addEventListener('resize', function() {
  renderCount = determineRenderCount();
  filterAndRender();
});

    function filterAndRender() {
      filterByColors();
      filterBySizes();
      filterByPrices();
      applyOrderFilter();
      renderItems(filteredItems.slice(0, renderCount));
    }

    function filterByColors() {
      const selectedColors = Array.from(document.querySelectorAll('.colorFilters input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

      if (selectedColors.length === 0) {
        filteredItems = items.slice();
      } else {
        filteredItems = items.filter((item) => selectedColors.includes(item.color));
      }
    }

    function filterBySizes() {
      const selectedSizes = Array.from(document.querySelectorAll('.filters__sizes__content input[type="checkbox"]:checked')).map(checkbox => checkbox.dataset.size);

      if (selectedSizes.length === 0) {
        return;
      }

      filteredItems = filteredItems.filter((item) => item.size.some(size => selectedSizes.includes(size)));
    }

    function filterByPrices() {
      const selectedPrices = Array.from(document.querySelectorAll('.priceFilters input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

      if (selectedPrices.length === 0) {
        return;
      }

      const priceRanges = {
        "0a50": [0, 50],
        "51a150": [51, 150],
        "151a300": [151, 300],
        "301a500": [301, 500],
        "apartirde500": [500, Infinity],
      };

      filteredItems = filteredItems.filter((item) => {
        const itemPrice = parseFloat(String(item.price).replace(/[^\d.-]/g, ''));
        return selectedPrices.some(range => itemPrice >= priceRanges[range][0] && itemPrice <= priceRanges[range][1]);
      });
    }

    function applyOrderFilter() {
      const selectedOption = document.getElementById("ordenarPor").value;

      switch (selectedOption) {
        case "maisRecentes":
          filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "menorPreco":
          filteredItems.sort((a, b) => a.price - b.price);
          break;
        case "maiorPreco":
          filteredItems.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    window.onload = function () {
      fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
          items = data;
          filterAndRender();
        });
    };


  

  document.querySelectorAll('.colorFilters input[type="checkbox"], .priceFilters input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      filterAndRender();
    });
  });

  document.querySelectorAll('.filters__sizes__content input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      filterAndRender();
    });
  });

  const ordenarPorSelect = document.getElementById("ordenarPor");
  const verMaisBtn = document.getElementById("verMaisBtn");

  ordenarPorSelect.addEventListener("change", function () {
    filterAndRender();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const expandFilterSpan = document.querySelector(".filters__colors #expandFilter");
    const hiddenFiltersDiv = document.querySelector(".filters__colors #hiddenFilters");

    expandFilterSpan.addEventListener("click", function () {
        hiddenFiltersDiv.classList.toggle("hidden");
        filterAndRender(); // Chame a função filterAndRender após abrir ou fechar as opções de filtro
    });
});

  


  function applyOrderFilter() {
    const selectedOption = ordenarPorSelect.value;

    switch (selectedOption) {
      case "maisRecentes":
        filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "menorPreco":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "maiorPreco":
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  function renderItems(itemsToRender) {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = "";

    itemsToRender.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h2 class="product-name">${item.name}</h2>
        <p class="price">${item.price}</p>
        <p class="installment">Até ${item.parcelamento.join("x de $")}</p>
        <button class="purchaseBtn">Comprar</button>
      `;

      itemList.appendChild(itemDiv);
    });

    if (filteredItems.length > renderCount) {
      verMaisBtn.style.display = "block";
      verMaisBtn.addEventListener("click", function () {
        renderCount += 9;
        filterAndRender();
      });
    } else {
      verMaisBtn.style.display = "none";
    }
  }

  document.querySelectorAll('.filters__sizes__content__option').forEach(option => {
    option.addEventListener('click', function (event) {
      if (event.target.type !== 'checkbox') {
        option.classList.toggle('checkboxSelected');
        filterAndRender();
      }
    });
  });

  // modal

  function openModalFilter() {
  var modal = document.getElementById('modalFilter');
  var modalTitle = document.getElementById('modal-title');

  modal.style.display = 'block';
  modalTitle.textContent = 'Filtrar';
}

function openModalOrder() {
  var modal = document.getElementById('modalOrder');
  var modalTitle = document.getElementById('modal-title');

  modal.style.display = 'block';
  modalTitle.textContent = 'Ordenar';
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

window.onclick = function(event) {
  var modalOrder = document.getElementById('modalOrder');
  var modalFilter = document.getElementById('modalFilter');

  if (event.target === modalOrder) {
    modalOrder.style.display = 'none';
  }

  if (event.target === modalFilter) {
    modalFilter.style.display = 'none';
  }
};

function openModalFilter() {
        document.getElementById('modalFilter').style.display = 'block';
    }

    function openModalOrder() {
        document.getElementById('modalOrder').style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    function toggleAccordion(accordionId) {
        var accordionContent = document.getElementById(accordionId);
        accordionContent.classList.toggle('active');
    }

    function toggleAccordion(accordionId) {
        var accordionContent = document.getElementById(accordionId);
        accordionContent.classList.toggle('active');
    }

    function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

document.getElementById('filtrarBtn').addEventListener('click', function() {
  closeModal('modalFilter');
});

document.getElementById('limparBtn').addEventListener('click', function() {
  // Desmarcar todas as caixas de seleção de cores
  document.querySelectorAll('.colorFilters input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  // Desmarcar todas as caixas de seleção de tamanhos
  document.querySelectorAll('.filters__sizes__content input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  // Desmarcar todas as caixas de seleção de faixa de preço
  document.querySelectorAll('.priceFilters input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  // Fechar o modal de filtro (se estiver aberto)
  closeModal('modalFilter');

  // Atualizar e renderizar os itens novamente sem filtros
  filterAndRender();
});


    

    
    
 

    

