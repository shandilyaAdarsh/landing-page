"use client";

import { forwardRef, type ComponentType } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { create } from "zustand";

/* ── Random colour ───────────────────────────────────────────────────────── */
function randomColor(): string {
  const palette = [
    "#f97316","#8b5cf6","#10b981","#3b82f6",
    "#ec4899","#f59e0b","#06b6d4","#84cc16","#ef4444","#a855f7",
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

/* ── Shared colour store ─────────────────────────────────────────────────── */
interface ColorStore {
  background: string;
  setBackground: (c: string) => void;
}
export const useColorStore = create<ColorStore>((set) => ({
  background: "#f97316",
  setBackground: (c) => set({ background: c }),
}));

/* ── HOC base type ───────────────────────────────────────────────────────── */
type MDP = HTMLMotionProps<"div">;

/* ── withRotate ──────────────────────────────────────────────────────────── */
export function withRotate<T extends MDP>(Component: ComponentType<T>): ComponentType<T> {
  const Wrapped = forwardRef<HTMLDivElement, T>((props, ref) => {
    const merged: MDP = {
      ...props,
      animate: { ...(props.animate as object | undefined), rotate: 90 },
      transition: { duration: 2, ...(props.transition as object | undefined) },
    };
    return <Component ref={ref} {...(merged as T)} />;
  });
  Wrapped.displayName = `withRotate(${Component.displayName ?? Component.name})`;
  return Wrapped as unknown as ComponentType<T>;
}

/* ── withHover ───────────────────────────────────────────────────────────── */
export function withHover<T extends MDP>(Component: ComponentType<T>): ComponentType<T> {
  const Wrapped = forwardRef<HTMLDivElement, T>((props, ref) => {
    const merged: MDP = {
      ...props,
      whileHover: { scale: 1.05, ...((props.whileHover as object | undefined) ?? {}) },
    };
    return <Component ref={ref} {...(merged as T)} />;
  });
  Wrapped.displayName = `withHover(${Component.displayName ?? Component.name})`;
  return Wrapped as unknown as ComponentType<T>;
}

/* ── withRandomColor ─────────────────────────────────────────────────────── */
export function withRandomColor<T extends MDP>(Component: ComponentType<T>): ComponentType<T> {
  const Wrapped = forwardRef<HTMLDivElement, T>((props, ref) => {
    const { background, setBackground } = useColorStore();
    const merged: MDP = {
      ...props,
      animate: { background, ...((props.animate as object | undefined) ?? {}) },
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        setBackground(randomColor());
        (props as MDP).onClick?.(e);
      },
      style: { cursor: "pointer", ...props.style },
    };
    return <Component ref={ref} {...(merged as T)} />;
  });
  Wrapped.displayName = `withRandomColor(${Component.displayName ?? Component.name})`;
  return Wrapped as unknown as ComponentType<T>;
}

/* ── Pre-built variants ──────────────────────────────────────────────────── */
const MotionDiv = motion.div;

export const RotatingDiv   = withRotate(MotionDiv      as ComponentType<MDP>);
export const HoverDiv      = withHover(MotionDiv       as ComponentType<MDP>);
export const RandomColorDiv = withRandomColor(MotionDiv as ComponentType<MDP>);
