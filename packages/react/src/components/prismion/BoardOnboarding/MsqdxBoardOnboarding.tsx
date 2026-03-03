"use client";

import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { Sparkles, MousePointer2, Move, Link2, Share2, X } from "lucide-react";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxCard } from "../../molecules/Card";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
  MSQDX_COLORS,
  MSQDX_BRAND_PRIMARY,
} from "@msqdx/tokens";

export interface MsqdxBoardOnboardingProps {
  boardId: string;
  onComplete: () => void;
}

const STORAGE_KEY_PREFIX = "prismora-onboarding-";

const steps = [
  {
    icon: Sparkles,
    title: "Willkommen bei PRISMORA!",
    description: "Dein kollaboratives Whiteboard für Ideen und Workflows ist bereit.",
    action: "Los geht's!",
    iconColor: MSQDX_COLORS.brand.green,
  },
  {
    icon: MousePointer2,
    title: "Prismions erstellen",
    description: "Doppelklick auf das Canvas, um ein neues Prismion zu erstellen.",
    action: "Verstanden",
    iconColor: MSQDX_COLORS.brand.green,
  },
  {
    icon: Move,
    title: "Verschieben & Bearbeiten",
    description: "Ziehe Prismions per Drag & Drop. Klicke auf Titel oder Inhalt zum Bearbeiten.",
    action: "Weiter",
    iconColor: MSQDX_BRAND_PRIMARY.purple,
  },
  {
    icon: Link2,
    title: "Verbindungen erstellen",
    description: "Nutze die Port-Buttons an den Kanten, um Prismions zu verbinden.",
    action: "Weiter",
    iconColor: MSQDX_BRAND_PRIMARY.orange,
  },
  {
    icon: Share2,
    title: "Team einladen",
    description: 'Klicke auf "Teilen" um den Board-Link zu kopieren und dein Team einzuladen.',
    action: "Board starten!",
    iconColor: MSQDX_BRAND_PRIMARY.pink,
  },
];

export function MsqdxBoardOnboarding({ boardId, onComplete }: MsqdxBoardOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY_PREFIX + boardId);
    if (!hasSeen) setIsVisible(true);
  }, [boardId]);

  const handleComplete = () => {
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY_PREFIX + boardId, "true");
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const stepData = steps[currentStep];
  const Icon = stepData.icon;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: MSQDX_SPACING.padding.md,
      }}
    >
      <MsqdxCard
        variant="elevated"
        sx={{
          maxWidth: 512,
          width: "100%",
          padding: MSQDX_SPACING.padding.xxl,
          position: "relative",
        }}
      >
        <IconButton
          size="small"
          onClick={handleComplete}
          aria-label="Skip"
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <X size={18} color={MSQDX_NEUTRAL[500]} />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {steps.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: index <= currentStep ? MSQDX_COLORS.brand.green : MSQDX_NEUTRAL[300],
                  transition: "background-color 0.2s",
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: MSQDX_NEUTRAL[100],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={32} color={stepData.iconColor} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, textAlign: "center" }}>
            <Box component="h2" sx={{ fontSize: "1.5rem", fontWeight: 700, color: MSQDX_NEUTRAL[900], margin: 0 }}>
              {stepData.title}
            </Box>
            <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, color: MSQDX_NEUTRAL[600], lineHeight: 1.6, margin: 0 }}>
              {stepData.description}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
            {currentStep > 0 && (
              <MsqdxButton variant="outlined" onClick={() => setCurrentStep(currentStep - 1)} sx={{ flex: 1 }}>
                Zurück
              </MsqdxButton>
            )}
            <MsqdxButton
              variant="contained"
              onClick={() => {
                if (currentStep === steps.length - 1) handleComplete();
                else setCurrentStep(currentStep + 1);
              }}
              sx={{ flex: 1 }}
            >
              {stepData.action}
            </MsqdxButton>
          </Box>

          <Box
            component="button"
            onClick={handleComplete}
            sx={{
              fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
              color: MSQDX_NEUTRAL[500],
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              "&:hover": { color: MSQDX_NEUTRAL[700] },
            }}
          >
            Tutorial überspringen
          </Box>
        </Box>
      </MsqdxCard>
    </Box>
  );
}
