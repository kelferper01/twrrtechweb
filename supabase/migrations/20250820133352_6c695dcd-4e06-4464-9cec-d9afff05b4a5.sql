-- Criar tabela para FAQ
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pergunta TEXT NOT NULL,
  resposta TEXT NOT NULL,
  categoria TEXT,
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública (para o chatbot)
CREATE POLICY "FAQs são visíveis publicamente quando ativas" 
ON public.faqs 
FOR SELECT 
USING (ativo = true);

-- Criar política para admin gerenciar FAQs (assumindo que teremos auth depois)
CREATE POLICY "Admins podem gerenciar todas as FAQs" 
ON public.faqs 
FOR ALL 
USING (true);

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar timestamps automaticamente
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir algumas FAQs de exemplo
INSERT INTO public.faqs (pergunta, resposta, categoria, ordem) VALUES
('Quais são os planos disponíveis?', 'Oferecemos planos de 100MB, 200MB e 500MB. Todos com instalação gratuita e sem fidelidade.', 'Planos', 1),
('Como faço para contratar?', 'Entre em contato pelo WhatsApp (95) 99999-9999 ou pelo nosso site. Nossa equipe fará uma análise de viabilidade.', 'Contratação', 2),
('Qual é o prazo de instalação?', 'A instalação é realizada em até 48 horas após a aprovação técnica e confirmação do pagamento.', 'Instalação', 3),
('Vocês oferecem suporte 24h?', 'Sim! Temos suporte técnico 24 horas por dia, 7 dias por semana para resolver qualquer problema.', 'Suporte', 4);