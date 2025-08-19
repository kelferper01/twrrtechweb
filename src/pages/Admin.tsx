import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Admin: React.FC = () => {
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
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Painel Administrativo</h2>
          <p className="text-muted-foreground">Área disponível para futuras funcionalidades</p>
        </div>
      </div>
    </div>
  );
};