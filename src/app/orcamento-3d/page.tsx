"use client";
import React from "react";
import Link from "next/link";
import CalculadoraHeader from "../components/CalculadoraHeader";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

export default function Oramento3DPage() {
  return (
    <PageLayout 
      title="🏗️ Orçamento 3D"
      subtitle="Crie orçamentos visuais e interativos para seus projetos"
    >
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">
            Em Desenvolvimento
          </h2>
          <p className="text-xl text-gray-600">
            Esta página está sendo atualizada com o novo design system.
          </p>
        </div>
        
        <div className="text-center">
          <PageButton href="/" variant="primary">
            Voltar ao Início
          </PageButton>
        </div>
      </PageCard>
    </PageLayout>
  );
}