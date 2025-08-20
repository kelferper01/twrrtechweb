import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const TidioConfig: React.FC = () => {
  const apiEndpoint = `${window.location.origin}/supabase/functions/v1/chatbot-faqs`;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL copiada para a área de transferência",
    });
  };

  const tidioInstructions = [
    {
      step: 1,
      title: "Acesse o painel do Tidio",
      description: "Entre na sua conta Tidio e vá para Configurações > Chatbots"
    },
    {
      step: 2,
      title: "Configure a base de conhecimento",
      description: "Use o endpoint abaixo para conectar suas FAQs ao chatbot:"
    },
    {
      step: 3,
      title: "Configure respostas automáticas",
      description: "Configure o bot para usar as FAQs e redirecionar para WhatsApp quando necessário"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configuração do Chatbot Tidio</h2>
        <p className="text-muted-foreground">
          Configure seu chatbot Tidio para usar as FAQs criadas aqui.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint da API</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use este endpoint para conectar suas FAQs ao chatbot Tidio:
          </p>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm">{apiEndpoint}</code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(apiEndpoint)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções de Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tidioInstructions.map((instruction) => (
            <div key={instruction.step} className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {instruction.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{instruction.title}</h4>
                <p className="text-sm text-muted-foreground">{instruction.description}</p>
                {instruction.step === 2 && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <strong>Método:</strong> GET<br />
                    <strong>Formato:</strong> JSON<br />
                    <strong>Resposta:</strong> Lista de FAQs com perguntas, respostas e categorias
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Resposta Padrão</h4>
            <p className="text-sm text-muted-foreground mb-2">Configure esta mensagem como resposta padrão quando o bot não souber responder:</p>
            <div className="p-3 bg-muted rounded-md text-sm">
              "Olá! Não encontrei uma resposta específica para sua pergunta, mas nossa equipe pode ajudá-lo melhor! 📱 Entre em contato pelo WhatsApp: (95) 99999-9999"
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Avatar Personalizado</h4>
            <p className="text-sm text-muted-foreground mb-2">
              O avatar do chatbot foi personalizado automaticamente com a imagem enviada. 
              O CSS foi aplicado para remover o texto "converse conosco" e personalizar o ícone.
            </p>
            <div className="p-3 bg-muted rounded-md text-xs">
              ✅ Avatar personalizado aplicado<br />
              ✅ Texto removido do widget<br />
              ✅ Efeitos hover configurados
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Horário de Funcionamento</h4>
            <p className="text-sm text-muted-foreground">
              Configure o horário de funcionamento e mensagens automáticas para fora do horário comercial, 
              sempre direcionando para o WhatsApp.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links Úteis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="https://www.tidio.com/panel/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Painel do Tidio
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="https://help.tidio.com/docs" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Documentação do Tidio
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};