import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaqManager } from '@/components/admin/FaqManager';
import { TidioConfig } from '@/components/admin/TidioConfig';

export const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'faqs' | 'tidio'>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Administração - TechWeb</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeSection === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant={activeSection === 'faqs' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('faqs')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              FAQs do Chatbot
            </Button>
            <Button
              variant={activeSection === 'tidio' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('tidio')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurar Tidio
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeSection === 'dashboard' && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Painel Administrativo</h2>
                <p className="text-muted-foreground">
                  Bem-vindo ao painel administrativo da TechWeb.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-semibold mb-2">FAQs do Chatbot</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Gerencie as perguntas e respostas que o chatbot Tidio utilizará.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveSection('faqs')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Gerenciar FAQs
                    </Button>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-semibold mb-2">Configurar Tidio</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure a integração com o chatbot Tidio e veja as instruções.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveSection('tidio')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'faqs' && <FaqManager />}
            
            {activeSection === 'tidio' && <TidioConfig />}
          </div>
        </div>
      </div>
    </div>
  );
};