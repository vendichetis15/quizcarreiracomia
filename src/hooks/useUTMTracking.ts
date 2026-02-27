import { useEffect } from "react";

export const useUTMTracking = () => {
  useEffect(() => {
    // 1. Captura os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const params = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "src",
    ];

    // 2. Salva na memória do navegador (Session Storage)
    params.forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });

    // 3. Função para injetar os parâmetros em todos os links da Kiwify
    const injectParameters = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        if (link.href.includes("kiwify.com.br")) {
          try {
            const currentUrl = new URL(link.href);

            params.forEach((param) => {
              const storedValue = sessionStorage.getItem(param);
              if (storedValue) {
                currentUrl.searchParams.set(param, storedValue);
              }
            });

            link.href = currentUrl.toString();
          } catch (e) {
            console.warn("Erro ao processar URL:", link.href, e);
          }
        }
      });

      // Também injeta no onclick direto (para onClick handlers)
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        const originalOnClick = button.onclick;
        if (button.innerHTML.includes("GARANTIR") || button.innerHTML.includes("Clica")) {
          button.onclick = (e) => {
            const urlKiwify =
              "https://pay.kiwify.com.br/vjjTIiE?afid=bCH5tjUf";
            const url = new URL(urlKiwify);

            params.forEach((param) => {
              const storedValue = sessionStorage.getItem(param);
              if (storedValue) {
                url.searchParams.set(param, storedValue);
              }
            });

            window.location.href = url.toString();
          };
        }
      });
    };

    // Executa ao carregar a página
    window.addEventListener("load", injectParameters);

    // Executa a cada 2 segundos (caso botão demore a aparecer)
    const interval = setInterval(injectParameters, 2000);

    return () => {
      window.removeEventListener("load", injectParameters);
      clearInterval(interval);
    };
  }, []);
};
