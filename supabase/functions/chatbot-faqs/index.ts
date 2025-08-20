import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { data: faqs, error } = await supabaseClient
      .from('faqs')
      .select('*')
      .eq('ativo', true)
      .order('ordem', { ascending: true })

    if (error) {
      throw error
    }

    // Formatar FAQs para o chatbot Tidio
    const formattedFaqs = faqs.map(faq => ({
      question: faq.pergunta,
      answer: faq.resposta + '\n\n📱 Para mais informações, entre em contato pelo WhatsApp: (95) 99999-9999',
      category: faq.categoria || 'Geral',
      keywords: faq.pergunta.toLowerCase().split(' ').filter(word => word.length > 3)
    }))

    return new Response(
      JSON.stringify({
        success: true,
        faqs: formattedFaqs,
        total: faqs.length,
        whatsapp: '5595999999999' // Número do WhatsApp para redirecionamento
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})