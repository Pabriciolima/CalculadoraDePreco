// Função para alternar o modo noturno
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    // Altera o ícone do botão
    const darkModeIcon = document.getElementById("darkModeIcon");
    if (body.classList.contains("dark-mode")) {
      darkModeIcon.textContent = "☀️"; // Ícone para modo claro
    } else {
      darkModeIcon.textContent = "🌙"; // Ícone para modo noturno
    }
  }
  
  // Adiciona o evento de clique ao botão de modo noturno
  document.addEventListener("DOMContentLoaded", () => {
    const darkModeButton = document.getElementById("darkModeToggle");
    darkModeButton.addEventListener("click", toggleDarkMode);
  
    // Event listeners para cálculo automático
    const inputs = document.querySelectorAll("#priceCalculator input, #priceCalculator select");
    inputs.forEach(input => {
      input.addEventListener("input", calculatePrice);
    });
  
    const pisCofinsRadios = document.querySelectorAll('input[name="pisCofins"]');
    pisCofinsRadios.forEach(radio => {
      radio.addEventListener("change", calculatePrice);
    });
  
    // Chama a função de cálculo inicialmente para exibir o valor padrão
    calculatePrice();
  });
  
  // Dados dos estados
  const stateData = {
    AC: { icms: 12, iva: 84.35 },
    AL: { icms: 12, iva: 84.35 },
    AM: { icms: 12, iva: 84.35 },
    AP: { icms: 12, iva: 84.35 },
    BA: { icms: 12, iva: 84.35 },
    CE: { icms: 12, iva: 84.35 },
    DF: { icms: 12, iva: 84.35 },
    ES: { icms: 12, iva: 84.35 },
    GO: { icms: 12, iva: 84.35 },
    MA: { icms: 0, iva: 0 },
    MT: { icms: 12, iva: 84.35 },
    MS: { icms: 12, iva: 84.35 },
    MG: { icms: 7, iva: 94.82 },
    PA: { icms: 12, iva: 84.35 },
    PB: { icms: 12, iva: 84.35 },
    PR: { icms: 7, iva: 94.82 },
    PE: { icms: 12, iva: 84.35 },
    PI: { icms: 12, iva: 84.35 },
    RN: { icms: 12, iva: 84.35 },
    RS: { icms: 7, iva: 94.82 },
    RJ: { icms: 7, iva: 94.82 },
    RO: { icms: 12, iva: 84.35 },
    RR: { icms: 12, iva: 84.35 },
    SC: { icms: 7, iva: 94.82 },
    SP: { icms: 7, iva: 94.82 },
    SE: { icms: 12, iva: 84.35 },
    TO: { icms: 12, iva: 84.35 },
  };
  
  // Função principal de cálculo
  function calculatePrice() {
    console.log("Função calculatePrice chamada!");
  
    // Inputs
    const costPrice = parseFloat(document.getElementById("costPrice").value) || 0;
    const ipi = parseFloat(document.getElementById("ipi").value) || 0;
    const freight = parseFloat(document.getElementById("freight").value) || 0;
    const pisCofins = document.querySelector('input[name="pisCofins"]:checked').value === "yes";
    const margin = parseFloat(document.getElementById("margin").value) || 0;
  
    // Estado selecionado
    const state = document.getElementById("state").value;
    const stateInfo = stateData[state] || { iva: 0 }; // Garante que haja um valor padrão
  
    // Step 1: Cálculo do IPI
    const ipiValue = costPrice * (ipi / 100);
  
    // Step 2: Cálculo da Substituição Tributária (ST)
    const st = costPrice * (stateInfo.iva / 100);
  
    // Step 3: Valor parcial (custo + IPI + ST + frete)
    const partialValue = costPrice + ipiValue + st + freight;
  
    // Step 4: Cálculo do PIS/COFINS
    const pisCofinsValue = pisCofins ? partialValue * 0.0925 : 0;
  
    // Step 5: Total antes do ajuste
    const totalBeforeAdjustment = partialValue + pisCofinsValue;
  
    // Step 6: Valor adicional (2%)
    const additionalValue = totalBeforeAdjustment * 0.02;
  
    // Step 7: Cálculo final com margem
    const finalValue =
      totalBeforeAdjustment / (1 - margin / 100) + 2 * additionalValue;
  
    console.log({ finalValue });
  
    // Formatando o valor final como moeda brasileira (R$)
    const formattedFinalValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(finalValue);
  
    // Exibir o resultado
    document.getElementById("finalPrice").textContent = formattedFinalValue;
  }