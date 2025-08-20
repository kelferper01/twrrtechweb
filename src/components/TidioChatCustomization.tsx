import { useEffect } from 'react';

export const TidioChatCustomization = () => {
  useEffect(() => {
    // Aguardar o Tidio carregar completamente
    const checkTidio = setInterval(() => {
      if (window.tidioChatApi) {
        // Customizar o widget do Tidio
        const customCSS = `
          <style>
            /* Personalizar o ícone do chat */
            #tidio-chat-iframe {
              /* Remover texto "Converse conosco" */
            }
            
            /* Customizar ícone do chat */
            div[data-testid="widgetButton"] {
              background-image: url('/lovable-uploads/26fbf6c8-da83-459e-9403-5ef071852723.png') !important;
              background-size: cover !important;
              background-position: center !important;
              border-radius: 50% !important;
              width: 60px !important;
              height: 60px !important;
            }
            
            /* Remover ícone padrão */
            div[data-testid="widgetButton"] svg {
              display: none !important;
            }
            
            /* Remover texto do widget */
            div[data-testid="widgetButton"] span {
              display: none !important;
            }
            
            /* Customizar container do botão */
            div[data-testid="widgetButtonContainer"] {
              background: transparent !important;
            }
            
            /* Efeito hover no botão */
            div[data-testid="widgetButton"]:hover {
              transform: scale(1.1) !important;
              transition: all 0.3s ease !important;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
            }
            
            /* Posicionamento do widget */
            #tidio-chat {
              bottom: 20px !important;
              right: 20px !important;
            }
            
            /* Remover badge de mensagens não lidas se necessário */
            div[data-testid="unreadBadge"] {
              display: none !important;
            }
          </style>
        `;
        
        // Injetar CSS customizado
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.innerHTML = customCSS;
        head.appendChild(style);
        
        // Configurar mensagens personalizadas
        window.tidioChatApi.on('ready', () => {
          // Personalizar mensagens de boas-vindas
          window.tidioChatApi.setVisitorData({
            distinct_id: 'techweb_visitor',
            email: '',
            name: 'Visitante TechWeb',
            phone: '',
            company: '',
            notes: 'Cliente interessado em internet fibra óptica'
          });
        });
        
        clearInterval(checkTidio);
      }
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(checkTidio);
    };
  }, []);

  return null;
};

// Declarar tipos para TypeScript
declare global {
  interface Window {
    tidioChatApi: any;
  }
}